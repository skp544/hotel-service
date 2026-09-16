import type { NextFunction, Request, Response } from "express";
import { flattenError, ZodError, type ZodType } from "zod";

/**
 *
 * @param schema - zod schema to validate the request body
 * @returns - Middleware function to validate the request body
 */
export const validateRequestBody = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid request body",
          success: false,
          errors: flattenError(err),
        });
      }
      next(err);
    }
  };
};

export const validateQueryParams = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid query params",
          success: false,
          errors: flattenError(err),
        });
      }
      next(err);
    }
  };
};
