import React from "react";
import SelectionBox from "../helper/SelectionBox";

const RadioGroup = ({
  options = [],
  initialSelectedValue, // Single value for initial selection
  setResult,
  layout = "vertical", // "vertical" or "horizontal"
  label,
  color,
  disabled = false,
  customStyles = {}, // { customStyle.group = {}, customStyle.item = {} }
  inlineHelp = [],
}) => {
  return (
    <SelectionBox
      options={options}
      initialSelectedValues={initialSelectedValue}
      setResult={setResult}
      layout={layout}
      label={label}
      color={color}
      disabled={disabled}
      customStyles={customStyles}
      inlineHelp={inlineHelp}
      multiple={false}
    />
  );
};

export default RadioGroup;
