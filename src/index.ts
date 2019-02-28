import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";

const HEADER = JSON.stringify({ "version": 1, "stop_signal": 10, "cont_signal": 12, "click_events": true });


/**
 *
 * @param plugins
 */
function run(plugins: Array<Base>) {
  plugins.forEach(function(plugin) {
    plugin.run();
  });
  const timer = setInterval(() => {
    let output: string;
    output = collectOutput(plugins);
    process.stdout.write(output);
    output = "";
  }, 1000);
}


/**
 *
 * @param plugins
 */
function collectOutput(plugins: Array<Base>): string {
  let output: string = "";
  plugins.forEach((plugin) => {
    const pluginOutput = plugin.emit();
    output += `[${pluginOutput}],`;
  });
  return output;
}

function main() {
  const plugins: Array<Base> = [];
  const clock: Base = new Clock("Clock", 1);
  plugins.push(clock);
  process.stdout.write(HEADER);
  process.stdout.write("[");
  run(plugins);
}

main();
