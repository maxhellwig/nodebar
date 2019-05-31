import BasePlugin from "./BasePlugin";
import moment = require("moment");

export default class Clock extends BasePlugin {
  private readonly format: string = "YYYY-MM-DD hh:mm:ss";

  /**
   * Clock
   * a secondly updating clock plugin for nodebar
   * @param {string} name
   * @param {number} ticks
   * @param dateTimeFormat
   */
  public constructor(name: string, ticks: number, dateTimeFormat?: string) {
    super(name, ticks);
    this.format = dateTimeFormat || "YYYY-MM-DD k:mm:ss";
  }

  private getDateTime(): string {
    return moment().format(this.format);
  }

  public cycle(): void {
    this.fullText = this.getDateTime();
  }
}
