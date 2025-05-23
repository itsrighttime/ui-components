import React from "react";
import { SelectionBox } from "../helper/SelectionBox";

export const CheckboxGroup = ({
  options = [],
  initialSelectedValues = [],
  setResult,
  layout = "vertical", // "vertical" or "horizontal"
  label,
  color,
  disabled = false,
  customStyles = {}, // {customStyle.group = {}, customStyle.item}
  width = "300px",
}) => {
  return (
    <SelectionBox
      options={options}
      initialSelectedValues={initialSelectedValues}
      setResult={setResult}
      layout={layout}
      label={label}
      color={color}
      disabled={disabled}
      customStyles={customStyles}
      multiple
      width={width}
    />
  );
};
