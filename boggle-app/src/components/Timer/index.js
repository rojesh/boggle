import React, { Component } from 'react'
import './timer.css';

const Timer = props => {
    const { minutes, seconds } = props;
    return (
        <div className="timer">
        { minutes === 0 && seconds === 0
            ? <h2 className="timeup">Time's up</h2>
            : <h2>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
        }
    </div>
    );
  };

  export default Timer;