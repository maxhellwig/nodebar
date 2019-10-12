import BasePlugin from "./Plugins/BasePlugin";
import Net from "./Plugins/Net";
import Release from "./Plugins/OSRelease";
import Hostname from "./Plugins/Hostname";
import Uptime from "./Plugins/Uptime";
import Clock from "./Plugins/Clock";
import Battery from "./Plugins/Battery";

const plugins: BasePlugin[] = [];

plugins.push(
  new Net("enp0s3", 5, [{ button: 1, command: "/usr/bin/nm-applet" }]),
  new Net("wlp82s0", 5, [{ button: 1, command: "/usr/bin/nm-applet" }]),
  new Battery("BAT0", 5),
  new Release("Release", 3600), new Hostname("Hostname", 3600),
  new Uptime("Uptime", 1), new Clock("Clock", 1)
);

export default plugins;