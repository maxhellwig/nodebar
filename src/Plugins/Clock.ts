import Base from "./Base";

export default class Clock extends Base {
  cycle() {
    const now: Date = new Date();
    this.full_text = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }
}
