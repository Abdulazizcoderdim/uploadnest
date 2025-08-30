import type { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createApiKeySchema } from "../validators/apikey.validator";

export const createApiKeyController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { name } = createApiKeySchema.parse(req.body);
  }
);
