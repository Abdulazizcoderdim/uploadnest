import mongoose from "mongoose";
import StorageModel from "../models/storage.model";
import UserModel from "../models/user.model";
import { UnauthorizedException } from "../utils/app-error";
import { logger } from "../utils/logger";
import { RegisterSchemaType } from "../validators/auth.validator";

export const registerService = async (body: RegisterSchemaType) => {
  const { email } = body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const existingUser = await UserModel.findOne({ email }).session(session);
      if (existingUser) throw new UnauthorizedException("User already exists");

      const newUser = new UserModel({
        ...body,
        profilePicture: body.profilePicture || null,
      });

      await newUser.save({ session });

      const storage = new StorageModel({
        userId: newUser._id,
      });

      await storage.save({ session });

      return { user: newUser.omitPassword() };
    });
  } catch (error) {
    logger.error("Error registering user", error);
    throw error;
  } finally {
    await session.endSession();
  }
};
