import BasePlugin from "./Plugins/BasePlugin";
import NoPlugin from "./Plugins/NoPlugin";
import * as winston from "winston";
import { app } from "./index";
import { logger } from "./logger";
import readline from "readline";

const HEADER: string = JSON.stringify({
  version: 1,
  // eslint-disable-next-line @typescript-eslint/camelcase,@typescript-eslint/camelcase
  stop_signal: 10,
  // eslint-disable-next-line @typescript-eslint/camelcase
  cont_signal: 12,
  // eslint-disable-next-line @typescript-eslint/camelcase
  click_events: true
});

function handleExit(msg: string, exitCode: number, restart: boolean): void {
  logger.error(msg);
  process.exitCode = exitCode;
  if (restart) {
    app.rerun();
  } else {
    process.exit(exitCode);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
  output: process.stdout
});

process.on(
  "exit",
  (): void => {
    handleExit("exit received!", 1, false);
  }
);

process.on(
  "SIGTERM",
  (): void => {
    handleExit("SIGTERM received!", 0, false);
  }
);

process.on(
  "SIGINT",
  (): void => {
    handleExit("SIGINT received!", 0, false);
  }
);
process.on(
  "SIGHUP",
  (): void => {
    handleExit("SIGHUP received!", 0, true);
  }
);

process.on(
  "SIGWINCH",
  (): void => {
    handleExit("SIGWINCH received!", 0, true);
  }
);

process.on(
  "SIGPIPE",
  (): void => {
    handleExit("SIGPIPE received!", 0, true);
  }
);

process.on(
  "SIGQUIT",
  (): void => {
    handleExit("SIGQUIT received!", 0, true);
  }
);

process.on(
  "SIGBUS",
  (): void => {
    handleExit("SIGBUS received!", 0, true);
  }
);

process.on(
  "SIGFPE",
  (): void => {
    handleExit("SIGFPE received!", 0, true);
  }
);

process.on(
  "SIGSEGV",
  (): void => {
    handleExit("SIGSEGV received!", 0, true);
  }
);
process.on(
  "SIGILL",
  (): void => {
    handleExit("SIGILL received!", 0, true);
  }
);
process.on(
  "SIGABRT",
  (): void => {
    handleExit("SIGABRT received!", 0, true);
  }
);

process.on(
  "SIGCONT",
  (): void => {
    handleExit("SIGCONT received!", 0, true);
  }
);

process.on(
  "SIGUSR2",
  (): void => {
    handleExit("SIGUSR2 received!", 0, true);
  }
);

process.on(
  "uncaughtException",
  (): void => {
    handleExit("uncaughtException", 0, false);
  }
);

export default class App {
  public setPlugins(value: BasePlugin[]): void {
    this._plugins = value;
  }

  private _plugins: BasePlugin[];
  private intervalHandler!: any;

  /**
   *
   * @param {Array<BasePlugin>} plugins
   */
  public constructor(plugins: BasePlugin[]) {
    this._plugins = plugins;

    rl.on(
      "line",
      (line): void => {
        try {
          if (line != "[") {
            logger.info(App.prepareClickEventLine(line));
            const event = JSON.parse(App.prepareClickEventLine(line));
            this.onPluginClick(event.name, event.instance, event.button);
          }
        } catch (e) {
          logger.error(
            `Failed to parse click event ${e} \n message was ${line}`
          );
        }
      }
    );
  }

  /**
   *
   * @param line
   * @returns string
   */
  private static prepareClickEventLine(line: string): string {
    return line.trim().replace(new RegExp("^,"), "");
  }

  /**
   *
   * @param {Array<BasePlugin>} plugins
   */
  private collectOutput(plugins: BasePlugin[]): string {
    let output = "";
    plugins.forEach(
      (plugin): void => {
        const pluginOutput = plugin.emit();
        output += `,${pluginOutput}`;
      }
    );
    return output;
  }

  public onPluginClick(name: string, instance: string, button: number): void {
    for (let plugin of this._plugins) {
      if (plugin.name == name) {
        try {
          plugin.onClick(button);
        } catch (e) {
          logger.error(e);
        }
        return;
      }
    }
    logger.error(
      `Click by unregistered plugin "${name}" instance "${instance}"`
    );
  }

  public run(printHeader: boolean): void {
    if (!printHeader) {
      logger.info("Printing header");
      console.log(HEADER);
      logger.info("Start infinite json array");
      console.log("[");
      logger.info("First entry is empty");
      console.log("[]");
    }

    if (this._plugins.length === 0) {
      logger.info("No Plugins found");
      this._plugins.push(new NoPlugin("No plugins!", 45000));
    }
    try {
      logger.info("Iterating through plugins");
      this._plugins.forEach(function(plugin: BasePlugin): void {
        logger.info("Starting cycling for plugin " + plugin.name);
        logger.debug(`${plugin.toString()}`);
        plugin.run();
      });
      this.intervalHandler = setInterval((): void => {
        let output: string;
        output = this.collectOutput(this._plugins);
        // remove the first comma in array
        console.log(`,[${output}]`.replace("[,", "["));
        output = "";
      }, 1000);
    } catch (e) {
      this.rerun(e);
    }
  }

  public rerun(e?: Error): void {
    logger.warn(
      `rerun() was called! An uncatched exception from a plugins run has been thrown!`
    );
    if (e instanceof Error) {
      logger.error(e);
    }
    logger.warn(`Clearing infinite loop Interval`);
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler);
    }
    logger.warn(`Starting over!`);
    this.run(true);
  }
}
