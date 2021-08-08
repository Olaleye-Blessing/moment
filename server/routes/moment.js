import express from "express";
import { protect } from "../controllers/authentication.js";

import {
    createMoment,
    deleteMoment,
    getMoment,
    getMoments,
    likeMoment,
    updateMoment,
} from "../controllers/moment.js";

const router = express.Router();

router.get("/", getMoments);
router.get("/:id", getMoment);

router.use(protect);

router.post("/", createMoment);
router.patch("/:id", updateMoment);
router.delete("/:id", deleteMoment);

router.patch("/like/:id", likeMoment);

export default router;
