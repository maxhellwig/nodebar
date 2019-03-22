#!/usr/bin/env node
import BasePlugin from "./Plugins/BasePlugin";
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
  const plugins: Array<BasePlugin> = [];
  const enp0s3: BasePlugin = new Net("enp0s3", 5);
  const release: BasePlugin = new Release("Release", 3600);
  const hostname: BasePlugin = new Hostname("Hostname", 3600);
  const battery0: BasePlugin = new Battery("Bat0", 10, "Bat0");
  const battery1: BasePlugin = new Battery("Bat1", 10, "Bat1");
  const uptime: BasePlugin = new Uptime("Uptime", 1);
  const clock: BasePlugin = new Clock("Clock", 1);
  plugins.push(enp0s3, release, hostname, battery0, battery1, uptime, clock);
  logger.info("Start nodebar");
  app.setPlugins(plugins);
  logger.debug(app);
  app.run(false);
}

main();
