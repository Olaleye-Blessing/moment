import { APIFeatures } from "../utility/APIFeatures.js";
import { AppError } from "../utility/AppError.js";
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
        let { page, regexQuery } = req.query;

        delete req.query.regexQuery;

        let features = new APIFeatures(Model.find(), req.query)
            // .filter({ ...regexQuery })
            .filter(regexQuery)
            .sorting()
            .limitFields()
            .paginate();

        let data = await features.query;

        if (data.length === 0) {
            return next(new AppError("No data found", 404));
        }

        page = Number(page) || 1;

        // 50 documents per page
        let totalPages = Math.ceil((await Model.countDocuments()) / 50);

        // console.log(data);
        res.status(200).json({
            status: "success",
            results: data.length,
            page,
            totalPages,
            // moments: data,
            data,
        });
    });
