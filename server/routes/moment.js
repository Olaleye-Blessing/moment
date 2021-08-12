import express from "express";
import { protect } from "../controllers/authentication.js";
import { reqParamsFilter } from "../controllers/handlerFactory.js";

import {
    createMoment,
    deleteMoment,
    getMoment,
    getMoments,
    likeMoment,
    updateMoment,
} from "../controllers/moment.js";
import { checkRequestIdIsUserId } from "../controllers/users.js";

const router = express.Router();

router.get(
    "/personal",
    protect,
    function (req, res, next) {
        let { creator: userEditingId } = req.query;

        // add the id to req body so that the next middleware will use it
        req.body = { ...req.body, userEditingId };
        next();
    },
    checkRequestIdIsUserId,
    reqParamsFilter("title"),
    getMoments
);

router.get("/", reqParamsFilter("title"), getMoments);
router.get("/:id", getMoment);

router.use(protect);

router.post("/", createMoment);
router.patch("/:id", updateMoment);
router.delete("/:id", deleteMoment);

router.patch("/like/:id", likeMoment);

export default router;
