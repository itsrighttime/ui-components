import styles from "../css/ColorPicker.module.css";

/**
 * `ColorPicker` is a React component that renders a color input allowing users to select a color.
 * 
 * @component
 * 
 * @param {Object} props - Component props.
 * @param {string} props.color - The currently selected color in hex format (e.g., "#52c9bd").
 * @param {function} props.setResult - Callback function that receives the selected color value when changed.
 * @param {boolean} [props.required=false] - Whether selecting a color is required (displays an asterisk if true).
 * 
 * @example
 * <ColorPicker
 *   color="#ff0000"
 *   setResult={(value) => console.log("Selected color:", value)}
 *   required
 * />
 * 
 * @returns {JSX.Element} A color picker input component.
 */
export const ColorPicker = ({ color, setResult, required = false }) => {
  return (
    <div className={styles.colorPicker}>
      <input
        type="color"
        value={color || "#52c9bd"}
        onChange={(e) => setResult(e.target.value)}
        className={styles.input}
      />
      {required && <p className={styles.required}>*</p>}
    </div>
  );
};
