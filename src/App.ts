import Base from "./Plugins/Base";

const HEADER: string = JSON.stringify({ "version": 1, "stop_signal": 10, "cont_signal": 12, "click_events": true });

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
    process.stdout.write(HEADER);
    process.stdout.write("[");
    this.plugins.forEach(function(plugin) {
      plugin.run();
    });
    setInterval(() => {
      let output: string;
      output = this.collectOutput(this.plugins);
      process.stdout.write(output);
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
      output += `[${pluginOutput}],`;
    });
    return output;
  }

}
