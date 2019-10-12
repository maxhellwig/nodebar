import NotifySend from "../../src/Notifications/NotifySend";
import { UrgencyLevel } from "../../src/Notifications/Notifiable";

describe("NotifySend notifier", () => {
  let notifier: NotifySend;
  let spawner: jest.Mock<any, any>;
  const notifierLib = "notify-send";
  beforeEach(() => {
    spawner = jest.fn();
    notifier = new NotifySend(notifierLib, spawner);
  });

  it("should call mocked notification library with title and message", () => {
    const testTitle = "tests summary";
    const testBody = "tests body";

    notifier.notify(testTitle, testBody);
    expect(spawner).toHaveBeenCalledWith(notifierLib, [testTitle, testBody]);
  });
  it("should call mocked notification library with title and message and options", () => {
    const testTitle = "tests summary";
    const testBody = "tests body";
    const options = {
      "--urgency": UrgencyLevel.CRITICAL,
      "--expireTime": 3000
    };
    notifier.setOptions(options);
    notifier.notify(testTitle, testBody);
    expect(spawner).toHaveBeenCalledWith(notifierLib, [
      testTitle,
      testBody,
      options
    ]);
  });
});
