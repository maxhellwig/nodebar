import Base from "./Plugins/Base";
import NoPlugin from "./NoPlugin";
import * as winston from "winston";
import Timeout = NodeJS.Timeout;

const HEADER: string = JSON.stringify({ "version": 1, "stop_signal": 10, "cont_signal": 12, "click_events": true });

process.on("uncaughtException", e => {
  App.appLogger.error(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

export default class App {


  private readonly plugins: Array<Base>;
  private intervalHandler!: Timeout;
  public static appLogger: winston.Logger;

  /**
   *
   * @param {Array<Base>} plugins
   */
  constructor(plugins: Array<Base>) {

    this.plugins = plugins;
    App.appLogger = App.initiateLogger();
    if (process.env.NODE_ENV !== "production") {
      App.appLogger.add(new winston.transports.Console({
        level: "debug",
        format: winston.format.simple()
      }));
    }
  }

  static initiateLogger(): winston.Logger {
    return winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: "App" },
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" })
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
    console.log(HEADER);
    console.log("[");
    console.log("[]");
    if (this.plugins.length === 0) {
      this.plugins.push(new NoPlugin("No plugins!", 45000));
    }
    try {
      this.plugins.forEach(function(plugin) {
        App.appLogger.debug(`${plugin.toString()}`);
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
    App.appLogger.warn(`rerun() was called! An uncatched exception from a plugins run has been thrown!`);
    App.appLogger.error(e);
    App.appLogger.warn(`Clearing infinite loop Interval`);
    global.clearInterval(this.intervalHandler);
    App.appLogger.warn(`Starting over!`);
    this.run();
  }

}
