import BasePlugin from "./BasePlugin";
import * as os from "os";

export default class Hostname extends BasePlugin {
  public cycle(): void {
    this.fullText = os.release();
  }
}
