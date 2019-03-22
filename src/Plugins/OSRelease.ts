import BasePlugin from "./BasePlugin";
import * as os from "os";

export default class Hostname extends BasePlugin {

  cycle() {
    this.full_text = os.release();
  }
}
