import { NextFunction, Request, Response } from "express";
import * as authServices from "./auth.services";
import { HTTP_STATUS_CODES } from "../../constants";
import { AuthenticatedRequest } from "../../types";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const newUser = req.body;

    const user = await authServices.registerUser(newUser);

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);

    return res.status(HTTP_STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
}

export async function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const user = req.user;

    const loggedUser = await authServices.getLoggedUser(user?.id as number);

    return res.status(HTTP_STATUS_CODES.OK).json(loggedUser);
  } catch (error) {
    next(error);
  }
}
