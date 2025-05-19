import React from "react";
import styles from "../css/PropsCss.module.css";
import NumberField from "../../InputFields/NumericInput.jsx/jsx/NumberField";

const NumberInputProp = ({
  label,
  value,
  setResult,
  color,
  placeholder = "",
  decimalPlaces = 2,
  maxIntegerDigits = 10,
  min,
  max,
}) => {
  return (
    <div className={styles.numberInputProp}>
      <span>{label}</span>
      <div>
        <NumberField
          value={value}
          setResult={setResult}
          color={color}
          placeholder={placeholder}
          decimalPlaces={decimalPlaces}
          maxIntegerDigits={maxIntegerDigits}
          min={min}
          max={max}
          isBorder
        />
      </div>
    </div>
  );
};

export default NumberInputProp;
