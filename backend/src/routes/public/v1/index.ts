import { Router } from "express";
import { apiKeyAuthMiddleware } from "../../../middlewares/apikey-auth.middleware";
import fileV1Routes from "./files.route";

const v1Routes = Router();

v1Routes.use("/files", apiKeyAuthMiddleware, fileV1Routes);

export default v1Routes;
