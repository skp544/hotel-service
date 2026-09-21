import { Router } from "express";
import {
  createHotelHandler,
  getHotelByIdHandler,
} from "../../controllers/hotel.controller.js";
import { validateRequestBody } from "../../validators/index.js";
import { createHotelSchema } from "../../validators/hotel.validator.js";

const hotelRouter = Router();

hotelRouter.post(
  "/",
  validateRequestBody(createHotelSchema),
  createHotelHandler,
);

hotelRouter.get("/:id", getHotelByIdHandler);

export default hotelRouter;
