// Добавлена проверка завершения игры при условии, что состояние клеток больше не меняется
// Добавлена возможность рисовать живые клетки
// Добавлено ускорение/замедление времени жизненного цикла
import Field from './field.js';
export default class App {
    constructor() {
        this._field = new Field(1000, 500);
        this._startBtn = document.getElementById('start');
        this._speedUpBtn = document.getElementById('speedup');
        this._slowDownBtn = document.getElementById('slowdown');
        this._pauseBtn = document.getElementById('pause');
        this._restartBtn = document.getElementById('restart');
        this._endGameBtn = document.getElementById('endgame');
        this._speedCycle = 500;
        this._isStarted = false;
        this._isPaused = false;
    }
    _getCycles() {
        this._cycles = setTimeout(function cycle() {
            if (!this._isStarted) {
                return;
            }
            if (this._field.isEndCycles) {
                alert(`Игра окончена. Количество прошедших циклов: ${this._field.countOfCycles}`);
                clearTimeout(this._cycles);
                this._isStarted = false;
                this._field.clearFieldAndCells();
                this._field.clearCycleCounter();
                this._field.isEndCycles = false;
                return;
            }
            this._field.oneCycleLive();
            this._cycles = setTimeout(cycle.bind(this), this._speedCycle);
        }.bind(this), this._speedCycle);
    }
    _setDefaultSpeed() {
        this._speedCycle = 500;
        document.getElementById('speed').innerHTML = (this._speedCycle / 1000).toString();
    }
    _start() {
        if (this._isStarted) {
            alert('Вы уже начали игру!');
            return;
        }
        this._setDefaultSpeed();
        this._field.createFirstAliveCells();
        this._isStarted = true;
        this._getCycles();
    }
    _restart() {
        if (!this._isStarted) {
            alert('Вы ещё не начали игру! Нажмите "Старт"');
            return;
        }
        if (this._isPaused) {
            this._isPaused = false;
            this._pauseBtn.innerHTML = 'Пауза';
        }
        this._isStarted = false;
        clearTimeout(this._cycles);
        this._field.clearCycleCounter();
        this._field.clearFieldAndCells();
        this._setDefaultSpeed();
        this._field.createFirstAliveCells();
        this._getCycles();
        this._isStarted = true;
    }
    _pause() {
        if (!this._isStarted) {
            alert('Игра ещё не началась! Нажмите кнопку "Старт"');
            return;
        }
        this._isPaused = !this._isPaused;
        if (this._isPaused) {
            clearTimeout(this._cycles);
            this._pauseBtn.innerHTML = 'Продолжить';
        }
        else {
            this._pauseBtn.innerHTML = 'Пауза';
            this._getCycles();
        }
    }
    _endGame() {
        if (!this._isStarted) {
            alert('Игра ещё не началась! Нажмите кнопку "Старт"');
            return;
        }
        if (this._isPaused) {
            this._isPaused = false;
            this._pauseBtn.innerHTML = 'Пауза';
        }
        alert(`Вы закончили игру. Количество прошедших циклов: ${this._field.countOfCycles}`);
        this._isStarted = false;
        this._field.clearFieldAndCells();
        this._field.clearCycleCounter();
    }
    _slowDown() {
        if (this._speedCycle >= 2000 || !this._isStarted || this._isPaused) {
            return;
        }
        this._speedCycle += 100;
        document.getElementById('speed').innerHTML = (this._speedCycle / 1000).toString();
    }
    _speedUp() {
        if (this._speedCycle <= 100 || !this._isStarted || this._isPaused) {
            return;
        }
        this._speedCycle -= 100;
        document.getElementById('speed').innerHTML = (this._speedCycle / 1000).toString();
    }
    _buttons() {
        this._startBtn.addEventListener('click', this._start.bind(this));
        this._slowDownBtn.addEventListener('click', this._slowDown.bind(this));
        this._speedUpBtn.addEventListener('click', this._speedUp.bind(this));
        this._restartBtn.addEventListener('click', this._restart.bind(this));
        this._pauseBtn.addEventListener('click', this._pause.bind(this));
        this._endGameBtn.addEventListener('click', this._endGame.bind(this));
        this._field.canvasField.addEventListener('click', this._field.drawOneCell.bind(this._field));
        this._field.canvasField.addEventListener('mousedown', this._field.userStartDrawing.bind(this._field));
        this._field.canvasField.addEventListener('mousemove', this._field.userKeepDrawing.bind(this._field));
        this._field.canvasField.addEventListener('mouseup', this._field.userStopDrawing.bind(this._field));
    }
    run() {
        this._buttons();
    }
}
