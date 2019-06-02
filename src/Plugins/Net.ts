import BasePlugin, { ClickCommand } from "./BasePlugin";
import * as os from "os";
import {
  NetworkInterfaceInfo,
  NetworkInterfaceInfoIPv4,
  NetworkInterfaceInfoIPv6
} from "os";
import { COLORS } from "../config";

export default class Net extends BasePlugin {
  public constructor(name: string, ticks: number, onClick?: ClickCommand[]) {
    super(name, ticks, onClick);
  }

  public cycle(): void {
    const allInterfaces: {
      [index: string]: NetworkInterfaceInfo[];
    } = os.networkInterfaces();
    let concreteInterface: NetworkInterfaceInfo[];
    try {
      concreteInterface = allInterfaces[this.name];
      const addressV4:
        | NetworkInterfaceInfoIPv4
        | NetworkInterfaceInfoIPv6
        | undefined = concreteInterface.find(
        (iface): boolean => iface.family === "IPv4"
      );
      if (addressV4 !== undefined) {
        this.fullText = `${this.name} ${addressV4.address}`;
      }
      this.color = COLORS.GREEN;
      this.background = COLORS.BLACK;
    } catch (e) {
      this.fullText = `'${this.name}' not found or offline!`;
      this.shortText = `${this.name} not found!`;
      this.color = COLORS.WHITE;
      this.background = COLORS.CRITICAL;
    }
  }
}
