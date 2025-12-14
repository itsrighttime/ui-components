"use client";

import { useState } from "react";
import styles from "../css/Switch.module.css"; // Import your CSS module for styling

/**
 * `Switch` is a toggle component that allows users to switch between two states: on/off (true/false).
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.initialValue - Initial state of the switch (true for on, false for off).
 * @param {function} props.setResult - Callback fired when the switch value changes. Receives the new boolean value.
 * @param {string} [props.color] - Optional color for the switch handle and track.
 * @param {string} [props.label] - Optional label displayed alongside the switch.
 * @param {boolean} [props.disabled=false] - If true, disables user interaction with the switch.
 * @param {Object} [props.customStyles={}] - Optional custom styles. Can include:
 *   @param {Object} customStyles.container - Custom styles for the switch container.
 *   @param {Object} customStyles.label - Custom styles for the label.
 * @param {boolean} [props.required=false] - If true, shows a required asterisk (*) near the switch.
 *
 * @example
 * <Switch
 *   initialValue={false}
 *   setResult={(val) => console.log(val)}
 *   color="var(--colorCyan)"
 *   label="Enable Notifications"
 *   required={true}
 * />
 *
 * @returns {JSX.Element} A styled toggle switch with optional label and required indicator.
 */
export const Switch = ({
  initialValue,
  setResult,
  color,
  label,
  disabled = false,
  customStyles = {},
  required = false,
}) => {
  const [switchValue, setSwitchValue] = useState(initialValue);

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
      {required && <p className={styles.required}>*</p>}
    </div>
  );
};
