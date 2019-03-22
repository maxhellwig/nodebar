import BasePlugin from "./BasePlugin";
import * as os from "os";
import moment = require("moment");

export default class Uptime extends BasePlugin {

  private _uptime: number = 0;

  get uptime(): number {
    return this._uptime;
  }

  set uptime(value: number) {
    this._uptime = value;
  }

  constructor(name: string, ticks: number) {
    super(name, ticks);

  }

  /**
   * When the system uptime is greater than one whole year this functions sets the background to red and urgency true.
   * It does this by changing the current object instance attributes.
   */
  private handleUptimeOverAYear(): void {
    // second of a whole year. Your system is up for over a year??? For the kernel to update you have to restart your system!
    const isOver = this._uptime >= 31557600;
    if (isOver) {
      this.background = "#ff0000";
      this.urgent = true;
      this.full_text = this.full_text + " Please restart your system!";
    }
  }


  private static pad(input: number): string {
    if(input < 10) {
      return "0"+input
    } else {
      return input.toString();
    }
  }

  private static formatDateTime(uptime: any): string {
    const days = uptime.days();
    const hours = uptime.hours();
    const minutes = uptime.minutes();
    const seconds = uptime.seconds();

    return `${days} days ${Uptime.pad(hours)}:${Uptime.pad(minutes)}:${Uptime.pad(seconds)}`
  }

  /**
   * Reads current update using the os.uptime() methode provided by nodejs.
   * For full_text it formats the time to inform the user in a humanized ways instead of the number of seconds since system start.
   * For short_text it prints just the number of seconds.
   */
  cycle(): void {
    this.uptime = os.uptime();
    const momentDuration = moment.duration(this.uptime, "seconds");
    this.full_text = Uptime.formatDateTime(momentDuration);
    this.short_text = os.uptime().toString();
    this.handleUptimeOverAYear();
  }
}
