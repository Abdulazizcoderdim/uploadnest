import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { Env } from "./env.config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    logger.info("Connected to Mongo database");
  } catch (error) {
    logger.error("Error connecting to database", error);
    process.exit(1);
  }
};

const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info("Disconnected to Mongo database");
  } catch (error) {
    logger.error("Error disconnecting to database", error);
    process.exit(1);
  }
};

export { connectDatabase, disconnectDatabase };
