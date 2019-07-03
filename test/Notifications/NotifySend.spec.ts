import { NotifySend } from "../../src/Notifications/NotifySend";
import { Notifiable } from "../../src/Notifications/Notifiable";
import sinon from "sinon";
import { expect } from "chai";

const spawn = require("child_process").spawn;


describe("NotifySend notifier", () => {
  let notifier: Notifiable;
  let mockedSpawn = sinon.stub(spawn);
  beforeEach(() => {
    notifier = new NotifySend();
  });
  it("should do spawn mock with notify-send system library", () => {


    notifier.notify("test summary", "test body");
    expect(mockedSpawn.calledOnce);
  });
});
