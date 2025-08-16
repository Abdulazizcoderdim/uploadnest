import { LogtailTransport } from "@logtail/winston";
import winston from "winston";
import { Env } from "../config/env.config";
import { logTail } from "../config/logtail.config";

const { combine, colorize, timestamp, errors, json, printf } = winston.format;

const transports: winston.transport[] = [];

if (Env.NODE_ENV === "production") {
  transports.push(new LogtailTransport(logTail));
}

if (Env.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
        errors({ stack: true }),
        printf(({ level, message, stack, timestamp, ...meta }) => {
          //const logEntry = {};
          //return JSON.stringify(logEntry)

          return `${timestamp} [${level?.toUpperCase()}]: ${message} ${stack ? stack : ""}${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
        }),
        colorize({
          all: true,
          colors: {
            info: "blue",
            warn: "yellow",
            error: "red",
            debug: "cyan",
            verbose: "grey",
            http: "green",
          },
        })
      ),
    })
  );
}

const logger = winston.createLogger({
  level: Env.LOG_LEVEL || "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: transports,
  silent: Env.NODE_ENV === "test",
});

export { logger };
