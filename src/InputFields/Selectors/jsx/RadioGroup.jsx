"use client";

import { SelectionBox } from "../helper/SelectionBox.jsx";

/**
 * `RadioGroup` is a React component that renders a group of radio buttons using the `SelectionBox` component.
 * It supports vertical or horizontal layout, custom styling, and optional labeling.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.options - Array of options for the radio group. Each option should have:
 *   @param {string|number} option.key - Unique key for the option.
 *   @param {string} option.value - Display label for the option.
 * @param {string|number} [props.initialSelectedValue] - Optional initial selected value (single value).
 * @param {function} props.setResult - Callback fired when the selected option changes. Receives the selected value.
 * @param {"vertical"|"horizontal"} [props.layout="vertical"] - Layout direction of the radio buttons.
 * @param {string} [props.label] - Optional label for the radio group.
 * @param {string} [props.color] - Optional color for styling the selected option.
 * @param {boolean} [props.disabled=false] - If true, disables all radio buttons.
 * @param {Object} [props.customStyles={}] - Optional custom styles for the group and items.
 * @param {string} [props.width="300px"] - Width of the radio group container.
 * @param {boolean} [props.required=false] - If true, marks the radio group as required.
 *
 * @example
 * <RadioGroup
 *   options={[{ key: 1, value: "Option 1" }, { key: 2, value: "Option 2" }]}
 *   initialSelectedValue={1}
 *   setResult={(value) => console.log("Selected:", value)}
 *   layout="horizontal"
 *   label="Choose an option"
 * />
 *
 * @returns {JSX.Element} A radio button group component.
 */
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
  required = false,
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
      required={required}
    />
  );
};
