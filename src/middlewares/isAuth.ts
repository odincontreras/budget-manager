import { NextFunction, Response } from "express";
import { ERROR_PROPS } from "../constants";
import { verifyUserToken } from "../utils/jwt";
import throwError from "../utils/throwError";
import { AuthenticatedRequest } from "../types";

export default function isAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const jwtByUser = req.get("Authorization") || "";
    const jwt = jwtByUser.split(" ").pop();
    const isUser = verifyUserToken(`${jwt}`) as { id: number; email: string };

    if (!isUser) {
      throwError(ERROR_PROPS.INVALID_TOKEN);
    } else {
      req.user = isUser;
      next();
    }
  } catch (error) {
    next(error);
  }
}
