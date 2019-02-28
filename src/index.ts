import Base from "./Plugins/Base";
import Clock from "./Plugins/Clock";

function run(plugins: Array<Base>) {
  plugins.forEach(async function(plugin) {
    await plugin.run();
  });
  setInterval(() => {
    console.log(collectOutput(plugins));
    run(plugins);
  }, 1000);
}

function collectOutput(plugins: Array<Base>): Array<String> {
  const outputList: string[] = [];
  plugins.forEach((plugin) => {
    const output = plugin.emit();
    outputList.push(output);
  });
  return outputList;
}

function main() {
  const plugins: Array<Base> = [];
  const clock: Base = new Clock("Clock", 2);
  plugins.push(clock);

  run(plugins);
}

main();
