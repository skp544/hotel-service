import type { Request, Response } from "express";
import { NotFoundError } from "../utils/errors/app.error.js";

export const ping = async (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "pong", success: true });
  } catch (err) {
    throw new NotFoundError("File not found");
  }
};
