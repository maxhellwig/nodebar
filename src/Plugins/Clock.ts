import Base from "./Base";
import moment = require("moment");

export default class Clock extends Base {

  format: string = "YYYY-MM-DD hh:mm:ss";

  /**
   * Clock
   * a secondly updating clock plugin for nodebar
   * @param {string} name
   * @param {number} ticks
   * @param dateTimeFormat
   */
  constructor(name: string, ticks: number, dateTimeFormat?: string) {
    super(name, ticks);
    this.format = dateTimeFormat || "YYYY-MM-DD hh:mm:ss";
  }

  getDateTime(): string {
    return moment().format(this.format);
  }

  cycle() {
    this.full_text = this.getDateTime();
  }
}
