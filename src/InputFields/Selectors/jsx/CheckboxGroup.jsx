import React from "react";
import SelectionBox from "../helper/SelectionBox";

const CheckboxGroup = ({
  options = [],
  initialSelectedValues = [],
  setResult,
  layout = "vertical", // "vertical" or "horizontal"
  label,
  color,
  disabled = false,
  customStyles = {}, // {customStyle.group = {}, customStyle.item}
  inlineHelp = [],
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
      inlineHelp={inlineHelp}
      multiple
    />
  );
};

export default CheckboxGroup;
