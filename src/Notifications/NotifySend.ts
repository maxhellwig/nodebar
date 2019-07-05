import { Notifiable, UrgencyLevel } from "./Notifiable";
import * as winston from "winston";
import { logger } from "../logger";

export interface NotifySendOptions {
  urgency: UrgencyLevel;
  expireTime?: number;
}

export class NotifySend implements Notifiable {
  protected static logger: winston.Logger = logger;

  public set options(value: NotifySendOptions) {
    this._options = value;
  }

  private _options: NotifySendOptions = {
    urgency: UrgencyLevel.NORMAL,
    expireTime: 3000 // in ms
  };

  public getSpawn = (process: string, params: string[]) => require("child_process").spawn(process, params);

  public notify(summary: string, body: string): void {
    const response = this.getSpawn("notify-send", [
      summary,
      body,
      `--expire-time=${this._options.expireTime}`,
      `--urgency=${this._options.urgency}`
    ]);
    logger.info(response);
  }
}
