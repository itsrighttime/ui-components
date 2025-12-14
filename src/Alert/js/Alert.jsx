"use client"

import { useEffect, useState } from "react";
import style from "../css/Alert.module.css";
import { crossIcon } from "../../utils/icons.jsx";
import { IconButton } from "../../InputFields/Actions/jsx/IconButton.jsx";

/**
 * Alert component to display a dismissible notification with an auto-fade timer.
 *
 * This component shows a message of a given type (e.g., "success", "error") and
 * automatically fades out after a set time limit (10 seconds by default). Users
 * can also manually dismiss the alert by clicking the close icon.
 *
 * The component includes a progress/status bar that visually indicates the
 * remaining time before automatic dismissal.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.message - The text message to display inside the alert.
 * @param {('success'|'error'|'info'|'warning')} props.type - The type of alert, which determines styling.
 * @param {function} props.onDismiss - Callback function called when the alert is dismissed, either manually or automatically.
 *
 * @example
 * <Alert
 *   message="Data saved successfully!"
 *   type="success"
 *   onDismiss={() => console.log("Alert dismissed")}
 * />
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
