import logger from "../config/logger.js";
import Hotel from "../db/models/hotel.model.js";
import type { createHotelDTO } from "../dto/hotel.dto.js";
import { NotFoundError } from "../utils/errors/app.error.js";

export async function createHotel(hotelData: createHotelDTO) {
  const hotel = await Hotel.create(hotelData);

  logger.info(`Hotel created : ${hotel.id}`);
  return hotel;
}

export async function getHotelById(id: number) {
  const hotel = await Hotel.findByPk(id);

  if (!hotel) {
    throw new NotFoundError("Hotel not found");
  }

  logger.info(`Hotel found : ${hotel.id}`);

  return hotel;
}
