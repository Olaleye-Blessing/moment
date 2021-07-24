import express from "express";
import {
    forgetPassword,
    login,
    logout,
    resetPassword,
    signup,
    activateAccount,
} from "../controllers/authentication.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/activateAccount/:activationToken", activateAccount);
router.get("/logout", logout);
router.post("/forgetPassword", forgetPassword);
router.patch(`/resetPassword/:token`, resetPassword);

export default router;
