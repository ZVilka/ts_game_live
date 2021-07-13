import Field from './field.js';
import { randomInteger as rnd, shuffle } from "./helpers.js";
var App = /** @class */ (function () {
    function App() {
        this._field = new Field('gray');
        this._cells = [];
        this._startBtn = document.getElementById('start');
        this._pauseBtn = document.getElementById('pause');
        this._restartBtn = document.getElementById('restart');
        for (var y = 0; y < Field.height / Field.cellSize; y++) {
            this._cells[y] = [];
            for (var x = 0; x < Field.width / Field.cellSize; x++) {
                this._cells[y][x] = false;
            }
        }
        this._countOfAllCells = this._cells.length * this._cells[0].length;
        this._isStarted = false;
    }
    App.prototype._buttons = function () {
        this._startBtn.addEventListener('click', this._createFirstCells.bind(this));
    };
    App.prototype._drawCell = function (x, y) {
        this._field.ctx.fillRect(x * 10, y * 10, 10, 10);
    };
    App.prototype._drawCells = function () {
        for (var y = 0; y < this._cells.length; y++) {
            for (var x = 0; x < this._cells[y].length; x++) {
                if (this._cells[y][x]) {
                    console.log();
                    this._drawCell(x, y);
                }
            }
        }
    };
    App.prototype._createFirstCells = function () {
        if (this._isStarted) {
            alert('Вы уже начали игру!');
            return;
        }
        // 20% живых клеток
        var percentOfAliveCells = this._countOfAllCells * 0.2;
        var countOfAliveCells = 0;
        for (var y = 0; y < this._cells.length; y++) {
            // Как лучше решить без флага?
            var isEnoughCells = false;
            for (var x = 0; x < this._cells[y].length; x++) {
                if (countOfAliveCells >= percentOfAliveCells) {
                    isEnoughCells = true;
                    break;
                }
                if (rnd(0, 4) === 1) {
                    this._cells[y][x] = true;
                    countOfAliveCells++;
                }
                else {
                    this._cells[y][x] = false;
                }
            }
            if (isEnoughCells) {
                break;
            }
        }
        shuffle(this._cells);
        this._isStarted = true;
        this._drawCells();
    };
    App.prototype.run = function () {
        this._buttons();
    };
    return App;
}());
export default App;
