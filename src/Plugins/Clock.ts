import Base from "./Base";

export default class Clock extends Base {
    cycle() {
        this.fullText = Date();
    }
}
