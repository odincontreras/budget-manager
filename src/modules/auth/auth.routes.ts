import { Router } from "express";
import * as authControllers from "./auth.controllers";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.route("/login").post(authControllers.loginUser);
router.route("/register").post(authControllers.registerUser);
router.route("/verify-token").get(isAuth, authControllers.verifyToken);

export default router;
