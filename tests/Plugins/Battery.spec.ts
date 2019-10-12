import Battery from "../../src/Plugins/Battery";

describe("Battery", () => {
  let plugin: Battery;
  beforeEach(() => {
    plugin = new Battery("BAT0", 15);
  });
  it("cycles", () => {
    plugin.cycle();
  });
});
