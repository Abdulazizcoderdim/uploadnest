import { Router } from "express";
import analyticsRoutes from "./analytics.route";
import apikeyRoutes from "./apikey.route";
import authRoutes from "./auth.route";
import filesRoutes from "./files.route";

const internalRoutes = Router();

internalRoutes.use("/auth", authRoutes);
internalRoutes.use("/files", filesRoutes);
internalRoutes.use("/analytics", analyticsRoutes);

internalRoutes.use("/apikey", apikeyRoutes);

export default internalRoutes;
