import { Router } from "express";
import { multiUpload } from "../../config/multer.config";
import {
  deleteFilesController,
  downloadFilesController,
  getAllFilesController,
  uploadFilesViaWebController,
} from "../../controllers/files.controller";
import { CheckStorageAvailability } from "../../middlewares/check-storage.middleware";

const filesRoutes = Router();

filesRoutes.post(
  "/upload",
  multiUpload,
  CheckStorageAvailability,
  uploadFilesViaWebController
);

filesRoutes.post("/download", downloadFilesController);
filesRoutes.get("/all", getAllFilesController);
filesRoutes.delete("/bulk-delete", deleteFilesController);

export default filesRoutes;
