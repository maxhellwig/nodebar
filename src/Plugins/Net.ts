import BasePlugin from "./BasePlugin";
import * as os from "os";
import { NetworkInterfaceInfo, NetworkInterfaceInfoIPv4, NetworkInterfaceInfoIPv6 } from "os";
import { COLORS } from "../config";

export default class Net extends BasePlugin {

  constructor(name: string, ticks: number) {
    super(name, ticks);
  }

  cycle() {
    const allInterfaces: { [index: string]: NetworkInterfaceInfo[] } = os.networkInterfaces();
    let concreteInterface: NetworkInterfaceInfo[];
    try {
      concreteInterface = allInterfaces[this.name];
      const addressV4: NetworkInterfaceInfoIPv4 | NetworkInterfaceInfoIPv6 | undefined = concreteInterface.find((iface) => iface.family === "IPv4");
      if (addressV4 !== undefined) {
        this.full_text = `${this.name} ${addressV4.address}`;
      }
      this.color = COLORS.GREEN;
      this.background = COLORS.BLACK;
    } catch (e) {
      this.full_text = `'${this.name}' not found or offline!`;
      this.short_text = `${this.name} not found!`;
      this.color = COLORS.WHITE;
      this.background = COLORS.CRITICAL;
    }
  }
}
