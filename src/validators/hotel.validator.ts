import { z } from "zod";

export const createHotelSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long" }),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters long" }),
  rating: z.number().optional(),
  ratingCount: z.number().optional(),
});
