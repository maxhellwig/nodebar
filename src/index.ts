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

function handleExit(msg: string, exitCode: number, restart: boolean) {
  logger.error(msg);
  process.exitCode = exitCode;
  if(restart) {
    main();
  } else {
    process.exit(exitCode);
  }
}

process.on("exit", function(code) {
  handleExit("exit received!", 1, false);
});

process.on("SIGTERM", () => {
  handleExit("SIGTERM received!", 1, false);
});


process.on("SIGINT", () => {
  handleExit("SIGINT received!", 1, false);

});
process.on("SIGHUP", () => {
  handleExit("SIGHUP received!", 0, true);

});

process.on("SIGWINCH", () => {
  handleExit("SIGWINCH received!", 0, true);

});

process.on("SIGPIPE", () => {
  handleExit("SIGPIPE received!", 0, true);

});

process.on("SIGBUS", () => {
  handleExit("SIGBUS received!", 0, true);

});

process.on("SIGFPE", () => {
  handleExit("SIGFPE received!", 0, true);

});

process.on("SIGSEGV", () => {
  handleExit("SIGSEGV received!", 0, true);

});
process.on("SIGILL", () => {
  handleExit("SIGILL received!", 0, true);

});

process.on("uncaughtException", (err) => {
  handleExit("uncaughtException", 0, true);
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
  logger.info("Start nodebar");
  const app = new App(plugins);
  logger.debug(app);
  app.run();
}

main();
