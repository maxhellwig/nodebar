"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class Clock extends Base_1.default {
    cycle() {
        this.fullText = Date();
    }
}
exports.default = Clock;
//# sourceMappingURL=Clock.js.map