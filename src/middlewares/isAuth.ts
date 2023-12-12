import { NextFunction, Request, Response } from "express";
import { ERROR_PROPS } from "../constants";
import { verifyUserToken } from "../utils/jwt";
import throwError from "../utils/throwError";

interface CustomRequest extends Request {
  user?: { id: string; email: string };
}

export default function isAuth(
  req: CustomRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const jwtByUser = req.get("Authorization") || "";
    const jwt = jwtByUser.split(" ").pop();
    const isUser = verifyUserToken(`${jwt}`) as { id: string; email: string };

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
