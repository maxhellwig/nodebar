import Clock from "../src/Plugins/Clock";
import { expect } from "chai";
import moment = require("moment");
import sinon from "sinon";

describe("Clock cycle prints same datetime string", () => {
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });

  it("should return mocked date", () => {
    const clock = new Clock("Clock", 1);
    const mockedDateAndTime  = "2017-03-02 12:00:00";
    moment.now = () => {
      return +Date.parse(mockedDateAndTime);
    };
    clock.cycle();
    expect(clock.full_text).to.equal(mockedDateAndTime);
  });
});
