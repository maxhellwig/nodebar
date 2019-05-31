import * as winston from "winston";
import { logger } from "../logger";

import uuid from "uuid/v1";

interface Updateable {
  cycle(): void;
  emit(): string;
}

export class NotImplemented extends Error {
  public constructor(message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = "NotImplemented";
    this.message = message;
  }
}

export default class BasePlugin implements Updateable {
  protected static logger: winston.Logger = logger;

  protected fullText: string = "";
  protected shortText: string = "";
  protected color: string = "#ffffff";
  protected background: string = "#000000";
  protected minWidth: number = 300;
  protected align: string = "right";
  protected urgent: boolean = false;
  public name: string = "";
  protected instance: string = "";
  protected separator: boolean = true;
  protected separatorBlockWidth: number = 9;
  protected ticks: number = 1;

  public constructor(name: string, ticks: number, customUuid?: string) {
    this.name = name;
    this.instance = customUuid || uuid();
    this.ticks = ticks;
  }

  public cycle(): void {
    throw new NotImplemented("Please implement me");
  }

  public emit(): string {
    return JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/camelcase
      full_text: this.fullText,
      name: this.name,
      color: this.color,
      background: this.background,
      urgent: this.urgent
    });
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
