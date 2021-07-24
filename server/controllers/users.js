import User from "../model/users.js";
import { AppError } from "../utility/AppError.js";
import { catchAsync } from "../utility/catchAsync.js";

export const getProfile = catchAsync(async (req, res, next) => {
    let { id } = req.params;
    let user = await User.findById(id);
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
