import { NotifySend } from "../../src/Notifications/NotifySend";
import sinon from "sinon";

describe("NotifySend notifier", () => {
  let notifier: NotifySend;
  beforeEach(() => {
    notifier = new NotifySend();
    sinon.stub(notifier, "getSpawn");
  });
  afterEach(
    (): void => {
      // @ts-ignore
      notifier.getSpawn.restore();
    }
  );
  it("should do spawn mock with notify-send system library", () => {
    const testSummary = "test summary";
    const testBody = "test body";
    notifier.notify(testSummary, testBody);
    // @ts-ignore
    sinon.assert.calledOnce(notifier.getSpawn);
    const { getSpawn } = notifier;
    sinon.assert.calledWith(getSpawn, testSummary, testBody);
  });
});
