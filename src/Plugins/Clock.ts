import Base from "./Base";
import moment = require("moment");

export default class Clock extends Base {
  cycle() {
    this.full_text = `${moment().format('YYYY-MM-DD hh:mm:ss')}`;
  }
}
