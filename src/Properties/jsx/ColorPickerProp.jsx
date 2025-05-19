import React from "react";
import styles from "../css/PropsCss.module.css";
import ColorPicker from "../../InputFields/Selectors/jsx/ColorPicker";

const ColorPickerProp = ({ color, setResult }) => {
  return (
    <div className={styles.colorPickerProp}>
      <ColorPicker color={color} setResult={setResult} />
    </div>
  );
};

export default ColorPickerProp;
