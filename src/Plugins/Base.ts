export default interface NodebarPlugin {
  cycle(): void
}

class NotImplemented extends Error {}

export default class Base implements NodebarPlugin {
  full_text: string = "";
  name: string = "";
  ticks: number = 1;

  constructor(name: string, ticks: number) {
    this.name = name;
    this.ticks = ticks;
    this.cycle()
  }

  cycle() {
    throw new NotImplemented("Please implement me");
  }

  emit(): string {
    return JSON.stringify(this);
  }

  run() {
    const self = this;
    const pluginTimeout = setInterval(() => {
      try {
        self.cycle();

      } catch (e) {
        throw e;
      }
    }, self.ticks * 1000);
  }
}
