const os = jest.genMockFromModule("os");

const expected = "abc";

const release = () => expected;
const hostname = () => expected;
const uptime = () => 123;

// @ts-ignore
os.release = release;
// @ts-ignore
os.hostname = hostname;
// @ts-ignore
os.uptime = uptime;

module.exports = os;