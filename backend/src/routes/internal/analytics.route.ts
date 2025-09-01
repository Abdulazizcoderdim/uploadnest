import { Router } from "express";
import { getUserAnalyticsWithChartController } from "../../controllers/analytics.controller";

const analyticsRoutes = Router();

analyticsRoutes.get("/user", getUserAnalyticsWithChartController);

export default analyticsRoutes;
