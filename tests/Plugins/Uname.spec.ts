import Hostname from "../../src/Plugins/Hostname";
import os from "os";
jest.mock('os')

describe("Cycle of Hostname", () => {
  it("should return the same hostname as os.hostname()", () => {
    const expected = "abc";
    const uname = new Hostname("Hostname", 1);
    uname.cycle();
    expect(uname.fullText).toEqual(expected);
  });
});
