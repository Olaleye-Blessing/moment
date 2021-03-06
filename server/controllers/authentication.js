import { promisify } from "util";
import crypto from "crypto";

import jwt, { decode } from "jsonwebtoken";

import User from "../model/users.js";
import { catchAsync } from "../utility/catchAsync.js";
import { AppError } from "../utility/AppError.js";
import { sendEmail } from "../utility/email.js";
import htmlWholeMessage from "./../utility/EmailTemplates/index.js";
import { resetPasswordEmail } from "../utility/EmailTemplates/resetPassword.js";
import { activateEmail } from "../utility/EmailTemplates/activateAccount.js";
import { validateName } from "../utility/UserModel/validations.js";
// import url from "url";

const signToken = (id, expiresIn) =>
    jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        // expiresIn: process.env.JWT_EXPIRES_IN,
        expiresIn,
    });

const sendToken = (user, statusCode, res) => {
    let token = signToken(user._id, process.env.JWT_EXPIRES_IN);
    let cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV.trim() === "production",
    };

    // if (process.env.NODE_ENV === "production") cookieOptions.sameSite = "none";

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    return res.status(statusCode).json({ status: "success", user });
};

export const signup = catchAsync(async (req, res, next) => {
    let {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
        // profilePic,
    } = req.body;

    password = confirmPassword = "wer34fhdhdhdhdhfjfjdW@";

    if (!firstName) return next(new AppError("Please provide first name", 400));

    if (!lastName) return next(new AppError("Please provide last name", 400));

    if (!validateName(firstName) || !validateName(lastName))
        return next(new AppError("Name can only be letters", 400));

    let name = `${firstName} ${lastName}`;

    const activationToken = signToken(email, "10m");
    // const activationToken = signToken(email, "6s");
    const activationExpires = Date.now() + 11 * 60 * 1000; // add extra 1 min

    let user = await User.create({
        name,
        email,
        username,
        password,
        confirmPassword,
        activationToken,
        activationExpires,
        // profilePic,
    });

    //? send activation token to user's email
    let { message, htmlMessage } = accountActivationMessage(
        req,
        activationToken,
        email
    );

    try {
        await sendEmail({
            email,
            subject: "Activate your moment account(valid for 10 mins)",
            message,
            htmlMessage,
        });
        return sendToken(user, 201, res);
    } catch (error) {
        user.activationToken = undefined;
        user.activationExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError(
                "There is an error sending the email! Try again later",
                500
            )
        );
    }
});

const accountActivationMessage = (req, activationToken, email) => {
    const activationUrl = `${req.protocol}://${req.get(
        "host"
    )}/auth/activateAccount/${activationToken}`;

    let homeUrl = `${req.protocol}://${req.get("host")}`;

    const message = `Hello ${email}!\nWe're excited to have you get started. First, you need to confirm your account. Just click the button below.\n${activationUrl}`;

    const htmlMessage = htmlWholeMessage(
        "Activate Account",
        "Account activation",
        "Acctivate Your Account",
        activateEmail(activationUrl, homeUrl),
        "activate account"
    );

    return { message, htmlMessage };
};

export const activateAccount = catchAsync(async (req, res, next) => {
    let { activationToken } = req.params;

    if (!activationToken) {
        console.log("invalid activation...????????????????");
        return res.status(401).json({
            status: "fail",
            message: "Invalid activation link!!",
        });
    }

    //? 2. verify token
    try {
        let decoded = await promisify(jwt.verify)(
            activationToken,
            process.env.JWT_SECRET_KEY
        );
        let { id: email, iat, exp } = decoded;

        //? 3. get user and update status to "active"
        let activeUser = await User.findOneAndUpdate(
            { email, activationToken: { $exists: true } },
            { "status": "active" },
            { new: true }
        );

        if (!activeUser) {
            return next(
                new AppError(
                    `This account has either been deleted/activated!`,
                    404
                )
            );
        }

        activeUser.activationToken = undefined;
        activeUser.activationExpires = undefined;

        await activeUser.save({ validateBeforeSave: false });

        return sendToken(activeUser, 200, res);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            let { id: email } = await promisify(jwt.verify)(
                activationToken,
                process.env.JWT_SECRET_KEY,
                { ignoreExpiration: true }
            );

            //? check if the user has previously activated account

            let newActivatedUser = await User.findOne({ email });

            if (newActivatedUser.status === "active") {
                return next(
                    new AppError(
                        "This account has previously been activated",
                        401
                    )
                );
            } else if (newActivatedUser.status === "deactivated") {
                return next(
                    new AppError("This Account could not be found", 404)
                );
            }

            const newActivationToken = signToken(email, "10m");
            const newActivationExpires = Date.now() + 11 * 60 * 1000;

            newActivatedUser.activationToken = newActivationToken;
            newActivatedUser.activationExpires = newActivationExpires;

            await newActivatedUser.save({ validateBeforeSave: false });

            let { message, htmlMessage } = accountActivationMessage(
                req,
                newActivationToken,
                email
            );

            try {
                await sendEmail({
                    email,
                    subject: "Activate your moment account(valid for 10 mins)",
                    message,
                    htmlMessage,
                });
                return next(
                    new AppError(
                        `Activation link has expired!!New Activation Link has being sent to your account!`,
                        401
                    )
                );
            } catch (error) {
                newActivatedUser.activationToken = undefined;
                newActivatedUser.activationExpires = undefined;
                await newActivatedUser.save({ validateBeforeSave: false });

                return next(
                    new AppError(
                        "There is an error sending the email! Try again later",
                        500
                    )
                );
            }
        }
    }
});

export const login = catchAsync(async (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password)
        return next(new AppError("provide email and password", 400));

    let user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.validatePassword(password, user.password)))
        return next(new AppError("incorrect username or password", 401));

    return sendToken(user, 200, res);
});

export const logout = async (req, res, next) => {
    console.log("logging out...????????????????????");
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 1000 * 1),
        httpOnly: true,
        secure: process.env.NODE_ENV.trim() === "production",
    });

    // if (process.env.NODE_ENV === "production") cookieOptions.sameSite = "none";

    console.log(new Date(Date.now() + 1000 * 1));

    res.status(200).json({ status: "success" });
};

export const forgetPassword = catchAsync(async (req, res, next) => {
    let { email } = req.body;

    let user = await User.findOne({ email });

    if (!user)
        return next(
            new AppError("There is no user with this email address", 404)
        );

    //? Generate random token
    const resetToken = user.generatePasswordToken();

    //? need to save the document
    await user.save({ validateBeforeSave: false }); //? turn off all validation

    //? send to user's email
    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/auth/resetPassword/${resetToken}`;

    const message = `Hello ${email}!\nSomeone has requested a link to change your password. You can do this through the button below.\n${resetUrl}\nReset token valid for 2 mins\nIf you didn't request this, please ignore this email. Your password will stay safe and won't be changed.`;

    const htmlMessage = htmlWholeMessage(
        "Password Reset",
        "Request for deletion of account",
        "Reset Your Password",
        resetPasswordEmail(resetUrl),
        "change of password"
    );

    try {
        await sendEmail({
            email,
            subject: "Your Password Reset Token(valid for 2 mins)",
            message,
            htmlMessage,
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError(
                "There is an error sending the email! Try again later",
                500
            )
        );
    }

    res.status(200).json({
        status: "success",
        data: {
            message: "Password reset link sent to your email",
            tokenLink: message,
        },
    });
});

export const resetPassword = catchAsync(async (req, res, next) => {
    //? 1. get user based on reset token and email
    let { token } = req.params;
    let { email, password, confirmPassword } = req.body;
    let passwordResetToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // console.log(passwordResetToken);
    // console.log(token);

    let user = await User.findOne({
        passwordResetToken,
        email,
        passwordResetExpires: { $gt: Date.now() },
    });
    // console.log(user);
    // console.log(user, { date: Date.now() });

    //? 2. check if there is user, token hasn't expired
    if (!user) {
        return next(
            new AppError(
                "Token is invalid or has expired! Please go to forget password page to request for another reset token",
                400
            )
        );
    }
    //? 3. set new password
    user.password = password;
    user.confirmPassword = confirmPassword;

    //? 4. clear reset details
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    //? 4. update user changedPasswordAt (pre hooks)

    //? 5. login user
    sendToken(user, 201, res);
});

export const protect = catchAsync(async (req, res, next) => {
    //? 1. check if token is in req object
    console.log("protecting...????????????????????");
    let token = req.cookies.jwt;

    if (!token) {
        console.log("not logged in...????????????????");
        return res.status(401).json({
            status: "fail",
            message:
                "You are not logged in! Please login to perform this operation",
        });
    }

    //? 2. verify token
    let decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET_KEY
    );
    // let decoded = await promisify(jwt.verify)(
    //     `${token}w`,
    //     process.env.JWT_SECRET_KEY
    // );

    let { id, iat, exp } = decoded;

    //? 3. check if user still exists
    let currentUser = await User.findById(id);

    if (!currentUser) {
        return res.status(404).json({
            status: "fail",
            message: "This account has been deleted! Create another account",
        });
    }

    //? 4. check if user recently changed password
    if (currentUser.passwordChangedAfter(iat)) {
        return next(
            new AppError(
                "User recently changed password! Please log in again",
                401
            )
        );
    }

    req.user = currentUser;

    next();
});
