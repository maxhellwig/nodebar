import Uname from "../Plugins/Uname";
import { expect } from "chai";
import * as os from "os";

describe("Cycle of Uname", () => {
  it("should return ubuntu when os.hostname() is ubuntu", () => {
    const currentHostname = os.hostname();
    const uname = new Uname("Uname", 1);
    uname.cycle();
    expect(uname.full_text).to.equal(currentHostname);
  });
});
