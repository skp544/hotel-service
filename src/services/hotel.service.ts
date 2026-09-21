import type { createHotelDTO } from "../dto/hotel.dto.js";
import { createHotel, getHotelById } from "../repositories/hotel.repository.js";
import { BadRequestError } from "../utils/errors/app.error.js";

const blockListedAddress = [
  // generic placeholder addresses
  "123 Main Street",
  "456 Elm Street",
  "789 Oak Street",
  "1234 Test Street",
  "Fake Address",
  "Dummy Address",
  "Sample Address",
  "Lorem Ipsum",
  "N/A",
  "Unknown",

  // random keyboard mashing
  "asdf",
  "qwerty",
  "asdfghjkl",
  "xxxxx",
  "12345",

  // malicious input
  "<script>alert(1)</script>",
  "'; DROP TABLE hotels;--",
  "' OR 1=1 --",
  "../../etc/passwd",
  "http://malicious-site.com",
];

export function isAddressBlockListed(address: string) {
  return blockListedAddress.includes(address);
}
export async function createHotelService(hotelData: createHotelDTO) {
  if (isAddressBlockListed(hotelData.address)) {
    throw new BadRequestError("Address is blocklisted");
  }

  const hotel = await createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await getHotelById(id);
  return hotel;
}
