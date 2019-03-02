const uuid = require("uuid/v1");

export default interface NodebarPlugin {
  cycle(): void
}

export class NotImplemented extends Error {
  constructor(message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = "NotImplemented";
    this.message = message;
  }
}

export default class Base implements NodebarPlugin {
  full_text: string = "";
  short_text: string = "";
  color: string = "#ffffff";
  background: string = "#000000";
  min_width: number = 300;
  align: string = "right";
  urgent: boolean = false;
  name: string = "";
  instance: string = "";
  separator: boolean = true;
  separator_block_width: number = 9;
  ticks: number = 1;

  constructor(name: string, ticks: number) {
    this.name = name;
    this.instance = uuid();
    this.ticks = ticks;
  }

  cycle() {
    throw new NotImplemented("Please implement me");
  }

  emit(): string {
    return JSON.stringify({
      full_text: this.full_text,
      name: this.name,
      color: this.color,
      background: this.background,
      urgent: this.urgent
    });
  }

  run() {
    const self = this;
    self.cycle();
    setInterval(() => {
      try {
        self.cycle();
      } catch (e) {
        throw e;
      }
    }, self.ticks * 1000);
  }

}
