// import { AppError } from "../utility/AppError.js";

const handleDBValidationError = (err) => {
    let { errors: allErrors } = err;

    let keyErrorsMessages = Object.keys(allErrors)
        .map((e) => allErrors[e].properties.message)
        .join(". ");

    return keyErrorsMessages;
};

const handleDuplicateValueError = (err) => {
    let key = Object.keys(err.keyValue)[0].trim();
    let val = err.keyValue[key];

    let message = `This ${key}: ${val} is in use`;
    return message;
};

export const globalErrorHandler = (err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (err.name === "ValidationError") {
        err.message = handleDBValidationError(err);
        err.statusCode = 400;
    }

    if (err.code === 11000) {
        err.message = handleDuplicateValueError(err);
        err.statusCode = 400;
    }

    // console.log({ ...err });

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message || "something went wrong",
    });
};
