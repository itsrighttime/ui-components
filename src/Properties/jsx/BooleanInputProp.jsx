import React from "react";
import styles from "../css/PropsCss.module.css";
import Switch from "../../InputFields/Selectors/jsx/Switch";

const BooleanInputProp = ({
  initialValue,
  setResult,
  color,
  label,
  disabled = false,
}) => {
  return (
    <div className={styles.booleanInputProp}>
      <Switch
        label={label}
        initialValue={initialValue}
        setResult={setResult}
        color={color}
        disabled={disabled}
      />
    </div>
  );
};

export default BooleanInputProp;
