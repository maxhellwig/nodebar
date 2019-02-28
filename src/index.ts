import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";

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
    console.log(output);
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
  const clock: Base = new Clock("Clock", 5);
  plugins.push(clock);
  console.log("[");
  run(plugins);
}

main();
