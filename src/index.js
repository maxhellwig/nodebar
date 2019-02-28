"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Clock_1 = require("./Plugins/Clock");
function run(plugins) {
    plugins.forEach(function (plugin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield plugin.run();
        });
    });
    setInterval(() => {
        console.log(collectOutput(plugins));
        run(plugins);
    }, 1000);
}
function collectOutput(plugins) {
    const outputList = [];
    plugins.forEach((plugin) => {
        const output = plugin.emit();
        outputList.push(output);
    });
    return outputList;
}
function main() {
    const plugins = [];
    const clock = new Clock_1.default("Clock", 15);
    plugins.push(clock);
    run(plugins);
}
main();
//# sourceMappingURL=index.js.map