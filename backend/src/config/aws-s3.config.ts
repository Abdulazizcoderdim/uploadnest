import { S3Client } from "@aws-sdk/client-s3";
import { Env } from "./env.config";

const s3 = new S3Client({
  credentials: {
    accessKeyId: Env.AWS_ACCESS_KEY,
    secretAccessKey: Env.AWS_SECRET_KEY,
  },
  region: Env.AWS_REGION,
});

export { s3 };
