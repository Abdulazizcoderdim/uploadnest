import { Router } from "express";
import {
  createApiKeyController,
  deleteApiKeyController,
  getAllApiKeysController,
} from "../../controllers/apikey.controller";

const apikeyRoutes = Router();

apikeyRoutes.post("/create", createApiKeyController);
apikeyRoutes.get("/all", getAllApiKeysController);
apikeyRoutes.delete("/:id", deleteApiKeyController);

export default apikeyRoutes;
