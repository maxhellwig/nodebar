import Clock from "../../src/Plugins/Clock";
import moment = require("moment");
import BasePlugin from "../../src/Plugins/BasePlugin";

describe("Clock cycle prints same datetime string", () => {

  it("should return mocked date", (): void => {
    const clock: BasePlugin = new Clock("Clock", 1);
    const mockedDateAndTime = "2017-03-02 12:00:00";
    moment.now = (): number => {
      return +Date.parse(mockedDateAndTime);
    };
    clock.cycle();
    expect(clock.fullText).toEqual(mockedDateAndTime);
  });
});
