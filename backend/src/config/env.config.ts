import { getEnv } from "../utils/get-env";

const envConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "3000"),

  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI", ""),

  JWT_SECRET: getEnv("JWT_SECRET", "secert_jwt"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d"),

  LOG_LEVEL: getEnv("LOG_LEVEL", "info"),

  AWS_ACCESS_KEY: getEnv("AWS_ACCESS_KEY"),
  AWS_SECRET_KEY: getEnv("AWS_SECRET_KEY"),
  AWS_REGION: getEnv("AWS_REGION"),
  AWS_S3_BUCKET: getEnv("AWS_S3_BUCKET"),

  LOGTAIL_SOURCE_TOKEN: getEnv("LOGTAIL_SOURCE_TOKEN"),
  LOGTAIL_INGESTING_HOST: getEnv("LOGTAIL_INGESTING_HOST"),

  ALLOWED_ORIGINS: getEnv(
    "ALLOWED_ORIGINS",
    "https://uploadnestpro.vercel.app"
  ),
});

export const Env = envConfig();
