import "dotenv/config";

import cors, { CorsOptions } from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import { Env } from "./config/env.config";
import { UnauthorizedException } from "./utils/app-error";

const app = express();

const allowedOrigins = Env.ALLOWED_ORIGINS?.split(",");

const corsOptions: CorsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      const errorMsg = `CORS error: Origin ${origin} is not allowed`;
      callback(new UnauthorizedException(errorMsg));
    }
  },
};

// Middlewares
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(passport.initialize());

// Routes
app.get("/", asyncHandler);
