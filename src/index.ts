import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";
import Hostname from "./Plugins/Hostname";
import App from "./App";
import Uptime from "./Plugins/Uptime";
import Net from "./Plugins/Net";


function main() {
  const plugins: Array<Base> = [];
  const clock: Base = new Clock("Clock", 1);
  const uname: Base = new Hostname("Hostname", 3600);
  const uptime: Base = new Uptime("Uptime", 1);
  const enp0s3: Base = new Net("enp0s3", 3);
  const lo: Base = new Net("lo", 3);
  plugins.push(enp0s3, lo, uname, uptime, clock);
  const app = new App(plugins);
  app.run();
}

main();
