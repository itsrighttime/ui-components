import { useState } from "react";
import styles from "../css/NumberField.module.css"; // Make sure to create this CSS file for styling
import { getCommonCssVariables } from "../../helper/getCommonCssVariables.js";

/**
 * NumberField Component
 *
 * A numeric input field that supports integer and decimal validation, 
 * minimum and maximum value constraints, and configurable decimal places.
 * The component maintains internal state for the input value and notifies
 * the parent component via `setResult` when the value changes.
 *
 * @component
 *
 * @param {Object} props - Configuration props for NumberField
 * @param {string|number} props.value - Initial numeric value
 * @param {function} props.setResult - Callback to receive the input value on blur
 * @param {string} [props.label="Number"] - Label to display for the input
 * @param {string} [props.color] - Custom color for the input
 * @param {string} [props.placeholder=""] - Placeholder text for the input
 * @param {number} [props.decimalPlaces=2] - Number of allowed decimal places
 * @param {number} [props.maxIntegerDigits=10] - Maximum digits allowed before decimal
 * @param {boolean} [props.isBorder=false] - Whether to show input border
 * @param {boolean} [props.showLabelAlways=false] - Always display label
 * @param {number} [props.min] - Minimum allowed value
 * @param {number} [props.max] - Maximum allowed value
 * @param {string} [props.width="300px"] - Width of the input field
 * @param {boolean} [props.required=false] - Mark the input as required
 *
 * @returns {JSX.Element} Rendered NumberField component
 *
 * @example
 * <NumberField
 *   value={100}
 *   setResult={(val) => console.log(val)}
 *   label="Amount"
 *   decimalPlaces={2}
 *   maxIntegerDigits={5}
 *   min={0}
 *   max={1000}
 *   isBorder
 *   showLabelAlways
 *   width="250px"
 * />
 *
 * @notes
 * - The input only accepts valid numeric characters according to the specified decimal places.
 * - The component prevents entering values outside the min/max range.
 * - `setResult` is triggered on blur to notify the parent component of the final value.
 */
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
  required = false,
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
      {required && <p className={styles.required}>*</p>}

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
