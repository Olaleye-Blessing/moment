import path from "path";

import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import momentRoutes from "./routes/moment.js";
import authenticationRoutes from "./routes/users.js";
import commentRoutes from "./routes/comment.js";
import { globalErrorHandler } from "./controllers/error.js";
import { __dirname } from "../parentRoot.js";

const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));

app.use(cookieParser());

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     // app.use(
//     //     "/static",
//     //     express.static(path.join(__dirname, "../client/build//static"))
//     // );
// }

app.use("/moments", momentRoutes);
app.use("/auth", authenticationRoutes);
app.use("/comments", commentRoutes);

app.use((req, res, next) => {
    res.sendFile(
        path.join(__dirname, "..", "moment", "client", "build", "index.html")
    );
});

app.use(globalErrorHandler);
export { app };
