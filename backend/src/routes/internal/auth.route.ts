import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/register");
authRoutes.post("/login");

export default authRoutes;
