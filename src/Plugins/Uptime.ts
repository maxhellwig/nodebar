import Base from "./Base";
import * as os from "os";
import moment = require("moment");

const humanizeDuration = require("humanize-duration");

export default class Uptime extends Base {
  constructor(name: string, ticks: number) {
    super(name, ticks);
  }

  static isUpOverAYear(uptime: number): boolean {
    return uptime >= 31557600;
  }

  cycle(): void {
    const humanizeDurationLangOptions = {
      language: "shortEn",
      languages: {
        shortEn: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "days",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms"
        }
      }
    };
    const uptime = os.uptime();
    const momentDuration = moment.duration(uptime, "seconds");
    const isUpOverAYear = Uptime.isUpOverAYear(uptime);
    this.full_text = momentDuration.humanize() + " up";
    this.background = isUpOverAYear ? "#ff0000" : "#000000";
    if(isUpOverAYear) {
      this.full_text = this.full_text + " Please restart!"
    }
    this.short_text = humanizeDuration(uptime * 1000, humanizeDurationLangOptions);
  }
}
