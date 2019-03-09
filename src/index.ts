#!/usr/bin/env node
import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";
import Hostname from "./Plugins/Hostname";
import Release from "./Plugins/OSRelease";
import App from "./App";
import Uptime from "./Plugins/Uptime";
import Net from "./Plugins/Net";
import * as winston from "winston";
import { LOGPATH } from "./config";
import Battery from "./Plugins/Battery";


const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "index" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: LOGPATH + "/error.log", level: "error" }),
    new winston.transports.File({ filename: LOGPATH + "/combined.log" })
  ]
});

function handleExit(msg: string) {
  logger.error(msg);
}

process.on("beforeExit", function() {
  handleExit("beforeExit called");
});

process.on("SIGTERM", () => {
  handleExit("SIGTERM received!");
  process.exit(1);
});


process.on("SIGINT", () => {
  handleExit("SIGINT received!");
  process.exit(1);

});
process.on("SIGHUP", () => {
  handleExit("SIGHUP received!");
  process.exit(1);

});

process.on("SIGWINCH", () => {
  handleExit("SIGWINCH received!");
  process.exit(1);

});
process.on("SIGBUS", () => {
  handleExit("SIGBUS received!");
  process.exit(1);

});

process.on("SIGFPE", () => {
  handleExit("SIGFPE received!");
  process.exit(1);

});

process.on("SIGSEGV", () => {
  handleExit("SIGSEGV received!");
  process.exit(1);

});
process.on("SIGILL", () => {
  handleExit("SIGILL received!");
  process.exit(1);

});

process.on("uncaughtException", (err) => {
  handleExit(`Caught exception: ${err}\n`);
});

function main() {
  const plugins: Array<Base> = [];
  const enp0s3: Base = new Net("enp0s3", 5);
  const release: Base = new Release("Release", 3600);
  const hostname: Base = new Hostname("Hostname", 3600);
  const battery0: Base = new Battery("Bat0", 10, "Bat0");
  const battery1: Base = new Battery("Bat1", 10, "Bat1");
  const uptime: Base = new Uptime("Uptime", 1);
  const clock: Base = new Clock("Clock", 1);
  plugins.push(enp0s3, release, hostname, battery0, battery1, uptime, clock);
  const app = new App(plugins);
  logger.info("Start nodebar");
  app.run();
}

main();
