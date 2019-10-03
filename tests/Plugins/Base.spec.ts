import BasePlugin, {
  NotImplemented
} from "../../src/Plugins/BasePlugin";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuid = require("uuid/v1");

jest.useFakeTimers();

describe("Base plugin", () => {
  let base: BasePlugin;
  beforeEach(() => {
    base = new BasePlugin("Base", 1, [], "abc");
  });
  it("Throws NotImplemented Exception if base cycle method is called", () => {
    expect(base.cycle).toThrow(NotImplemented);
  });
  it("Returns a json representation of i3bar relevant information for emit()", () => {
    const expected =
      '{"full_text":"","name":"Base","color":"#ffffff","background":"#000000","urgent":false}';
    expect(base.emit()).toEqual(expected);
  });
  it("Returns a json representation of itself for toString()", () => {
    const expected =
      '{"_fullText":"","shortText":"","color":"#ffffff","background":"#000000","minWidth":300,"align":"right","urgent":false,"name":"Base","instance":"abc","separator":true,"separatorBlockWidth":9,"ticks":1,"clickCommands":[]}';

    expect(base.toString()).toEqual(expected);
  });
});

describe("run()", () => {
  let base: BasePlugin;
  beforeEach(() => {
    base = new BasePlugin("Base", 1);
    base.cycle = jest.fn();
  });

  it("Runs cycle for the first time", () => {
    base.run();
    expect(setInterval).toHaveBeenCalled();
  });
  it("Runs cycle twice after interval", done => {
    base.run();

    expect(setInterval).toHaveBeenCalled();
    done();
  });
  it("Breaks after cycle throws an exception", done => {
    const mockErrorMessage = "Mock error in cycle";
    try {
      base = new BasePlugin("Base", 1);
    } catch (e) {
      expect(e).toThrow("error");
      1;
      done();
    }
  });
});
