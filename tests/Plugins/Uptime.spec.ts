import Uptime, { leftPad } from "../../src/Plugins/Uptime";

describe("Update Plugin", (): void => {
  let uptime: Uptime;
  beforeEach(
    (): void => {
      uptime = new Uptime("Uptime", 1);
    }
  );
  afterEach((): void => {
  });

  it("returns mocked uptime", (): void => {
    uptime.getUptime = jest.fn(() => 345600);
    const expected = "4 days 00:00:00";
    uptime.cycle();

    expect(uptime.fullText).toEqual(expected);
  });
  it("warns when system is up for over a year", (): void => {
    uptime.getUptime = jest.fn(() => 31557602);
    const expected = "30 days 06:00:02 Please restart your system!";
    uptime.cycle();

    expect(uptime.fullText).toEqual(expected);
  });
});

describe("leftPad", () =>  {
  it("add 0 to given number is number is less than 10", () => {
    expect(leftPad(1)).toEqual("01");
    expect(leftPad(1)).not.toEqual("1");
    expect(leftPad(9)).toEqual("09");
    expect(leftPad(10)).toEqual("10");
  })
});
