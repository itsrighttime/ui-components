import { useState } from "react";
import styles from "./css/SelectionBox.module.css";
import { IconButton } from "../../Actions/jsx/IconButton";
import { singleTick } from "../../../utils/icons";

export const SelectionBox = ({
  options = [],
  initialSelectedValues = [],
  setResult,
  multiple = true,
  layout = "vertical",
  label,
  color,
  disabled = false,
  customStyles = {}, // { customStyle.group = {}, customStyle.item = {} }
  width = "300px",
}) => {
  const [selectedValues, setSelectedValues] = useState(
    multiple ? initialSelectedValues : initialSelectedValues || null
  );

  // Handles selection for both checkbox (multiple) and radio (single)
  const handleChange = (value) => {
    let updatedSelections;
    if (multiple) {
      // For checkboxes, toggle selection
      if (selectedValues.includes(value)) {
        updatedSelections = selectedValues.filter((item) => item !== value);
      } else {
        updatedSelections = [...selectedValues, value];
      }
    } else {
      // For radio, only one value can be selected
      updatedSelections = value;
    }

    setSelectedValues(updatedSelections);
    setResult(updatedSelections);
  };

  // Checks if a specific value is selected (works for both checkbox and radio)
  const isValueSelected = (value) => {
    return multiple ? selectedValues.includes(value) : selectedValues === value;
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
    "--width": width,
  };

  const setIconColor = (option) => {
    return disabled || option.disabled ? "#bbb9b9" : color;
  };

  const setIconStyle = (option) => {
    return multiple
      ? {
          width: "18px",
          height: "18px",
          cursor: `${disabled || option.disabled ? "not-allowed" : "pointer"}`,
        }
      : {
          width: "15px",
          height: "15px",
          cursor: `${disabled || option.disabled ? "not-allowed" : "pointer"}`,
          borderRadius: "50%",
        };
  };

  return (
    <div
      className={`${styles.selectionGroup} ${styles[layout]}`}
      style={{ ...customStyles.group, ...cssVariable }}
      aria-labelledby={label}
    >
      {label && <div className={styles.label}>{label}</div>}

      {options.map((option, index) => {
        const selectedOption = isValueSelected(option.value);
        return (
          <div
            key={option.value || index}
            className={`${styles.selectionItem} ${
              disabled || option.disabled ? styles.disabled : ""
            }`}
            style={customStyles.item}
            onClick={() =>
              !disabled && !option.disabled && handleChange(option.value)
            }
          >
            <IconButton
              icon={selectedOption ? singleTick : ""}
              color={setIconColor(option)}
              style={setIconStyle(option)}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling when clicking on the icon
                !disabled && !option.disabled && handleChange(option.value);
              }}
            />
            <label
              className={`${styles.selectionLabel} ${
                (disabled || option.disabled) && styles.disabled
              } ${selectedOption && styles.selected}`}
              style={customStyles.label}
              onClick={(e) => {
                e.stopPropagation();
                !disabled && !option.disabled && handleChange(option.value);
              }}
            >
              {option.label}
            </label>

            {option.help && (
              <div
                className={`${styles.inlineHelp}  ${
                  (disabled || option.disabled) && styles.disabled
                } ${selectedOption && styles.selected}`}
              >
                {option.help}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
