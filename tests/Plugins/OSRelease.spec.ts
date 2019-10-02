import OSRelease from "../../src/Plugins/OSRelease";
jest.mock("os");

describe("OSReease", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns current os release", () => {
    const osRelease = new OSRelease("osRelease", 123);
    osRelease.cycle();
    expect(osRelease.fullText).toEqual("abc");
  });
});
