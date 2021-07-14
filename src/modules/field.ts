// Добавлена проверка завершения игры при условии, что состояние клеток больше не меняется
// Добавлена возможность рисовать живые клетки

import Cell from './cell.js'
import { randomInteger as rnd, shuffle, isEqualArray } from "./helpers.js";

export default class Field {
    protected _width: number;
    protected _height: number;
    protected _cellSize: number;
    protected _cells: Cell[][] = [];
    protected _tempCells: Cell[][] = [];
    protected _countOfAllCells: number;
    protected _isDrawing = false;
    protected _countOfAliveCells = 0;
    protected _percentOfAliveCells: number;
    protected _mouseCoordinate: Object;
    protected _ctx: CanvasRenderingContext2D;
    countOfCycles = 0;
    isEndCycles = false;
    canvasField: HTMLCanvasElement;

    constructor(colorOfCell: string, width: number = 500, height: number = 300,
                cellSize: number = 10, percentOfAliveCells: number = 20) {
        this._width = width;
        this._height = height;
        this._cellSize = cellSize;
        this._percentOfAliveCells = (this._width * this._height / Math.pow(this._cellSize,2))
            * (percentOfAliveCells / 100);
        this._createCells();
        this._countOfAllCells = this._cells.length * this._cells[0].length;
        this.canvasField = document.getElementById('field') as HTMLCanvasElement;
        this.canvasField.width = this._width;
        this.canvasField.height = this._height;
        this.canvasField.style.width = this._width.toString();
        this.canvasField.style.height = this._height.toString();
        this._ctx = this.canvasField.getContext('2d');
        this._ctx.fillStyle = colorOfCell;
        this._mouseCoordinate = { x: 0, y: 0 };
    }

    protected _createCells() {
        // убрать функции, заменить на методы массивов
        for (let y = 0; y < this._height / this._cellSize; y++) {
            this._cells[y] = [];
            this._tempCells[y] = [];
            for (let x = 0; x < this._width / this._cellSize; x++) {
                this._cells[y][x] = new Cell();
                this._tempCells[y][x] = new Cell();
            }
        }
    }

    protected _drawCells() {
        for (let y = 0; y < this._cells.length; y++) {
            for (let x = 0; x < this._cells[y].length; x++) {
                if (this._cells[y][x].state) {
                    this.drawCell(x, y);
                }
            }
        }
    }

    clearCycleCounter() {
        this.countOfCycles = 0;
        this._countOfAliveCells = 0;
        document.getElementById('count').innerHTML = this.countOfCycles.toString();
    }

    createFirstAliveCells() {
        this._percentOfAliveCells = this._countOfAllCells * 0.2;
        if (this._countOfAliveCells < this._percentOfAliveCells) {
            for (let y = 0; y < this._cells.length; y++) {
                // Как лучше решить без флага?
                let isEnoughCells = false;
                for (let x = 0; x < this._cells[y].length; x++) {
                    if (this._countOfAliveCells >= this._percentOfAliveCells) {
                        isEnoughCells = true;
                        break;
                    }
                    if (rnd(0, 4) === 1) {
                        this._cells[y][x].state = true;
                        this._countOfAliveCells++;
                    } else {
                        this._cells[y][x].state = false;
                    }
                }
                if (isEnoughCells) {
                    break;
                }
            }
            shuffle(this._cells);
            this._drawCells();
        }
    }

    drawCell(x: number, y: number) {
        this._ctx.fillRect(x * 10, y * 10, 10, 10);
    }

    clearFieldAndCells() {
        this._ctx.clearRect(0, 0, this._width, this._height);
        this._createCells();
    }

    protected _countAllNeighbours(y: number, x: number): number {
        let countOfAliveNeighbours = 0;
        if (this._cells[y - 1][x - 1].state) countOfAliveNeighbours++;
        if (this._cells[y - 1][x].state) countOfAliveNeighbours++;
        if (this._cells[y - 1][x + 1].state) countOfAliveNeighbours++;
        if (this._cells[y][x + 1].state) countOfAliveNeighbours++;
        if (this._cells[y + 1][x + 1].state) countOfAliveNeighbours++;
        if (this._cells[y + 1][x].state) countOfAliveNeighbours++;
        if (this._cells[y + 1][x - 1].state) countOfAliveNeighbours++;
        return countOfAliveNeighbours;
    }

    protected _checkAllCells() {
        for (let y = 1; y < this._cells.length - 1; y++) {
            for (let x = 1; x < this._cells[y].length - 1; x++) {
                let countOfAliveNeighbours = this._countAllNeighbours(y, x);
                let keepAlive = this._cells[y][x].state && (countOfAliveNeighbours === 2 || countOfAliveNeighbours === 3);
                let createLive = !this._cells[y][x].state && countOfAliveNeighbours === 3;
                this._tempCells[y][x].state = keepAlive || createLive;
            }
        }
        if (this.countOfCycles > 1) {
            this.isEndCycles = isEqualArray(this._tempCells, this._cells);
        }
        if (!this.isEndCycles) {
            for (let y = 0; y < this._cells.length; y++) {
                for (let x = 0; x < this._cells[y].length; x++) {
                    this._cells[y][x].state = this._tempCells[y][x].state;
                }
            }
        }
    }

    drawOneCell(event: MouseEvent) {
        // if (this._countOfAliveCells >= this._percentOfAliveCells && !isStarted) {
        //     return;
        // }
        const x = Math.floor(event.offsetX / 10);
        const y = Math.floor(event.offsetY / 10);
        if (x >= 0 && y >= 0 && y < this._cells.length && x < this._cells[y].length) {
            this.drawCell(x,y);
            this._cells[y][x].state = true;
            this._countOfAliveCells++;
        }
    }

    userStartDrawing() {
        this._isDrawing = true;
    }

    userKeepDrawing(event: MouseEvent) {
        // if (this._countOfAliveCells >= this._percentOfAliveCells && !isStarted) {
        //     return;
        // }
        if (this._isDrawing) {
            this.drawOneCell(event);
        }
    }

    userStopDrawing() {
        this._isDrawing = false;
    }

    oneCycleLive() {
        this._checkAllCells();
        this._ctx.clearRect(0, 0, this._width, this._height);
        this._drawCells();
        this.countOfCycles++;
        document.getElementById('count').innerHTML = this.countOfCycles.toString();
    }
}
