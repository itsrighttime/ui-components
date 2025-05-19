import React, { useState } from "react";
import styles from "../css/Stepper.module.css"; // Ensure to create this CSS file for styling

const Stepper = ({
  value,
  setResult,
  color, 
  min = 0,
  max = 100,
  step = 5,
  label = "",
}) => {
  const [stepperValue, setStepperValue] = useState(value || 0);

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
  };

  return (
    <div className={styles.stepperContainer} style={cssVariable}>
      {label && <label className={styles.stepperLabel}>{label}</label>}
      <div className={styles.stepperControls}>
        <button
          className={styles.stepperButton}
          onClick={handleDecrement}
          disabled={stepperValue - step < min}
        >
          -
        </button>
        <div className={styles.stepperOutput}> {stepperValue} </div>
        <button
          className={styles.stepperButton}
          onClick={handleIncrement}
          disabled={stepperValue + step > max}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Stepper;
