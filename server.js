import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import mongoose from "mongoose";

import { app } from "./server/app.js";

const PORT = process.env.PORT || 7000;

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

let nodeEnv = process.env.NODE_ENV.trim() === "development";

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        if (nodeEnv) console.log({ db_status: `Connection successful` });
    });

const server = app.listen(PORT, () => {
    if (nodeEnv) console.log(`app is listening on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log({ name: err.name });
    console.log({ message: err.message });
    console.log(err);

    server.close(() => {
        console.log("server is shutting down 😏😏😏...");
        process.exit(1);
    });
});
