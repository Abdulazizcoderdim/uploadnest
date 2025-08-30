import ApiKeyModel from "../models/apiKeys.model";
import { NotFoundException } from "../utils/app-error";
import { generateAPIKey } from "../utils/key";

export const createApiKeyService = async (userId: string, name: string) => {
  const { rawKey, hashedKey, displayKey } = generateAPIKey();

  const apiKey = new ApiKeyModel({
    userId,
    name,
    hashedKey,
    displayKey,
  });

  await apiKey.save();

  return {
    rawKey,
  };
};

export const getAllApiKeysService = async (
  userId: string,
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const { pageSize, pageNumber } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [apiKeys, totalCount] = await Promise.all([
    ApiKeyModel.find({ userId })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }),
    ApiKeyModel.countDocuments({ userId }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    apiKeys,
    pagination: {
      pageSize,
      totalCount,
      totalPages,
      pageNumber,
      skip,
    },
  };
};

export const deleteApiKeyService = async (userId: string, apiKeyId: string) => {
  const result = await ApiKeyModel.deleteOne({
    _id: apiKeyId,
    userId,
  });

  if (result.deletedCount === 0) {
    throw new NotFoundException("API key not found");
  }

  return {
    deletedCount: result.deletedCount,
  };
};
