import { Router } from "express";
import { multiUpload } from "../../../config/multer.config";
import { uploadFilesViaApiController } from "../../../controllers/files.controller";
import { CheckStorageAvailability } from "../../../middlewares/check-storage.middleware";

const fileV1Routes = Router();

fileV1Routes.post(
  "/upload",
  multiUpload,
  CheckStorageAvailability,
  uploadFilesViaApiController
);

export default fileV1Routes;
