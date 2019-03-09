import Base from "./Plugins/Base";
import { COLORS } from "./config";

export const NOPLUGIN_FULLTEST: string = "No plugins found!";
export const NOPLUGIN_SHORTTEST: string = "No plugins!";

export default class NoPlugin extends Base {

  cycle() {
    this.full_text = NOPLUGIN_FULLTEST;
    this.short_text = NOPLUGIN_SHORTTEST;
    this.color = COLORS.CRITICAL;
  }
}
