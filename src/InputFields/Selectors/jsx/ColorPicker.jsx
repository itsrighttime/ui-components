import React from "react";
import styles from "../css/ColorPicker.module.css";

const ColorPicker = ({ color, setResult }) => {
  return (
    <div className={styles.colorPicker}>
      <input
        type="color"
        value={color || "#52c9bd"}
        onChange={(e) => setResult(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default ColorPicker;
