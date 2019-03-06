import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";
import Hostname from "./Plugins/Hostname";
import Release from "./Plugins/OSRelease";
import App from "./App";
import Uptime from "./Plugins/Uptime";
import Net from "./Plugins/Net";


function main() {
  const plugins: Array<Base> = [];
  const enp0s3: Base = new Net("wlp4s0", 5);
  const release: Base = new Release("Release", 3600);
  const hostname: Base = new Hostname("Hostname", 3600);
  const uptime: Base = new Uptime("Uptime", 1);
  const clock: Base = new Clock("Clock", 1);
  plugins.push(enp0s3, release, hostname, uptime, clock);
  const app = new App(plugins);
  app.run();
}

main();
