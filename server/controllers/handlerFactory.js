import { APIFeatures } from "../utility/APIFeatures.js";
import { catchAsync } from "../utility/catchAsync.js";

export const reqParamsFilter =
    (...properties) =>
    (req, res, next) => {
        let resultQuery = { $or: [] };
        Object.keys(req.query)
            .map((result) => {
                let key = result;
                let value = req.query[result];
                return { key, value };
            })
            .forEach(({ key, value }) => {
                if (properties.includes(key)) {
                    delete req.query[key];
                    value = new RegExp(value, "i");

                    resultQuery["$or"].push({ [key]: value });
                }
            });

        if (resultQuery["$or"].length === 0) delete resultQuery["$or"];
        req.query.regexQuery = resultQuery;
        next();
    };

export const findAll = (Model) =>
    catchAsync(async (req, res, next) => {
        // moment specific
        let { page, regexQuery } = req.query;

        delete req.query.regexQuery;

        let features = new APIFeatures(Model.find(), req.query)
            // .filter({ ...regexQuery })
            .filter(regexQuery)
            .sorting()
            .limitFields()
            .paginate();

        let data = await features.query;

        page = Number(page) || 1;
        // let totalPages = await Model.countDocuments();
        // console.log(totalPages);
        res.status(200).json({
            status: "success",
            results: data.length,
            page,
            // moments: data,
            data,
        });
    });
