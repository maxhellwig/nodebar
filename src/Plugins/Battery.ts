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
  private readonly energyPath: string;
  private readonly voltagePath: string;
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
    this.energyPath = `${this.batteryBasePath}/${this.battery}/energy_now`;
    this.voltagePath = `${this.batteryBasePath}/${this.battery}/voltage_now`;
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

  private getTimeLeft(energy: number, voltage: number): number {
    return energy / voltage;
  }

  public async cycle(): Promise<void> {
    let capacity: number;
    let voltage: number;
    let energy: number;
    let status = "";
    try {
      capacity = parseInt(await this.getValue(this.capacityPath));
      voltage = parseInt(await this.getValue(this.voltagePath));
      energy = parseInt(await this.getValue(this.energyPath));
      let timeLeft = this.getTimeLeft(energy, voltage).toFixed(2);
      status = await this.getValue(this.statusPath);
      status = status.replace(/\n/, "");
      this.fullText = `${status} ${capacity}% (${timeLeft})`;
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
