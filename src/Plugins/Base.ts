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
  name: string = "";
  ticks: number = 1;

  constructor(name: string, ticks: number) {
    this.name = name;
    this.ticks = ticks;
  }

  cycle() {
    throw new NotImplemented("Please implement me");
  }

  emit(): string {
    return JSON.stringify(this);
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
