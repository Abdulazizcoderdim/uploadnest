import { UploadSourceEnum } from "../models/file.model";
import UserModel from "../models/user.model";
import { BadRequestException, UnauthorizedException } from "../utils/app-error";

export const uploadFilesSerice = async (
  userId: string,
  files: Express.Multer.File[],
  uploadedVia: keyof typeof UploadSourceEnum
) => {
  const user = await UserModel.findOne({ _id: userId });
  if (!user) throw new UnauthorizedException("Unauthorized access");
  if (!files.length) throw new BadRequestException("No files provided");

  const results = await Promise.allSettled(
    files.map(async (file) => {
      let _storageKey: string | null = null;

      try {
      } catch (error) {}
    })
  );
};
