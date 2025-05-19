import React from "react";
import styles from "../css/Button.module.css";

export const Button = ({ text = "Click Me", onClick, style, color = "#52C9BD" }) => {
  const cssVariable = {
    "--color": color,
  };
  return (
    <button
      type="button"
      className={`${styles.btn} `}
      onClick={onClick}
      style={{ ...style, ...cssVariable }}
    >
      {text}
    </button>
  );
};
