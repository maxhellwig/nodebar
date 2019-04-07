import BasePlugin, { NotImplemented } from "../../src/Plugins/BasePlugin";
import { expect } from "chai";
import sinon, { SinonFakeTimers } from "sinon";

const uuid = require("uuid/v1");

describe("Base plugin", () => {
  let base: BasePlugin;
  beforeEach(() => {
    base = new BasePlugin("Base", 1, "abc");
  });
  it("Throws NotImplemented Exception if base cycle method is called", () => {
    expect(base.cycle).to.throw();
  });
  it("Returns a json representation of i3bar relevant information for emit()", () => {
    const expected =
      "{\"fullText\":\"\",\"name\":\"Base\",\"color\":\"#ffffff\",\"background\":\"#000000\",\"urgent\":false}";
    expect(base.emit()).to.be.equal(expected);
  });
  it("Returns a json representation of itself for toString()", () => {
    const expected =
      "{\"fullText\":\"\",\"shortText\":\"\",\"color\":\"#ffffff\",\"background\":\"#000000\",\"minWidth\":300,\"align\":\"right\",\"urgent\":false,\"name\":\"Base\",\"instance\":\"abc\",\"separator\":true,\"separatorBlockWidth\":9,\"ticks\":1}";

    expect(base.toString()).to.be.equal(expected);
  });
});

describe("run()", () => {
  let base: BasePlugin;
  let clock: SinonFakeTimers;
  beforeEach(() => {
    base = new BasePlugin("Base", 1);
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
  it("Runs cycle twice after interval", done => {
    const cycleMock = sinon.stub(base, "cycle");
    base.run();
    clock.tick(1000);
    sinon.assert.calledTwice(cycleMock);
    done();
  });
  it("Breaks after cycle throws an exception", done => {
    const mockErrorMessage = "Mock error in cycle";
    const cycleMock = sinon.stub(base, "cycle");
    cycleMock.throwsException(mockErrorMessage);
    try {
      base.run();
    } catch (e) {
      expect(e).to.be.an("error");
      clock.tick(1000);
      done();
    }
  });
});
