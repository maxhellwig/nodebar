import BasePlugin from "./BasePlugin";
import * as os from "os";

export default class OSRelease extends BasePlugin {
  public cycle(): void {
    this.fullText = os.release();
  }
}
