import Base from "./Plugins/Base";
import NoPlugin from "./NoPlugin";
import * as winston from "winston";
import Timeout = NodeJS.Timeout;
import { LOGPATH } from "./config";

const HEADER: string = JSON.stringify({ "version": 1, "stop_signal": 10, "cont_signal": 12, "click_events": true });

export default class App {


  private readonly plugins: Array<Base>;
  private intervalHandler!: Timeout;
  private appLogger: winston.Logger;

  /**
   *
   * @param {Array<Base>} plugins
   */
  constructor(plugins: Array<Base>) {

    this.plugins = plugins;
    this.appLogger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: "App" },
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: LOGPATH + "/error.log", level: "error" }),
        new winston.transports.File({ filename: LOGPATH + "/combined.log" })
      ]
    });

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
    console.log(HEADER);
    console.log("[");
    console.log("[]");
    if (this.plugins.length === 0) {
      this.plugins.push(new NoPlugin("No plugins!", 45000));
    }
    try {
      this.plugins.forEach(function(plugin) {
        self.appLogger.info("Starting cycling for plugin " + plugin.name);
        self.appLogger.debug(`${plugin.toString()}`);
        plugin.run();
      });
      this.intervalHandler = setInterval(() => {
        let output: string;
        output = this.collectOutput(this.plugins);
        // remove the first comma in array
        console.log(`,[${output}]`.replace("\[,", "\["));
        output = "";
      }, 1000);
    } catch (e) {
      this.rerun(e);
    }

  }

  rerun(e: Error) {
    this.appLogger.warn(`rerun() was called! An uncatched exception from a plugins run has been thrown!`);
    this.appLogger.error(e);
    this.appLogger.warn(`Clearing infinite loop Interval`);
    global.clearInterval(this.intervalHandler);
    this.appLogger.warn(`Starting over!`);
    this.run();
  }

}
