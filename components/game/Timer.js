import { useState, useEffect } from "react";

const Timer = ({ setMinutes, setSeconds, minutes, seconds }) => {
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdownTimer);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  });

  return (
    <div className="timer">
      {minutes === 0 && seconds === 0 ? (
        <h1></h1>
      ) : (
        <h1>
          Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default Timer;
