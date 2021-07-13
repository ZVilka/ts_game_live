import Field from './field.js';
import {randomInteger as rnd, shuffle} from "./helpers.js";

export default class App {
    protected _field = new Field('gray');
    protected _cells: boolean[][] = [];
    protected _startBtn = document.getElementById('start');
    protected _pauseBtn = document.getElementById('pause');
    protected _restartBtn = document.getElementById('restart');
    protected _countOfAllCells: number;
    protected _isStarted: boolean;

    constructor() {
        for (let y = 0; y < Field.height / Field.cellSize; y++) {
            this._cells[y] = [];
            for (let x = 0; x < Field.width / Field.cellSize; x++) {
                this._cells[y][x] = false;
            }
        }
        this._countOfAllCells = this._cells.length * this._cells[0].length;
        this._isStarted = false;
    }

    protected _buttons() {
        this._startBtn.addEventListener('click', this._createFirstCells.bind(this));
    }

    protected _drawCell(x: number,y: number) {
        this._field.ctx.fillRect(x * 10, y* 10, 10, 10);
    }

    protected _drawCells() {
        for (let y = 0; y < this._cells.length; y++) {
            for (let x = 0; x < this._cells[y].length; x++) {
                if (this._cells[y][x]) {
                    console.log();
                    this._drawCell(x, y);
                }
            }
        }
    }

    protected _createFirstCells() {
        if (this._isStarted) {
            alert('Вы уже начали игру!');
            return;
        }
        // 20% живых клеток
        let percentOfAliveCells = this._countOfAllCells * 0.2;
        let countOfAliveCells = 0;
        for (let y = 0; y < this._cells.length; y++) {
            // Как лучше решить без флага?
            let isEnoughCells = false;
            for (let x = 0; x < this._cells[y].length; x++) {
                if (countOfAliveCells >= percentOfAliveCells) {
                    isEnoughCells = true;
                    break;
                }
                if (rnd(0,4) === 1) {
                    this._cells[y][x] = true;
                    countOfAliveCells++;
                } else {
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
    }

    run() {
        this._buttons();
    }
}
