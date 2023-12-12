import { Prisma } from "@prisma/client";
import { HTTP_STATUS_CODES } from "../constants";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  console.log(err);
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(409).json({
      statusCode: 409,
      error: err.name,
      message: err.message,
    });
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      statusCode: 400,
      error: err.name,
      message: err.message,
    });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      statusCode: 401,
      error: err.name,
      message: err.message,
    });
  }

  const isManualError = Boolean(HTTP_STATUS_CODES[err.name]);

  if (isManualError) {
    const errorStatusCode = HTTP_STATUS_CODES[err.name];

    return res.status(errorStatusCode).json({
      statusCode: errorStatusCode,
      error: err.name,
      message: err.message,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    error: err.name,
    message: err.message,
  });
};

export default errorHandler;
