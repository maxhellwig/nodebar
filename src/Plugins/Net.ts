import Base from "./Base";
import * as os from "os";

export default class Net extends Base {


  constructor(name: string, ticks: number) {
    super(name, ticks);
  }

  cycle() {
    const allInterfaces: any = os.networkInterfaces();
    const concreteInterface = allInterfaces[this.name];

    this.full_text = `${this.name} ${concreteInterface[0].address}`;
    if (this.full_text !== "") {
      this.color = "#00ff00";
    } else {
      this.color = "#ff0000";
    }
  }
}
