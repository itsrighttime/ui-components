import { useState } from "react";
import styles from "../css/NumberField.module.css"; // Make sure to create this CSS file for styling
import { getCommonCssVariables } from "../../helper/getCommonCssVariables";

export const NumberField = ({
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
  width = "300px",
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

  const cssVariable = {
    ...getCommonCssVariables(isBorder, color, width),
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
