import { Router } from "express";
import * as authControllers from "./auth.controllers";

const router = Router();

router.route("/login").post(authControllers.loginUser);
router.route("/register").post(authControllers.registerUser);

export default router;
