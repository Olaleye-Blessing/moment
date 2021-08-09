import express from "express";

import {
    checkRequestIdIsUserId,
    editAbout,
    getProfile,
    getProfiles,
    updateProfile,
} from "../controllers/users.js";
import { protect } from "../controllers/authentication.js";
import { reqParamsFilter } from "../controllers/handlerFactory.js";

const router = express.Router();

router.route("/").get(reqParamsFilter("name", "username"), getProfiles);

router.route("/:id").get(getProfile);

router.use(protect);

router.use(checkRequestIdIsUserId);

router.patch("/editAbout/:id", editAbout, updateProfile);
// router.route("/:id").patch(updateProfile);

export default router;
