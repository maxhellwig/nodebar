import Base from "../src/Plugins/Base";
import Uptime from "../src/Plugins/Uptime";
import { expect } from "chai";

describe("Update Plugin", () => {
  let uptime: Base;
  beforeEach(() => {
    uptime = new Uptime("Uptime", 1);
  });
  it("returns mocked uptime", () => {
    const expected = "4 days ";
    uptime.cycle();
    expect(uptime.full_text).to.be.equal(expected);
  });
});
