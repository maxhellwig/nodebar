import Hostname from "../src/Plugins/Hostname";
import { expect } from "chai";
import * as os from "os";

describe("Cycle of Hostname", () => {
  it("should return ubuntu when os.hostname() is ubuntu", () => {
    const currentHostname = os.hostname();
    const uname = new Hostname("Hostname", 1);
    uname.cycle();
    expect(uname.fullText).to.equal(currentHostname);
  });
});
