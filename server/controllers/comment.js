import Comment from "../model/comment.js";
import { catchAsync } from "../utility/catchAsync.js";

export const getComments = catchAsync(async (req, res, next) => {
    let comments = await Comment.find();

    return res.status(200).json({
        status: "success",
        data: { comments },
    });
});

export const createComment = catchAsync(async (req, res, next) => {
    console.log("comment got here");
    let { comment, moment } = req.body;
    let { user: bodyUser } = req;
    let { _id: user } = bodyUser;
    let newComment = await Comment.create({ comment, moment, user });

    return res.status(201).json({
        status: "success",
        data: {
            comment: newComment,
        },
    });
});
