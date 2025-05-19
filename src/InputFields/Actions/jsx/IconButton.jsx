import React from "react";
import styles from "../css/IconButton.module.css";

export const IconButton = ({
  icon,
  onClick,
  color = "#52C9BD",
  style = {},
  size = "1",
  label = null,
  labelLeft = "-15px",
}) => {
  const colorStyle = {
    "--iconColor": color,
    "--iconSize": `calc(var(--size) * ${size})`,
    "--labelLeft": labelLeft,
  };

  return (
    <div className={styles.iconButton} style={colorStyle}>
      {label && <p className={styles.label}>{label}</p>}
      <button
        type="button"
        className={`${styles.btn}`}
        onClick={onClick}
        style={{ ...style, ...colorStyle }}
      >
        {icon}
      </button>
    </div>
  );
};

export default IconButton;
