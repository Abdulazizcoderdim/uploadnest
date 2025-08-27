import { Router } from "express";
import { multiUpload } from "../../config/multer.config";
import { CheckStorageAvailability } from "../../middlewares/check-storage.middleware";

const filesRoutes = Router();

filesRoutes.post("/upload", multiUpload, CheckStorageAvailability);

filesRoutes.post("/download");
filesRoutes.get("/all");
filesRoutes.delete("/bulk-delete");

export default filesRoutes;
