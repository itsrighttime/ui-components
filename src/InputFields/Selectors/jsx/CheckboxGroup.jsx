import { SelectionBox } from "../helper/SelectionBox.jsx";

/**
 * `CheckboxGroup` is a React component that renders a group of checkboxes using the `SelectionBox` component.
 * It allows multiple selections and provides callbacks to track selected values.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Array<string|Object>} [props.options=[]] - List of options for checkboxes. Each option can be a string or an object with label/value.
 * @param {Array<string>} [props.initialSelectedValues=[]] - List of initially selected values.
 * @param {function} props.setResult - Callback function to receive the selected values array.
 * @param {"vertical"|"horizontal"} [props.layout="vertical"] - Layout direction for checkboxes.
 * @param {string} [props.label] - Optional label displayed above the group.
 * @param {string} [props.color] - Primary color for checkbox selection.
 * @param {boolean} [props.disabled=false] - Whether the checkbox group is disabled.
 * @param {Object} [props.customStyles={}] - Custom CSS styles for the group and individual items, e.g., `{ group: {}, item: {} }`.
 * @param {string} [props.width="300px"] - Width of the checkbox group container.
 * @param {boolean} [props.required=false] - Whether at least one selection is required.
 *
 * @example
 * <CheckboxGroup
 *   options={["Option 1", "Option 2", "Option 3"]}
 *   initialSelectedValues={["Option 2"]}
 *   setResult={(values) => console.log(values)}
 *   layout="horizontal"
 *   label="Select options"
 *   color="#00AEEF"
 *   required
 * />
 *
 * @returns {JSX.Element} A checkbox group component supporting multiple selections.
 */
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
  required = false,
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
      required={required}
    />
  );
};
