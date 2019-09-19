#!/usr/bin/env node

import App from "./App";
import { logger } from "./logger";
import plugins from "./plugins";

export const app: App = new App([]);

const main = (): void => {
  logger.info("Start nodebar");
  app.setPlugins(plugins);
  logger.debug(app);
  app.run(false);
};

main();
