export default class Cell {
    state: boolean;
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.state = false;
        this.x = x;
        this.y = y;
    }
}
