import Base from "./Plugins/Base";
import NoPlugin from "./NoPlugin";

const Sentry = require("@sentry/node");
const HEADER: string = JSON.stringify({ "version": 1, "stop_signal": 10, "cont_signal": 12, "click_events": true });

const DEBUG: boolean | undefined = process.env.DEBUG === "true";

export default class App {


  private readonly plugins: Array<Base>;

  /**
   *
   * @param {Array<Base>} plugins
   */
  constructor(plugins: Array<Base>) {

    Sentry.init({ dsn: "https://d3e1feea8cbc4694a3a39b62e16f497a@sentry.io/1406827" });
    this.plugins = plugins;
  }


  /**
   *
   * @param {Array<Base>} plugins
   */
  collectOutput(plugins: Array<Base>): string {
    let output: string = "";
    plugins.forEach((plugin) => {
      const pluginOutput = plugin.emit();
      output += `,${pluginOutput}`;
    });
    return output;
  }


  run() {
    console.log(HEADER);
    console.log("[");
    console.log("[]");
    if(this.plugins.length === 0 ) {
      this.plugins.push(new NoPlugin("No plugins!", -1))
    }
    this.plugins.forEach(function(plugin) {
      plugin.run();
    });
    setInterval(() => {
      let output: string;
      output = this.collectOutput(this.plugins);
      // remove the first comma in array
      console.log(`,[${output}]`.replace("\[,", "\["));
      output = "";
    }, 1000);
  }

}
