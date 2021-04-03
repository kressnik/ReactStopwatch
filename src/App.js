import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [isWait, setIsWait] = useState(false);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const timer = useRef(null);
  const doubleClickTimer = useRef(null);

  function handleStart() {
    setIsStartTimer(true)
    setIsWait(true)
    timer.current = setInterval(() => {
      setTime((time) => time + 1)
    }, 100)
  }

  function handleWait() {
    if(doubleClickTimer.current === null) {
      setIsDoubleClick(true);
      doubleClickTimer.current = setTimeout(() => {
        doubleClickTimer.current = null;
        setIsDoubleClick(false);
      }, 300)
    } else if(isDoubleClick) {
      clearTimeout(doubleClickTimer.current);
      clearInterval(timer.current);
      doubleClickTimer.current = null;
      setIsWait(false);
      setIsDoubleClick(false);
    }
  }

  function handleStop() {
    clearInterval(timer.current)
    setIsStartTimer(false)
    setIsWait(false)
    setTime(0)
  }

  function handleReset() {
    setTime(0)
  }

  function formatTime() {
    const getSeconds = `0${Math.floor((time / 10) % 60)}`.slice(-2);
    const getMinutes = `0${Math.floor((time / 600) % 60)}`.slice(-2);
    const getHours = `0${Math.floor((time / 36000) % 24)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <div className="timer">
      <h1>Timer React</h1>
      <div className="timer__body">
        <h3 className="timer__display display">{formatTime()}</h3>
        <div className="timer__buttons">
          <button onClick={handleStart} disabled={isStartTimer && isWait}>Start</button>
          <button onClick={handleWait} disabled={!isStartTimer}>Wait</button> 
          <button onClick={handleStop} disabled={!isStartTimer}>Stop</button>
          <button onClick={handleReset} disabled={!isStartTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
