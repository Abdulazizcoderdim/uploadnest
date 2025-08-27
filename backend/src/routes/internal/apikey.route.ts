import { Router } from "express";

const apikeyRoutes = Router();

apikeyRoutes.post("/create");
apikeyRoutes.get("/all");
apikeyRoutes.delete("/:id");

export default apikeyRoutes;
