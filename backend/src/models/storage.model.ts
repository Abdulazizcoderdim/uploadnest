import mongoose, { Model, Schema, Types } from "mongoose";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { BadRequestException, NotFoundException } from "../utils/app-error";
import { formatBytes } from "../utils/format-byte";
import FileModel from "./file.model";

export const STORAGE_QUOTA = 2 * 1024 * 1024 * 1024; //2GB

interface IStorage {
  userId: Types.ObjectId;
  storageQuota: number;
  createdAt: Date;
  updatedAt: Date;
}

interface StorageMetrics {
  quota: number;
  usage: number;
  remaining: number;
}

interface UploadValidation {
  allowed: boolean;
  newUsage: number;
  remainingAfterUpload: number;
}

interface StorageStatics {
  getStorageMetrics(userId: Types.ObjectId): Promise<StorageMetrics>;
  validateUpload(
    userId: Types.ObjectId,
    fileSize: number
  ): Promise<UploadValidation>;
}

interface StorageDocument extends IStorage, Document {}

interface StorageModelType extends Model<StorageDocument>, StorageStatics {}

const StorageSchema = new Schema<StorageDocument, StorageModelType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storageQuota: {
      type: Number,
      default: STORAGE_QUOTA,
      min: [0, "Storage quota must be a positive number"],
    },
  },
  {
    timestamps: true,
  }
);

StorageSchema.statics = {
  async getStorageMetrics(userId: Types.ObjectId) {
    const storage = await this.findOne({ userId }).lean();

    if (!storage) throw new NotFoundException("Storage record not found");

    const usage = await FileModel.calculateUsage(userId);

    return {
      quota: storage.storageQuota,
      usage: usage,
      remaining: storage.storageQuota - usage,
    };
  },

  async validateUpload(userId: Types.ObjectId, totalFileSize: number) {
    if (totalFileSize < 0) {
      throw new BadRequestException("File size must be positive");
    }

    const metrics = await this.getStorageMetrics(userId);
    const hasSpace = metrics.remaining >= totalFileSize;

    if (!hasSpace) {
      const shortFall = totalFileSize - metrics.remaining;
      throw new BadRequestException(
        `Insufficient storage. ${formatBytes(shortFall)} needed.`,
        ErrorCodeEnum.INSUFFICIENT_STORAGE
      );
    }

    return {
      allowed: true,
      newUsage: metrics.usage + totalFileSize,
      remainingAfterUpload: metrics.remaining - totalFileSize,
    };
  },
};

const StorageModel = mongoose.model<StorageDocument, StorageModelType>(
  "Storage",
  StorageSchema
);

export default StorageModel;
