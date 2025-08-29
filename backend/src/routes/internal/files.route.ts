import { Router } from "express";
import { multiUpload } from "../../config/multer.config";
import { uploadFilesViaWebController } from "../../controllers/files.controller";
import { CheckStorageAvailability } from "../../middlewares/check-storage.middleware";

const filesRoutes = Router();

filesRoutes.post(
  "/upload",
  multiUpload,
  CheckStorageAvailability,
  uploadFilesViaWebController
);

filesRoutes.post("/download");
filesRoutes.get("/all");
filesRoutes.delete("/bulk-delete");

export default filesRoutes;
