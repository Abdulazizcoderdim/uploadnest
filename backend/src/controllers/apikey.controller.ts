import type { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createApiKeyService,
  deleteApiKeyService,
  getAllApiKeysService,
} from "../services/apikey.service";
import {
  createApiKeySchema,
  deleteApiKeySchema,
} from "../validators/apikey.validator";

export const createApiKeyController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { name } = createApiKeySchema.parse(req.body);

    const { rawKey } = await createApiKeyService(userId, name);

    return res.status(HTTPSTATUS.OK).json({
      message: "API key created successfully",
      key: rawKey,
    });
  }
);

export const getAllApiKeysController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 20,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const results = await getAllApiKeysService(userId, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: "API keys retrieved successfully",
      ...results,
    });
  }
);

export const deleteApiKeyController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { id } = deleteApiKeySchema.parse(req.body);

    const result = await deleteApiKeyService(userId, id);

    return res.status(HTTPSTATUS.OK).json({
      message: "API key deleted successfully",
      data: result,
    });
  }
);
