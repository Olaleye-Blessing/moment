import mongoose from "mongoose";
import bycrypt from "bcryptjs";
import { validateEmail } from "../utility/validateEmail.js";

const Schema = mongoose.Schema;

const model = mongoose.model;

const userSchema = new Schema({
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
    nickname: String,
    coverPic: String,
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
    profilePic: String,
});

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

userSchema.methods.validatePassword = async (incomingPswd, savedPswd) =>
    await bycrypt.compare(incomingPswd, savedPswd);

const User = model("User", userSchema);

export default User;
