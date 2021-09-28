import path from "path";

import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import momentRoutes from "./routes/moment.js";
import authenticationRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comment.js";
import userRoutes from "./routes/users.js";
import { globalErrorHandler } from "./controllers/error.js";
import { __dirname } from "../parentRoot.js";

const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));

app.use(cookieParser());

console.log({ env: process.env.NODE_ENV, length: process.env.NODE_ENV.length });

// if (process.env.NODE_ENV === "production") {
//     // app.use(express.static("client/build"));
//     // app.use(
//     //     "/static",
//     //     express.static(path.join(__dirname, "../client/build//static"))
//     // );
//     app.use(express.static(path.join(__dirname, "../client/build")));
//     app.get("*", (req, res) => {
//         res.sendFile(
//             path.resolve(__dirname, "..", "client", "build", "index.html")
//         );
//     });
// } else {
//     app.use("/moments", momentRoutes);
//     app.use("/auth", authenticationRoutes);
//     app.use("/comments", commentRoutes);
//     app.use("/profile", userRoutes);
// }

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
} else {
    app.use("/moments", momentRoutes);
    app.use("/auth", authenticationRoutes);
    app.use("/comments", commentRoutes);
    app.use("/profile", userRoutes);
}

app.use(globalErrorHandler);
export { app };
