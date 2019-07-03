import { Notifiable, UrgencyLevel } from "./Notifiable";
import { spawn } from "child_process";


export interface NotificationOptions {
  urgency: UrgencyLevel;
  expireTime?: number;
}

export class NotifySend implements Notifiable {
  public set options(value: NotificationOptions) {
    this._options = value;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  body: string = "";
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  private _options: NotificationOptions = {
    urgency: UrgencyLevel.NORMAL,
    expireTime: 10
  };
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  summary: string = "";

  public notify(summary: string, body: string): void {
    spawn("notify-send", [
      summary,
      body,
      `--expire-time ${this._options.expireTime}`,
      `--urgency ${this._options.urgency}`
    ]);

  }
}
