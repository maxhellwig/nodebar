#!/usr/bin/env node
import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";
import Hostname from "./Plugins/Hostname";
import Release from "./Plugins/OSRelease";
import App from "./App";
import Uptime from "./Plugins/Uptime";
import Net from "./Plugins/Net";
import Battery from "./Plugins/Battery";
import { logger } from "./logger";

export const app: App = new App([]);


function main() {
  const plugins: Array<Base> = [];
  const enp0s3: Base = new Net("enp0s3", 5);
  const release: Base = new Release("Release", 3600);
  const hostname: Base = new Hostname("Hostname", 3600);
  const battery0: Base = new Battery("Bat0", 10, "Bat0");
  const battery1: Base = new Battery("Bat1", 10, "Bat1");
  const uptime: Base = new Uptime("Uptime", 1);
  const clock: Base = new Clock("Clock", 1);
  plugins.push(enp0s3, release, hostname, uptime, clock);
  logger.info("Start nodebar");
  app.setPlugins(plugins);
  logger.debug(app);
  app.run(false);
}

main();
