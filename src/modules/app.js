import Field from './field.js';
export default class App {
    constructor() {
        this._field = new Field('blue');
        this._startBtn = document.getElementById('start');
        this._pauseBtn = document.getElementById('pause');
        this._restartBtn = document.getElementById('restart');
        this._endGameBtn = document.getElementById('endgame');
        this._isStarted = false;
        this._isPause = false;
    }
    _getCycles() {
        let app = this;
        this._cycles = setTimeout(function cycle() {
            if (!app._isStarted) {
                return;
            }
            if (app._field.isEndCycles) {
                alert(`Игра окончена. Количество прошедших циклов: ${app._field.countOfCycles}`);
                clearTimeout(app._cycles);
                app._isStarted = false;
                app._field.clearFieldAndCells();
                app._field.clearCycleCounter();
                app._field.isEndCycles = false;
                return;
            }
            app._field.oneCycleLive();
            app._cycles = setTimeout(cycle, 500);
        }, 500);
    }
    _start() {
        if (this._isStarted) {
            alert('Вы уже начали игру!');
            return;
        }
        this._field.createFirstAliveCells();
        this._isStarted = true;
        this._getCycles();
    }
    _restart() {
        if (!this._isStarted) {
            alert('Вы ещё не начали игру! Нажмите "Старт"');
            return;
        }
        if (this._isPause) {
            this._isPause = false;
            this._pauseBtn.innerHTML = 'Пауза';
        }
        this._isStarted = false;
        clearTimeout(this._cycles);
        this._field.clearCycleCounter();
        this._field.clearFieldAndCells();
        this._field.createFirstAliveCells();
        this._getCycles();
        this._isStarted = true;
    }
    _pause() {
        if (!this._isStarted) {
            alert('Игра ещё не началась! Нажмите кнопку "Старт"');
            return;
        }
        this._isPause = !this._isPause;
        if (this._isPause) {
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
        if (this._isPause) {
            this._isPause = false;
            this._pauseBtn.innerHTML = 'Пауза';
        }
        alert(`Вы закончили игру. Количество прошедших циклов: ${this._field.countOfCycles}`);
        this._isStarted = false;
        this._field.clearFieldAndCells();
        this._field.clearCycleCounter();
    }
    _buttons() {
        this._startBtn.addEventListener('click', this._start.bind(this));
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
