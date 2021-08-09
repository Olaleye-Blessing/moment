export class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // filtering
    filter = (queryRegex = {}) => {
        let queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(lt|lte|gt|gte)\b/g,
            (match) => `$${match}`
        );
        queryStr = JSON.parse(queryStr);

        // remove undefined values
        Object.keys(queryRegex).forEach(
            (key) => queryRegex[key] === undefined && delete queryRegex[key]
        );

        if (Object.keys(queryRegex).length > 0) {
            console.log("yes");
            queryStr = { ...queryStr, ...queryRegex };
        }

        this.query = this.query.find(queryStr);

        return this;
    };

    // sorting
    sorting = () => {
        let { sort } = this.queryString;

        if (sort) {
            //? provided sorting
            sort = sort.split(",").join(" ");
            this.query = this.query.sort(sort);
        } else {
            //? default sorting
            this.query = this.query.sort("-createAt");
        }

        return this;
    };

    // fields to include
    limitFields = () => {
        let { fields } = this.queryString;
        if (fields) {
            fields = fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            //? exclude __v property that is provided by mongoose
            this.query = this.query.select("-__v");
        }

        return this;
    };

    // pagination
    paginate = () => {
        let { page, limit } = this.queryString;
        page = Number(page) || 1;
        limit = Number(limit) || 100;
        let skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    };
}
