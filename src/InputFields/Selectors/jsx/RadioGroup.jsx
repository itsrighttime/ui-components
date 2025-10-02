import { SelectionBox } from "../helper/SelectionBox";

export const RadioGroup = ({
  options = [],
  initialSelectedValue, // Single value for initial selection
  setResult,
  layout = "vertical", // "vertical" or "horizontal"
  label,
  color,
  disabled = false,
  customStyles = {}, // { customStyle.group = {}, customStyle.item = {} }
  width = "300px",
}) => {
  return (
    <SelectionBox
      options={options}
      initialSelectedValues={initialSelectedValue || []}
      setResult={setResult}
      layout={layout}
      label={label}
      color={color}
      disabled={disabled}
      customStyles={customStyles}
      multiple={false}
      width={width}
    />
  );
};
