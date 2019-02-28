export default interface NodebarPlugin {
  cycle(): void
}

class NotImplemented extends Error {}

export default class Base implements NodebarPlugin {
  fullText: string = "";
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
    const pluginTimeout = setInterval(() => {
      self.cycle();
    }, self.ticks * 1000);
  }
}
