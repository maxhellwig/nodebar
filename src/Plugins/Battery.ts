import Base from "./Base";
import { COLORS } from "../config";
import fs from "fs";

const fsPromises = fs.promises;

export default class Battery extends Base {

  private readonly batteryBasePath: string = "/sys/class/power_supply";
  private readonly battery: string;
  private readonly capacityPath: string;
  private readonly statusPath: string;
  private warningCapacity: number = 30;
  private warningColor: string = COLORS.WARNING;
  private warningBackground: string = COLORS.BLACK;
  private criticalCapacity: number = 10;
  private criticalColor: string = COLORS.WHITE;
  private criticalBackground: string = COLORS.CRITICAL;

  constructor(name: string, ticks: number, battery: string) {
    super(name, ticks);
    this.battery = battery.toUpperCase();
    this.capacityPath = `${this.batteryBasePath}/${this.battery}/capacity`;
    this.statusPath = `${this.batteryBasePath}/${this.battery}/status`;
  }

  getValue(path: string): Promise<string> {
    return new Promise(((resolve, reject) => {
      fsPromises.readFile(path, "utf8").then((res) => {
        resolve(res);
      }).catch((e) => {
        reject(e);
      });
    }));

  }

  async cycle() {
    let capacity: number;
    let status: string = "";
    try {
      capacity = parseInt(await this.getValue(this.capacityPath));
      status = await this.getValue(this.statusPath);
      status = status.replace(/\n/, "");
      this.full_text = `${status} ${capacity}%`;
      this.short_text = `${capacity}%`;

      if (capacity < this.criticalCapacity) {
        this.color = this.criticalColor;
        this.background = this.criticalBackground;
      } else if (capacity < this.warningCapacity) {
        this.color = this.warningColor;
        this.background = this.warningBackground;
      } else {
        this.color = COLORS.WHITE;
        this.background = COLORS.BLACK;
      }
    } catch (e) {
      Base.logger.error("Could not read battery capacity");
      Base.logger.error(e);
      const msg = `${this.battery} not found!`;
      this.full_text = msg;
      this.short_text = msg;
      this.color = COLORS.WHITE;
      this.background = COLORS.CRITICAL;
    }
  }
}

