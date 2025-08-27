import { Router } from "express";

const filesRoutes = Router();

filesRoutes.post("/upload");

filesRoutes.post("/download");
filesRoutes.get("/all");
filesRoutes.delete("/bulk-delete");

export default filesRoutes;
