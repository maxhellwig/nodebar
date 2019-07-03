import { Notifiable, UrgencyLevel } from "./Notifiable";
import { spawn } from "child_process";

export interface NotificationOptions {
  urgency: UrgencyLevel;
  expireTime?: number;
}

export class NotifySend implements Notifiable {

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  body: string = "";
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  summary: string = "";

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  _options: NotificationOptions = {
    urgency: UrgencyLevel.NORMAL,
    expireTime: 3000 // in ms
  };

  public notify(summary: string, body: string): void {
    const response = spawn("notify-send", [
      summary,
      body,
      `--expire-time=${this._options.expireTime}`,
      `--urgency=${this._options.urgency}`
    ]);
    console.log(response)
  }
}
