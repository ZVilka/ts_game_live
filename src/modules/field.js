var Field = /** @class */ (function () {
    function Field(colorOfCell) {
        this.canvasField = document.getElementById('field');
        this.canvasField.width = Field.width;
        this.canvasField.height = Field.height;
        this.ctx = this.canvasField.getContext('2d');
        this.ctx.fillStyle = colorOfCell;
    }
    // Как стоит называть статические поля? (С большой буквы или маленькой)
    Field.width = 500;
    Field.height = 300;
    Field.cellSize = 10;
    return Field;
}());
export default Field;
