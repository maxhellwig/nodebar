import BasePlugin from "./BasePlugin";
import { COLORS } from "../config";
import fs from "fs";

const fsPromises = fs.promises;

enum warningLevel {
  normal = "normal",
  warning = "warning",
  critical = "critical"
}

export default class Battery extends BasePlugin {
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
  private previousLevel = warningLevel.normal;

  public constructor(name: string, ticks: number) {
    super(name, ticks);
    this.battery = name.toUpperCase();
    this.capacityPath = `${this.batteryBasePath}/${this.battery}/capacity`;
    this.statusPath = `${this.batteryBasePath}/${this.battery}/status`;
  }

  private getValue(path: string): Promise<string> {
    return new Promise(
      (resolve, reject): void => {
        fsPromises
          .readFile(path, "utf8")
          .then(
            (res): void => {
              resolve(res);
            }
          )
          .catch(
            (e): void => {
              reject(e);
            }
          );
      }
    );
  }

  private notify(capacity: number, level: warningLevel): void {
    if (level != this.previousLevel) {
      BasePlugin.logger.error(
        `Battery ${level}`,
        `${this.name} is below ${capacity}%`
      );
    }
  }

  public async cycle(): Promise<void> {
    let capacity: number;
    let status = "";
    try {
      capacity = parseInt(await this.getValue(this.capacityPath));
      status = await this.getValue(this.statusPath);
      status = status.replace(/\n/, "");
      this.fullText = `${status} ${capacity}%`;
      this.shortText = `${capacity}%`;

      if (capacity < this.criticalCapacity) {
        this.color = this.criticalColor;
        this.background = this.criticalBackground;
        this.notify(capacity, warningLevel.critical);
        this.previousLevel = warningLevel.critical;
      } else if (capacity < this.warningCapacity) {
        this.color = this.warningColor;
        this.background = this.warningBackground;
        this.notify(capacity, warningLevel.warning);
        this.previousLevel = warningLevel.warning;
      } else {
        this.color = COLORS.WHITE;
        this.background = COLORS.BLACK;
        this.previousLevel = warningLevel.normal;
      }
    } catch (e) {
      BasePlugin.logger.error("Could not read battery capacity");
      BasePlugin.logger.error(e);
      const msg = `${this.battery} not found!`;
      this.fullText = msg;
      this.shortText = msg;
      this.color = COLORS.WHITE;
      this.background = COLORS.CRITICAL;
    }
  }
}
