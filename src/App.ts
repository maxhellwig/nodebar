import Base from "./Plugins/Base";
import NoPlugin from "./NoPlugin";
import * as winston from "winston";
import Timeout = NodeJS.Timeout;
import { app } from "./index";
import { logger } from "./logger";

const HEADER: string = JSON.stringify({ "version": 1, "stop_signal": 10, "cont_signal": 12, "click_events": true });


function handleExit(msg: string, exitCode: number, restart: boolean) {
  logger.error(msg);
  process.exitCode = exitCode;
  if (restart) {

    app.rerun();
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

process.on("SIGQUIT", () => {
  handleExit("SIGQUIT received!", 0, true);
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
process.on("SIGABRT", () => {
  handleExit("SIGABRT received!", 0, true);
});

process.on("SIGCONT", () => {
  handleExit("SIGCONT received!", 0, true);
});

process.on("SIGUSR2", () => {
  handleExit("SIGUSR2 received!", 0, true);
});

process.on("uncaughtException", (err) => {
  handleExit("uncaughtException", 0, false);
});

export default class App {

  setPlugins(value: Array<Base>): void {
    this._plugins = value;
  }


  private _plugins: Array<Base>;
  private intervalHandler!: Timeout;
  private appLogger: winston.Logger;

  /**
   *
   * @param {Array<Base>} plugins
   */
  constructor(plugins: Array<Base>) {

    this._plugins = plugins;
    this.appLogger = logger;

  }

  /**
   *
   * @param {Array<Base>} plugins
   */
  collectOutput(plugins: Array<Base>): string {
    let output: string = "";
    plugins.forEach((plugin) => {
      const pluginOutput = plugin.emit();
      output += `,${pluginOutput}`;
    });
    return output;
  }

  run() {
    const self = this;
    self.appLogger.info("Printing header");
    console.log(HEADER);
    self.appLogger.info("Start infinite json array");
    console.log("[");
    self.appLogger.info("First entry is empty");
    console.log("[]");
    if (this._plugins.length === 0) {
      self.appLogger.info("No Plugins found");
      this._plugins.push(new NoPlugin("No plugins!", 45000));
    }
    try {
      self.appLogger.info("Iterating through plugins");
      this._plugins.forEach(function(plugin) {
        self.appLogger.info("Starting cycling for plugin " + plugin.name);
        self.appLogger.debug(`${plugin.toString()}`);
        plugin.run();
      });
      this.intervalHandler = setInterval(() => {
        let output: string;
        output = this.collectOutput(this._plugins);
        // remove the first comma in array
        console.log(`,[${output}]`.replace("\[,", "\["));
        output = "";
      }, 1000);
    } catch (e) {
      this.rerun(e);
    }

  }

  rerun(e?: Error) {
    this.appLogger.warn(`rerun() was called! An uncatched exception from a plugins run has been thrown!`);
    if (e instanceof Error) {
      this.appLogger.error(e);
    }
    this.appLogger.warn(`Clearing infinite loop Interval`);
    global.clearInterval(this.intervalHandler);
    this.appLogger.warn(`Starting over!`);
    this.run();
  }

}
