import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { UploadSourceEnum } from "../models/file.model";
import { uploadFilesSerice } from "../services/files.service";

export const uploadFilesViaWebController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const files = req.files as Express.Multer.File[];
    const uploadedVia = UploadSourceEnum.WEB;

    const results = await uploadFilesSerice(userId, files, uploadedVia);

    return res.status(HTTPSTATUS.OK).json(results);
  }
);
