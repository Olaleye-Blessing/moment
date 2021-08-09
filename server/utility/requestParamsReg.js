export const requestParamsReg = (reqQuery, ...properties) => {
    let resultQuery = { $or: [] };
    Object.keys(reqQuery)
        .map((result) => {
            let key = result;
            let value = reqQuery[result];
            return { key, value };
        })
        .forEach(({ key, value }) => {
            if (properties.includes(key)) {
                delete reqQuery[key];
                value = new RegExp(value, "i");

                resultQuery["$or"].push({ [key]: value });
            }
        });

    if (resultQuery["$or"].length === 0) delete resultQuery["$or"];

    return resultQuery;
};
