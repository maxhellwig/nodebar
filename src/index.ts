import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";
import Uname from "./Plugins/Uname";
import App from "./App";


function main() {
  const plugins: Array<Base> = [];
  const clock: Base = new Clock("Clock", 1);
  const uname: Base = new Uname("Uname", 3600);
  plugins.push(clock, uname);
  const app = new App(plugins);
  app.run();
}

main();
