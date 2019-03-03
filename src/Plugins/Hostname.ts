import Base from "./Base";
import * as os from "os";

export default class Hostname extends Base {

  cycle() {
    this.full_text = os.hostname();
  }
}
