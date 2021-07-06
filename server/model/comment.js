import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: [true, "comment can not be empty"],
            trim: true,
        },
        user: {
            type: Schema.ObjectId,
            ref: "User",
            required: [true, "comment must belong to a user"],
        },
        moment: {
            type: Schema.ObjectId,
            ref: "Moment",
            required: [true, "comment must belong to a moment"],
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
    });
    next();
});

const Comment = model("Comment", commentSchema);

export default Comment;
