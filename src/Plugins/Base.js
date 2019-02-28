"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotImplemented extends Error {
}
class Base {
    constructor(name, ticks) {
        this.fullText = "";
        this.name = "";
        this.ticks = 1;
        this.name = name;
        this.ticks = ticks;
    }
    cycle() {
        throw new NotImplemented("Please implement me");
    }
    emit() {
        return JSON.stringify(this);
    }
    run() {
        const self = this;
        setTimeout(() => {
            self.cycle();
        }, self.ticks * 1000);
    }
}
exports.default = Base;
//# sourceMappingURL=Base.js.map