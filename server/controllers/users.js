import User from "../model/users.js";
import { AppError } from "../utility/AppError.js";
import { catchAsync } from "../utility/catchAsync.js";
import { findAll } from "./handlerFactory.js";
import { requestParamsReg } from "./../utility/requestParamsReg.js";

export const getProfiles = findAll(User);

export const getProfile = catchAsync(async (req, res, next) => {
    let { id } = req.params;
    // let user = await User.findById(id);

    let user = await User.findById(id).populate({
        path: "moments",
    });
    // let user = await User.findById(id);

    // console.log(user);

    if (!user) return next(new AppError("User not found", 404));

    return res.status(200).json({ status: "success", data: user });
});

//+ check if the person that makes the request is the owner of the profile
export const checkRequestIdIsUserId = (req, res, next) => {
    let { userEditingId } = req.body;
    let { user } = req;

    if (userEditingId != user._id) {
        return next(
            new AppError("you are not authorized to make this action", 401)
        );
    }

    next();
};

export const editAbout = (req, res, next) => {
    // console.log("edit about hit...");
    // let data = req.body;

    // //+ filter out social keys
    // let socailKeys = Object.keys(data).filter(
    //     (detail) => detail.indexOf("social") !== -1
    // );

    // //+ extract their values
    // let socials = socailKeys.map((soc) => {
    //     let name = soc.slice("social".length).toLowerCase();
    //     let value = data[soc];
    //     return { [name]: value };
    // });

    let { work, education, lives, hometown, twitter, github, instagram } =
        req.body;

    // let aboutData = {
    //     work,
    //     education,
    //     lives,
    //     hometown,
    //     socials,

    // };
    req.data = { work, education, lives, hometown, twitter, github, instagram };

    next();
};

export const updateProfile = catchAsync(async (req, res, next) => {
    let { data } = req;
    let id = req.user._id;

    let updatedUser = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    return res.status(201).json({ status: "success", data: updatedUser });
});

export const followProfile = catchAsync(async (req, res, next) => {
    let {
        body: { followingId },
        user: { _id: userId, following },
    } = req;

    let hasFollowed = [...following].find(
        (followedId) => followedId.toString() === followingId.toString()
    );

    // handles the number of followers in the profile that the user follows
    let followerResult = await User.findByIdAndUpdate(
        followingId,
        hasFollowed
            ? { $pull: { followers: userId } }
            : { $push: { followers: userId } },
        { new: true }
    );

    let userResult = await User.findByIdAndUpdate(
        userId,
        hasFollowed
            ? { $pull: { following: followingId } }
            : { $push: { following: followingId } },
        { new: true }
    );

    return res.json({
        status: "success",
        data: {
            userResult,
            profileResult: followerResult,
        },
    });
    // this handles following in the user profile
    // (req.data = hasFollowed
    //     ? { $pull: { following: followingId } }
    //     : { $push: { following: followingId } }),
    //     next();
});
