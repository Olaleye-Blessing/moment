import crypto from "crypto";

import mongoose from "mongoose";
import bycrypt from "bcryptjs";
import { validateEmail } from "../utility/validateEmail.js";

const Schema = mongoose.Schema;

const model = mongoose.model;

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: [true, "please provide your email"],
            trim: true,
            unique: true,
            lowercase: true,
            validate: [validateEmail, "invalid email"],
        },
        bio: {
            type: String,
            default: "",
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: [true, "please provide your password"],
            minlength: 8,
            select: false,
        },
        confirmPassword: {
            type: String,
            required: [true, "confirm password"],
            validate: {
                //! this only works on .create() or .save()
                validator: function (confirm) {
                    return confirm === this.password;
                },
                message: "passwords do not match",
            },
        },
        activationToken: {
            type: String,
            select: false,
        },
        activationExpires: {
            type: Date,
            select: false,
        },
        profilePic: String,
        coverPic: String,
        work: {
            type: String,
            default: "",
        },
        education: {
            type: String,
            default: "",
        },
        lives: {
            type: String,
            default: "",
        },
        hometown: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        linkedin: {
            type: String,
            default: "",
        },
        passwordChangedAt: {
            type: Date,
            select: false,
        },
        passwordResetToken: {
            type: String,
            select: false,
        },
        passwordResetExpires: {
            type: Date,
            select: false,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            // values:
            /*
        pending: newly created account(active)
        active: verified email(active)
        deactivated
        */
            default: "pending",
            enum: ["pending", "active", "deactivated"],
        },
        // mongoose.Schema.ObjectId
        moments: [
            {
                type: Schema.ObjectId,
                ref: "Moment",
                select: false,
            },
        ],
        followers: [
            {
                type: Schema.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: Schema.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

//+ only run this middleware when password is saved/modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    //? encrpyt user password
    this.password = await bycrypt.hash(this.password, 12);

    this.confirmPassword = undefined;

    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.generateAccountActivationToken = function () {
    //? send this token to the user
    let activateToken = crypto.randomBytes(32).toString("hex");

    //? hash it cause it behaves like a real password and you're saving it in the database

    this.activationToken = crypto
        .createHash("sha256")
        .update(activateToken)
        .digest("hex");

    //? expires after 2 mins 30secs
    // this.passwordResetExpires = new Date(
    //     Date.now() + 10 * 60 * 1000
    // ).toString();
    this.activationExpires = Date.now() + 2.5 * 60 * 1000;
    // console.log({ time: this.activationExpires });

    return activateToken;
};

userSchema.methods.validatePassword = async (incomingPswd, savedPswd) =>
    await bycrypt.compare(incomingPswd, savedPswd);

userSchema.methods.passwordChangedAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        console.log({ JWTTimeStamp, changedTimeStamp });

        //? return true if token was issued at 1000(3:40) and user changed password at 2000(3:45)
        //? return false if token was issued at 4000(5:00) and user changed password at 3000(4:00)
        return JWTTimeStamp < changedTimeStamp;
    }

    //? some users might not change their password throghout
    return false;
};

userSchema.methods.generatePasswordToken = function () {
    //? send this token to the user
    let resetToken = crypto.randomBytes(32).toString("hex");

    //? hash it cause it behaves like a real password and you're saving it in the database

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    //? expires after 2 mins
    // this.passwordResetExpires = new Date(
    //     Date.now() + 2 * 60 * 1000
    // ).toString();
    this.passwordResetExpires = Date.now() + 2 * 60 * 1000;
    console.log({ time: this.passwordResetExpires });

    // console.log({ resetToken, hashed: this.passwordResetToken });
    return resetToken;
};

// userSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: "followers",
//         //     // select: ""
//     });
//     next();
// });

const User = model("User", userSchema);

export default User;
