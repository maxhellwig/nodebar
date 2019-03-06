import Base from "./Base";
import * as os from "os";
import { NetworkInterfaceInfo } from "os";
import { COLORS } from "../COLORS";

export default class Net extends Base {

  constructor(name: string, ticks: number) {
    super(name, ticks);
  }

  cycle() {
    const allInterfaces: { [index: string]: NetworkInterfaceInfo[] } = os.networkInterfaces();
    let concreteInterface: NetworkInterfaceInfo[];
    try {
      concreteInterface = allInterfaces[this.name];
      this.full_text = `${this.name} ${concreteInterface[0].address}`;
      this.color = COLORS.GREEN;
    } catch (e) {
      this.full_text = `Network interface '${this.name}' not found!`;
      this.short_text = `${this.name} not found!`;
      this.color = COLORS.WHITE;
      this.background = COLORS.RED;
    }
  }
}
