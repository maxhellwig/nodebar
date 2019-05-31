import Uptime from "../src/Plugins/Uptime";
import { expect } from "chai";
import sinon from "sinon";

describe("Update Plugin", () => {
  let uptime: Uptime;
  beforeEach(() => {
    uptime = new Uptime("Uptime", 1);
  });
  it("returns mocked uptime", () => {
    const expected = "4 days 00:00:00";
    const mockedUptime = sinon.stub(uptime, "uptime").returns(345600);
    uptime.cycle();

    expect(uptime.fullText).to.be.equal(expected);
  });
});
