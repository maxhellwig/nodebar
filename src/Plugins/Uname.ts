import Base from "./Base";
import * as os from "os";

export default class Uname extends Base {

  static getHostname(): string {
    return os.hostname();
  }

  cycle() {
    this.full_text = Uname.getHostname();
  }
}
