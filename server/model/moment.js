import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const momentSchema = new Schema(
    {
        title: String,
        message: String,
        creator: {
            type: Schema.ObjectId,
            ref: "User",
        },
        tags: [
            {
                type: String,
            },
        ],
        image: String,
        likes: {
            type: Number,
            default: 0,
        },
        dislikes: {
            type: Number,
            default: 0,
        },
        // comments: String,
        // comments: {
        //     type: Array,
        //     default: [],
        // },
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

momentSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "moment",
    localField: "_id",
});

momentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "creator",
        // select: "name",
    }).populate("comments");
    next();
});

const Moment = model("Moment", momentSchema);

export default Moment;
