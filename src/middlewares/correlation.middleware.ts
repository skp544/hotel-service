import type { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { asyncLocalStorage } from "../utils/helpers/request.helper.js";

export const attachCorrelationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const correlationId = uuid();

  res.setHeader("c-correlation-id", correlationId);

  asyncLocalStorage.run({ correlationId }, () => {
    next();
  });
};
