import BasePlugin from "./BasePlugin";
import * as os from "os";
import moment = require("moment");

export const leftPad = (input: number): string => {
  if (input < 10) {
    return "0" + input;
  } else {
    return input.toString();
  }
};

export default class Uptime extends BasePlugin {
  private _uptime: number = 0;

  public get uptime(): number {
    return this._uptime;
  }

  public set uptime(value: number) {
    this._uptime = value;
  }

  public constructor(name: string, ticks: number) {
    super(name, ticks);
  }

  /**
   * When the system uptime is greater than one year this functions sets the background to red and urgency true.
   * It does this by changing the current object instance attributes.
   */
  private handleUptimeOverAYear(): void {
    // second of a whole year. Your system is up for over a year??? For the kernel to update you have to restart your system!
    const hasLongUptime = this._uptime >= 31557600;
    if (hasLongUptime) {
      this.background = "#ff0000";
      this.urgent = true;
      this.fullText = this.fullText + " Please restart your system!";
    }
  }

  private static formatDateTime(uptime: moment.Duration): string {
    const days = uptime.days();
    const hours = uptime.hours();
    const minutes = uptime.minutes();
    const seconds = uptime.seconds();

    return `${days} days ${leftPad(hours)}:${leftPad(minutes)}:${leftPad(
      seconds
    )}`;
  }

  public getUptime = (): number => os.uptime();

  /**
   * Reads current update using the os.uptime() methode provided by nodejs.
   * For fullText it formats the time to inform the user in a humanized ways instead of the number of seconds since system start.
   * For shortText it prints just the number of seconds.
   */
  public cycle(): void {
    this.uptime = this.getUptime();
    const momentDuration = moment.duration(this.uptime, "seconds");
    this.fullText = Uptime.formatDateTime(momentDuration);
    this.shortText = os.uptime().toString();
    this.handleUptimeOverAYear();
  }
}
