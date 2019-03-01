import Base from "./Base";
import * as os from "os";

export default class Uptime extends Base {
  constructor(name: string, ticks: number) {
    super(name, ticks);
  }

  static formatUptime(uptime: number): string {
    function pad(s: number) {
      return (s < 10 ? "0" : "") + s;
    }

    const hours = Math.floor(uptime / (60 * 60));
    const minutes = Math.floor((uptime - (hours * (60 * 60))) / 60);
    const seconds = uptime - (hours * 3600) - (minutes * 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  cycle(): void {
    this.full_text = Uptime.formatUptime(os.uptime());
  }
}
