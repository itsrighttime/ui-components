import { useEffect, useState } from "react";
import style from "../css/Alert.module.css";
import { crossIcon } from "../../utils/icons";
import { IconButton } from "../../InputFields/Actions/jsx/IconButton";

/**
 * Alert Component - Displays a single alert message with a countdown bar and dismiss transition.
 *
 * @component
 * @param {Object} props
 * @param {string} props.message - The alert message text.
 * @param {"success"|"error"|"info"} props.type - Type of alert, determines styling.
 * @param {Function} props.onDismiss - Callback when alert is removed.
 */
export const Alert = ({ message, type, onDismiss }) => {
  const TIME_LIMIT = 10;
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [width, setWidth] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    setWidth((timeLeft / TIME_LIMIT) * 100);

    if (timeLeft <= 0) {
      setIsVisible(false); // Trigger fade-out
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Delay unmount after animation
  useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => onDismiss(), 400); // Match CSS transition
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onDismiss]);

  const handleManualDismiss = () => setIsVisible(false); // Handle icon click

  return (
    <div
      className={`${style.alert} ${style[type]} ${
        !isVisible ? style.fadeOut : ""
      }`}
    >
      {message}
      <div className={style.statusBar} style={{ width: `${width}%` }}></div>
      <div className={style.crossIcon}>
        <IconButton
          icon={crossIcon}
          onClick={handleManualDismiss}
          color="#fff"
          style={{ borderRadius: "50%", backgroundColor: "#ff5969" }}
          size="0.5"
        />
      </div>
    </div>
  );
};
