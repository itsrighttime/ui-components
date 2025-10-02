import { useState } from "react";
import styles from "../css/Stepper.module.css"; // Ensure to create this CSS file for styling
import { IconButton } from "../../Actions/jsx/IconButton";
import { minusIcon, plusIcon } from "../../../utils/icons";
import { useEffect } from "react";

export const Stepper = ({
  value = 0,
  setResult,
  color,
  min = 0,
  max = 100,
  step = 5,
  label = "",
  width = "300px",
}) => {
  const [stepperValue, setStepperValue] = useState(value);

  useEffect(() => {
    if (value !== 0 && stepperValue === 0) setStepperValue(value);
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
