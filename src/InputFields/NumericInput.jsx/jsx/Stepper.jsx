import { useState } from "react";
import styles from "../css/Stepper.module.css"; // Ensure to create this CSS file for styling
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { minusIcon, plusIcon } from "../../../utils/icons.jsx";
import { useEffect } from "react";

/**
 * Stepper Component
 *
 * A numeric stepper input component with increment and decrement buttons.
 * Allows users to increase or decrease the value in defined steps within min/max bounds.
 *
 * @component
 *
 * @param {Object} props - Stepper configuration props
 * @param {number} [props.value=0] - Initial value of the stepper
 * @param {function} props.setResult - Callback invoked with updated value
 * @param {string} [props.color="var(--colorCyan)"] - Color of buttons and active elements
 * @param {number} [props.min=0] - Minimum value allowed
 * @param {number} [props.max=100] - Maximum value allowed
 * @param {number} [props.step=5] - Step increment/decrement value
 * @param {string} [props.label=""] - Label displayed above the stepper
 * @param {string} [props.width="300px"] - Width of the stepper component
 * @param {boolean} [props.required=false] - Whether the stepper is required (shows asterisk)
 *
 * @returns {JSX.Element} Rendered Stepper component
 *
 * @example
 * <Stepper
 *   value={10}
 *   setResult={(val) => console.log(val)}
 *   min={0}
 *   max={50}
 *   step={5}
 *   label="Quantity"
 *   color="#1E90FF"
 *   width="200px"
 *   required
 * />
 *
 * @notes
 * - Prevents the value from exceeding `min` and `max`.
 * - `setResult` is called on every increment/decrement.
 * - Buttons use `IconButton` with customizable color.
 */
export const Stepper = ({
  value = 0,
  setResult,
  color = "var(--colorCyan)",
  min = 0,
  max = 100,
  step = 5,
  label = "",
  width = "300px",
  required = false,
}) => {
  const [stepperValue, setStepperValue] = useState(value || 0);

  useEffect(() => {
    if (value !== 0 && stepperValue === 0) setStepperValue(value || 0);
  }, [value]);

  const handleIncrement = () => {
    if (stepperValue + step <= max) {
      const newValue = stepperValue + step;
      setStepperValue(newValue);
      setResult(newValue);
    }
  };

  const handleDecrement = () => {
    if (stepperValue - step >= min) {
      const newValue = stepperValue - step;
      setStepperValue(newValue);
      setResult(newValue);
    }
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
    "--width": width,
  };

  return (
    <div className={styles.stepperContainer} style={cssVariable}>
      {required && <p className={styles.required}>*</p>}
      {label && <label className={styles.stepperLabel}>{label}</label>}
      <div className={styles.stepperControls}>
        <IconButton
          onClick={handleDecrement}
          size={2.2}
          icon={minusIcon}
          isBorder={true}
          color={"var(--colorWhite)"}
          style={{ backgroundColor: color }}
        />
        <div className={styles.stepperOutput}> {stepperValue} </div>
        <IconButton
          onClick={handleIncrement}
          size={2.2}
          icon={plusIcon}
          isBorder={true}
          color={"var(--colorWhite)"}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};
