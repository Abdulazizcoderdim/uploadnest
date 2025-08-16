import { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";
import { HTTPSTATUS } from "../config/http.config";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { logger } from "../utils/logger";

const formatZodError = (res: Response, error: ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  logger.error(`Error occured on PATH: ${req.path}`, {
    body: req.body,
    params: req.params,
    error,
  });

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid josn format, please check your request body",
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }
};
