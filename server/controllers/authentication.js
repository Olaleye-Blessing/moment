import { promisify } from "util";

import jwt from "jsonwebtoken";

import User from "../model/users.js";
import { catchAsync } from "../utility/catchAsync.js";
import { AppError } from "../utility/AppError.js";

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const sendToken = (user, statusCode, res) => {
    let token = signToken(user._id);
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
    let { firstName, lastName, email, password, confirmPassword, profilePic } =
        req.body;

    if (!firstName) return next(new AppError("Please provide first name", 400));

    if (!lastName) return next(new AppError("Please provide last name", 400));

    let name = `${firstName} ${lastName}`;

    let user = await User.create({
        name,
        email,
        password,
        confirmPassword,
        profilePic,
    });

    return sendToken(user, 201, res);
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
    console.log("logging out...🩸🩸🩸🩸🩸");
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 1000 * 1),
        httpOnly: true,
        secure: process.env.NODE_ENV.trim() === "production",
    });

    // if (process.env.NODE_ENV === "production") cookieOptions.sameSite = "none";

    console.log(new Date(Date.now() + 1000 * 1));

    res.status(200).json({ status: "success" });
};

export const protect = async (req, res, next) => {
    // console.log("protecting...🩸🩸🩸🩸🩸");
    let token = req.cookies.jwt;

    if (!token) {
        console.log("not logged in...🩸🩸🩸🩸");
        return res.status(401).json({
            status: "fail",
            message:
                "You are not logged in! Please login to perform this operation",
        });
    }

    let decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET_KEY
    );

    let { id, iat, exp } = decoded;

    let currentUser = await User.findById(id);

    if (!currentUser) {
        return res.status(404).json({
            status: "fail",
            message: "This account has been deleted! Create another account",
        });
    }
    req.user = currentUser;
    next();
};
