import BasePlugin from "./Plugins/BasePlugin";
import { COLORS } from "./config";

export const NOPLUGIN_FULLTEST = "No plugins found!";
export const NOPLUGIN_SHORTTEST = "No plugins!";

export default class NoPlugin extends BasePlugin {
  public cycle(): void {
    this.fullText = NOPLUGIN_FULLTEST;
    this.shortText = NOPLUGIN_SHORTTEST;
    this.color = COLORS.CRITICAL;
  }
}
