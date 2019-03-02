import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";
import Uname from "./Plugins/Uname";
import App from "./App";
import Uptime from "./Plugins/Uptime";


function main() {
  const plugins: Array<Base> = [];
  const clock: Base = new Clock("Clock", 1);
  const uname: Base = new Uname("Uname", 3600);
  const uptime: Base = new Uptime("Uptime", 1);
  plugins.push(clock, uname, uptime);
  const app = new App(plugins);
  app.run();
}

main();
