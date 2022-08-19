import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./timer.scss";
import alarm from "../../sounds/alarm.mp3";
import MenuButton from "../../components/menuButton/MenuButton";

function Timer() {
  const [timerOn, setTimerOn] = useState(false);
  const [displayTime, setDisplayTime] = useState(25 * 60); // 25 minutes x 60 seconds
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerStatus, setTimerStatus] = useState("session");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTimerStatus = () => {
    setTimerOn(!timerOn);

    //logic for percentage in circularProgressbar
    if (totalSeconds === 0) {
      setTotalSeconds(sessionTime);
    }
  };

  const changeTime = (time, type) => {
    if (type === "break") {
      if ((breakTime <= 60 && time < 0) || (breakTime >= 3600 && time > 0)) {
        return;
      }
      setBreakTime((prevTime) => prevTime + time);
    } else if (type === "session") {
      if (
        (sessionTime <= 60 && time < 0) ||
        (sessionTime >= 3600 && time > 0)
      ) {
        return;
      }
      setSessionTime((prevTime) => prevTime + time);
      if (!timerOn) {
        setDisplayTime(sessionTime + time);
      }
    }
  };

  const resetTimer = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerOn(false);
    setTimerStatus("session");
  };

  const playSound = () => {
    const sound = new Audio(alarm);
    sound.play();
  };

  useEffect(() => {
    if (timerOn) {
      if (timerStatus === "session") {
        const sessionInterval = setInterval(() => {
          setDisplayTime(displayTime - 1);
          setSecondsLeft(displayTime);
          if (displayTime === 0) {
            playSound();
            setTimerStatus("break");
            setDisplayTime(breakTime);
            setTotalSeconds(breakTime);
          }
        }, 1000);

        return () => clearInterval(sessionInterval);
      }
      if (timerStatus === "break") {
        const breakInterval = setInterval(() => {
          setDisplayTime(displayTime - 1);
          setSecondsLeft(displayTime);
          if (displayTime === 0) {
            playSound();
            setTimerStatus("session");
            setDisplayTime(sessionTime);
            setTotalSeconds(sessionTime);
          }
        }, 1000);
        return () => clearInterval(breakInterval);
      }
    }
  }, [
    displayTime,
    timerOn,
    breakTime,
    sessionTime,
    timerStatus,
    totalSeconds,
    secondsLeft,
  ]);

  return (
    <div className="timer">
      <MenuButton />
      <div className="timer-wrapper">
        <div className="timer-container">
          <h2 className="status-header" id="timer-label">
            {timerStatus === "break" ? "Break" : "Session"}
          </h2>
          <CircularProgressbar
            className="progress-bar"
            class="countdown-timer"
            id="time-left"
            text={formatTime(displayTime)}
            value={Math.floor((secondsLeft / totalSeconds) * 100)}
            styles={buildStyles({ pathColor: `#D83716`, textColor: `white` })}
          />
          <div className="console">
            <div className="session-container">
              <div className="session-length">
                <p id="session-label">Session Length</p>
                <p id="session-length">{formatTime(sessionTime)}</p>
                <button
                  className="time-change-button"
                  id="session-decrement"
                  onClick={() => changeTime(-60, "session")}
                >
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
                <button
                  className="time-change-button"
                  id="session-increment"
                  onClick={() => changeTime(60, "session")}
                >
                  <i className="fa-solid fa-circle-plus"></i>
                </button>
              </div>
              <div className="break-time">
                <p id="break-label">Break Length</p>
                <p id="break-length">{formatTime(breakTime)}</p>
                <button
                  className="time-change-button"
                  id="break-decrement"
                  onClick={() => changeTime(-60, "break")}
                >
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
                <button
                  className="time-change-button"
                  id="break-increment"
                  onClick={() => changeTime(60, "break")}
                >
                  <i className="fa-solid fa-circle-plus"></i>
                </button>
              </div>
            </div>
            <div className="button-container">
              <button
                className="timer-button"
                id="start_stop"
                onClick={changeTimerStatus}
              >
                {!timerOn ? (
                  <i className="fa-solid fa-play"></i>
                ) : (
                  <i className="fa-solid fa-pause"></i>
                )}
              </button>
              <button className="timer-button" id="reset" onClick={resetTimer}>
                <i className="fa-solid fa-arrows-rotate"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
