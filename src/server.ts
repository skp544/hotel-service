import "dotenv/config";
import express from "express";
import { serverConfig } from "./config/index.js";
import v1Router from "./routes/v1/index.routes.js";
import v2Router from "./routes/v2/index.routes.js";
import { genericErrorHandler } from "./middlewares/error.middleware.js";
import logger from "./config/logger.js";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware.js";
import sequelize from "./db/models/sequelize.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

app.use(genericErrorHandler);

app.listen(serverConfig.port, async () => {
  logger.info(
    `Sever is listening on port http://localhost:${serverConfig.port}`,
  );
  logger.info("Press Ctrl+C to stop server");

  await sequelize.authenticate();
  logger.info("Database connection has been established successfully.");
});
