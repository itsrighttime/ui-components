import React, { useEffect, useState } from "react";
import style from "../css/Alert.module.css";

const Alert = ({ message, type, onDismiss }) => {
  const TIME_LIMIT = 10; // Adjusted to 10 seconds for clarity
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    // Decrease the timeLeft at regular intervals
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); // 1 second interval

    // Update the progress bar width
    setWidth((timeLeft / TIME_LIMIT) * 100);

    // If time runs out, dismiss the alert
    if (timeLeft <= -1) {
      onDismiss();
    }

    return () => clearInterval(timer);
  }, [timeLeft, onDismiss]);

  return (
    <div className={`${style.alert} ${style[type]}`}>
      {message}
      <div className={style.statusBar} style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default Alert;
