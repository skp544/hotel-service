import type { Request, Response } from "express";
import {
  createHotelService,
  getHotelByIdService,
} from "../services/hotel.service.js";

export async function createHotelHandler(req: Request, res: Response) {
  const hotel = await createHotelService(req.body);
  res
    .status(201)
    .json({ message: "Hotel created", success: true, data: hotel });
}

export async function getHotelByIdHandler(req: Request, res: Response) {
  const { id } = req.params;

  const hotel = await getHotelByIdService(Number(id));

  res.status(200).json({ message: "Hotel found", success: true, data: hotel });
}
