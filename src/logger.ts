import * as winston from "winston";
import { format } from "winston";
import { LOGPATH } from "./config";

const { combine, timestamp } = format;

export const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), format.json()),
  defaultMeta: { service: "index" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: LOGPATH + "/error.log",
      level: "error"
    }),
    new winston.transports.File({ filename: LOGPATH + "/combined.log" })
  ]
});
