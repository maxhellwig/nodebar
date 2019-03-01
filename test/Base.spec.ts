import Base from "../src/Plugins/Base";
import { expect } from "chai";
import sinon, { SinonFakeTimers } from "sinon";

describe("Base plugin", () => {
  let base: Base;
  beforeEach(() => {
    base = new Base("Base", 1);
  });
  it("Throws NotImplemented Exception if base cycle method is called",
    () => {
      expect(base.cycle).to.throw();
    });
  it("Returns a json representation of itself on emit()", () => {
    const expected = "{\"full_text\":\"\",\"name\":\"Base\",\"ticks\":1}";
    expect(base.emit()).to.be.equal(expected);
  });
});

describe("run()", () => {
  let base: Base;
  let clock: SinonFakeTimers;
  beforeEach(() => {
    base = new Base("Base", 1);
    clock = sinon.useFakeTimers({
      now: 1483228800000,
      toFake: ["setTimeout", "setInterval"]
    });
  });
  it("Runs cycle for the first time", () => {
    const cycleMock = sinon.stub(base, "cycle");
    base.run();
    sinon.assert.called(cycleMock);
  });
  it("Runs cycle twice after interval", (done) => {
    const cycleMock = sinon.stub(base, "cycle");
    base.run();
    clock.tick(1000);
    sinon.assert.calledTwice(cycleMock);
    done();
  });
  it("Breaks after cycle throws an exception", (done) => {
    sinon.stub(base, "cycle").throws();
    try {
      base.run();
      clock.tick(1000);
    } catch (e) {
      expect(base.run).to.throw();
    }
    done();
  });
});
