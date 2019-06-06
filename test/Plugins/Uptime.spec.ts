import Uptime, { leftPad } from "../../src/Plugins/Uptime";
import { expect } from "chai";
import sinon from "sinon";

describe("Update Plugin", (): void => {
  let uptime: Uptime;
  beforeEach(
    (): void => {
      uptime = new Uptime("Uptime", 1);
    }
  );
  afterEach((): void => {
    sinon.restore();
  });

  it("returns mocked uptime", (): void => {
    uptime.getUptime = sinon.fake.returns(345600);
    const expected = "4 days 00:00:00";
    uptime.cycle();

    expect(uptime.fullText).to.be.equal(expected);
  });
  it("warns when system is up for over a year", (): void => {
    uptime.getUptime = sinon.fake.returns(31557602);
    const expected = "30 days 06:00:02 Please restart your system!";
    uptime.cycle();

    expect(uptime.fullText).to.be.equal(expected);
  });
});

describe("leftPad", () =>  {
  it("add 0 to given number is number is less than 10", () => {
    expect(leftPad(1)).to.be.equal("01");
    expect(leftPad(1)).not.to.be.equal("1");
    expect(leftPad(9)).to.be.equal("09");
    expect(leftPad(10)).to.be.equal("10");
  })
});
