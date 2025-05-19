import React, { useState } from "react";
import styles from "../css/NumberField.module.css"; // Make sure to create this CSS file for styling

const NumberField = ({
  value,
  setResult,
  label = "Number",
  color,
  placeholder = "",
  decimalPlaces = 2,
  maxIntegerDigits = 10,
  isBorder = false,
  showLabelAlways = false,
  min,
  max,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;

    // Validate and format the input value
    const regex =
      decimalPlaces > 0
        ? new RegExp(
            `^\\d{0,${maxIntegerDigits}}(\\.\\d{0,${decimalPlaces}})?$`
          )
        : new RegExp(`^\\d{0,${maxIntegerDigits}}$`);

    if (
      regex.test(value) &&
      (min === undefined || value >= min) &&
      (max === undefined || value <= max)
    ) {
      setInputValue(value);
    }
  };

  const cssBorder = `1px solid ${color || `var(--colorCyan)`}`;
  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",

    "--borderRadius": isBorder ? "5px" : "initial",
    "--borderTop": isBorder ? cssBorder : "none",
    "--borderLeft": isBorder ? cssBorder : "none",
    "--borderRight": isBorder ? cssBorder : "none",
    "--borderBottom": isBorder
      ? cssBorder
      : `2px solid ${color || "var(--colorCyan"}`,
  };

  return (
    <div className={styles.numberFieldContainer} style={cssVariable}>
      {(showLabelAlways || (isFocused && inputValue !== "")) && label && (
        <label
          htmlFor={label}
          className={`${styles.textFieldLabel} ${
            isFocused ? styles.focused : ""
          }`}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.numberFieldInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setResult(inputValue);
          setIsFocused(false);
        }}
      />
    </div>
  );
};

export default NumberField;
