#!/usr/bin/env node
// eslint-disable-next-line no-unused-vars
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

const main = (): void => {
  const plugins: BasePlugin[] = [];
  const enp0s31f6: BasePlugin = new Net("enp0s31f6", 5, [{ button: 1, command: "/usr/bin/nm-applet" }]);
  const wlp4s0: BasePlugin = new Net("wlp4s0", 5, [{ button: 1, command: "/usr/bin/nm-applet" }]);
  const release: BasePlugin = new Release("Release", 3600);
  const hostname: BasePlugin = new Hostname("Hostname", 3600);
  const battery0: BasePlugin = new Battery("Bat0", 10, "Bat0");
  const battery1: BasePlugin = new Battery("Bat1", 10, "Bat1");
  const uptime: BasePlugin = new Uptime("Uptime", 1);
  const clock: BasePlugin = new Clock("Clock", 1);
  plugins.push(enp0s31f6, wlp4s0, release, hostname, battery0, battery1, uptime, clock);
  logger.info("Start nodebar");
  app.setPlugins(plugins);
  logger.debug(app);
  app.run(false);
};

main();
