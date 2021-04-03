import {interval, fromEvent} from 'rxjs';

const timerBox = document.querySelector('.timer');
const startBtn = timerBox.querySelector('.start');
const stopBtn = timerBox.querySelector('.stop');
const resetBtn = timerBox.querySelector('.reset');
const waitBtn = timerBox.querySelector('.wait');
const display = timerBox.querySelector('.display');

const stream$ = interval(100);
let startTimer = false;
let time = 0;

stream$.subscribe(
    val => {
        if (!startTimer) return;

        time++;

        const getSeconds = `0${Math.floor((time / 10) % 60)}`.slice(-2);
        const getMinutes = `0${Math.floor((time / 600) % 60)}`.slice(-2);
        const getHours = `0${Math.floor((time / 36000) % 24)}`.slice(-2);

        display.innerHTML = `${getHours}:${getMinutes}:${getSeconds}`;
    });

fromEvent(startBtn, 'click')
    .subscribe(e => {
        startTimer = true;
    });

fromEvent(stopBtn, 'click')
    .subscribe(e => {
        startTimer = false;
        time = 0;
        display.innerHTML = `00:00:00`;
    });

fromEvent(resetBtn, 'click')
    .subscribe(e => {
        if (!startTimer) return;
        time = 0;
        display.innerHTML = `00:00:00`;
    });

let timerClickWait = null;
let countClickWait = 0;
fromEvent(waitBtn, 'click')
    .subscribe(e => {
        countClickWait++;
        if(timerClickWait == null){
            timerClickWait = setTimeout(() => {
                timerClickWait = null;
                countClickWait = 0;
            }, 300)
        } else if(countClickWait > 1) {
            startTimer = false;
            countClickWait = 0;
        }
    });