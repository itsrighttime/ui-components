import { useState } from "react";
import styles from "../css/Switch.module.css"; // Import your CSS module for styling

export const Switch = ({
  initialValue,
  setResult,
  color,
  label,
  disabled = false,
  customStyles = {},
}) => {
  const [switchValue, setSwitchValue] = useState(initialValue);

  console.log(initialValue);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !switchValue;
      setSwitchValue(newValue);
      setResult(newValue);
    }
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
  };

  return (
    <div
      className={styles.switchContainer}
      style={{ ...customStyles.container, ...cssVariable }}
    >
      {label && (
        <label className={styles.switchLabel} style={customStyles.label}>
          {label}
        </label>
      )}
      <div
        className={`${styles.switch} ${
          switchValue ? styles.checked : styles.unchecked
        } ${disabled ? styles.disabled : ""}`}
        onClick={handleToggle}
        role="switch"
        aria-checked={switchValue}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleToggle();
          }
        }}
      >
        <div className={styles.switchHandle} />
      </div>
    </div>
  );
};
