import mongoose, { Model, Schema, Types } from "mongoose";
import { formatBytes } from "../utils/format-byte";

export enum UploadSourceEnum {
  WEB = "WEB",
  API = "API",
}

export interface FileDocument extends Document {
  userId: Types.ObjectId;
  originalName: string;
  storageKey: string;
  mimeType: string;
  size: number; //bytes
  formattedSize: string;
  ext: string;
  uploadVia: keyof typeof UploadSourceEnum;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FileModelType extends Model<FileDocument> {
  calculateUsage(userId: Types.ObjectId): Promise<number>;
}

const FileSchema = new Schema<FileDocument, FileModelType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    storageKey: {
      type: String,
      required: true,
      unique: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      min: 1,
    },
    ext: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    uploadVia: {
      type: String,
      enum: Object.keys(UploadSourceEnum),
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret) => {
        ret.formattedSize = formatBytes(ret.size);
        return ret;
      },
    },
    toJSON: {
      transform: (doc, ret) => {
        ret.formattedSize = formatBytes(ret.size);
        return ret;
      },
    },
  }
);

FileSchema.statics.calculateUsage = async function (
  userId: Types.ObjectId
): Promise<number> {
  const result = await this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalSize: {
          $sum: "$size",
        },
      },
    },
  ]);
  return result[0]?.totalSize || 0;
};

// index
FileSchema.index({ userId: 1 });
FileSchema.index({ createdAt: -1 });

const FileModel = mongoose.model<FileDocument, FileModelType>(
  "File",
  FileSchema
);

export default FileModel;
