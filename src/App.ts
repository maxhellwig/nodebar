import Base from "./Plugins/Base";

const HEADER: string = JSON.stringify({ "version": 1, "stop_signal": 10, "cont_signal": 12, "click_events": true });

const DEBUG: boolean | undefined = process.env.DEBUG === "true";

export default class App {


  private readonly plugins: Array<Base>;

  /**
   *
   * @param {Array<Base>} plugins
   */
  constructor(plugins: Array<Base>) {
    this.plugins = plugins;
  }

  run() {
    console.log(HEADER);
    console.log("[");
    console.log("[]");
    this.plugins.forEach(function(plugin) {
      plugin.run();
    });
    setInterval(() => {
      let output: string;
      output = this.collectOutput(this.plugins);
      // remove the first comma in array
      console.log(`,[${output}]`.replace("\[,","\["));
      output = "";
    }, 1000);
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

}
