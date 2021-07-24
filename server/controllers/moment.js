import Moment from "../model/moment.js";
import { catchAsync } from "../utility/catchAsync.js";

export const getMoments = async (req, res, next) => {
    try {
        // let moments = await Moment.find().populate({
        //     path: "creator comment",
        //     // select: "name",
        // });

        let moments = await Moment.find();
        // moments.forEach((moment) => (moment.__v = undefined));
        // console.log(moments);

        // console.log(moments[0]);
        return res.status(200).json({
            "status": "success",
            moments,
        });
    } catch (error) {
        return res.status(404).json({
            "type": "fail",
        });
    }
};

export const getMoment = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    // let moment = await Moment.findById(id).populate({
    //     path: "creator",
    //     select: "-password -__v",
    // });

    let moment = await Moment.findById(id);
    // let moment = await Moment.findById(id).populate("comments");
    // console.log(moment);

    return res.status(200).json({ status: "success", data: moment });
});

export const createMoment = async (req, res, next) => {
    // console.log(req.user);
    // let { title, message, creator, tags, selectedFile, likes, createdAt } = req.body;

    let { title, message, tags, image } = req.body;
    tags = tags.split(" ");

    let creator = req.user._id;

    let moment = await Moment.create({
        creator,
        title,
        message,
        tags,
        image,
    });

    res.status(201).json({
        "status": "success",
        moment,
    });
};

export const updateMoment = async (req, res, next) => {
    let { id } = req.params;
    let { title, message, creator, tags, image } = req.body;
    tags = tags.split(" ");

    try {
        let updatedMoment = await Moment.findByIdAndUpdate(
            id,
            { title, message, creator, tags, image },
            { new: true }
        );
        return res
            .status(201)
            .json({ status: "success", moment: updatedMoment });
    } catch (error) {
        return res.status(404).json({ "status": "fail" });
    }
};

export const deleteMoment = async (req, res, next) => {
    let { id } = req.params;

    try {
        await Moment.findByIdAndDelete(id);
        return res.status(204).json({
            "status": "success",
        });
    } catch (error) {
        return res.status(404).json({
            status: "fail",
        });
    }
};
