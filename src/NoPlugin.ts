import Base from "./Plugins/Base";
import { COLORS } from "./COLORS";

export default class NoPlugin extends Base {
  cycle() {
    this.full_text = "No plugins found!";
    this.short_text = "No plugins!";
    this.color = COLORS.RED;
  }
}
