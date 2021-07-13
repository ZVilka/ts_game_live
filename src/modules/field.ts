import Cell from './cell.js'

export default class Field {
    // Как стоит называть статические поля? (С большой буквы или маленькой)
    static width = 500;
    static height = 300;
    static cellSize = 10;

    canvasField: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(colorOfCell: string) {
        this.canvasField = document.getElementById('field') as HTMLCanvasElement;
        this.canvasField.width = Field.width;
        this.canvasField.height = Field.height;
        this.ctx = this.canvasField.getContext('2d');
        this.ctx.fillStyle = colorOfCell;
    }
}
