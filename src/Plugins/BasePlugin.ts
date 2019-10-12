import * as winston from "winston";
import { logger } from "../logger";
import { spawn } from "child_process";

import uuid = require("uuid/v1");

interface Updateable {
  cycle(): void;
  emit(): string;
  onClick(button: number): void;
}

export class NotImplemented extends Error {
  public constructor(message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = "NotImplemented";
    this.message = message;
  }
}

enum ClickButtons {
  LEFT = 1,
  MIDDLE,
  RIGHT
}

export interface ClickCommand {
  button: ClickButtons;
  command: string;
}

export default class BasePlugin implements Updateable {
  protected static logger: winston.Logger = logger;

  private _fullText: string = "";
  protected shortText: string = "";
  protected color: string = "#ffffff";
  protected background: string = "#000000";
  protected minWidth: number = 300;
  protected align: string = "right";
  protected urgent: boolean = false;
  public name: string = "";
  public instance: string = "";
  protected separator: boolean = true;
  protected separatorBlockWidth: number = 9;
  protected ticks: number = 1;
  protected clickCommands: ClickCommand[];

  public constructor(
    name: string,
    ticks: number,
    onClick?: ClickCommand[],
    customUuid?: string
  ) {
    this.name = name;
    this.instance = customUuid || uuid();
    this.clickCommands = onClick || [];
    this.ticks = ticks;
  }

  public get fullText(): string {
    return this._fullText;
  }

  public set fullText(value: string) {
    this._fullText = value;
  }

  public cycle(): void {
    throw new NotImplemented("Please implement me");
  }

  public emit(): string {
    return JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/camelcase
      full_text: this._fullText,
      name: this.name,
      color: this.color,
      background: this.background,
      urgent: this.urgent
    });
  }

  public onClick(button: number): void {
    logger.info(`clicked: ${button}`);
    if (button in ClickButtons) {
      const commandEvent = this.clickCommands.filter(
        (command): boolean => command.button == button
      );
      logger.info(`would start: ${commandEvent[0].button}`);
      const command: string = commandEvent[0].command.split(" ")[0];
      const args: string[] = commandEvent[0].command.split(" ");
      args.shift();
      let subprocess;
      if (args.length != 0) {
        logger.info(`arguments: ${args}`);
        subprocess = spawn(command[0], args);
      } else {
        logger.info(`command: ${command}`);
        subprocess = spawn(command);
      }
      subprocess.on(
        "error",
        (err): void => {
          logger.error(`Failed to run process ${err}`);
        }
      );
    }
  }

  public run(): void {
    const self = this;
    self.cycle();
    setInterval((): void => {
      try {
        self.cycle();
      } catch (e) {
        throw e;
      }
    }, self.ticks * 1000);
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
