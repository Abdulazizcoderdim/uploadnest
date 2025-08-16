import { Logtail } from "@logtail/node";
import { Env } from "./env.config";

export const logTail = new Logtail(Env.LOGTAIL_SOURCE_TOKEN, {
  endpoint: Env.LOGTAIL_INGESTING_HOST,
});
