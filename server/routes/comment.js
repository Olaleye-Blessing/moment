import express from "express";
import { protect } from "../controllers/authentication.js";
import { createComment, getComments } from "../controllers/comment.js";

const router = express.Router();

router.route("/").get(getComments).post(protect, createComment);

export default router;
