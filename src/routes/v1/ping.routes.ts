import { Router } from "express";
import { ping } from "../../controllers/ping.controller.js";

const pingRouter = Router();

pingRouter.get("/", ping);

export default pingRouter;
