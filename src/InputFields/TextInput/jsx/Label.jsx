import styles from "../css/Label.module.css";

/**
 * `Label` is a flexible React component for rendering styled text with customizable typography and layout.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} props.text - The text content to display.
 * @param {string} [props.color] - Text color.
 * @param {string|number} [props.fontSize] - Font size (e.g., "16px" or 16).
 * @param {string|number} [props.fontWeight] - Font weight (e.g., "bold" or 400).
 * @param {string} [props.textAlign] - Text alignment (e.g., "left", "center", "right").
 * @param {string} [props.textTransform] - Text transformation (e.g., "uppercase", "capitalize").
 * @param {string} [props.letterSpacing] - Spacing between letters (e.g., "1px").
 * @param {string|number} [props.lineHeight] - Line height (e.g., "1.5" or "20px").
 * @param {string} [props.fontFamily] - Font family to use.
 * @param {Object} [props.style={}] - Additional custom styles to apply.
 * @param {string} [props.width="300px"] - Width of the label container.
 *
 * @example
 * <Label
 *   text="Username"
 *   color="#333"
 *   fontSize="14px"
 *   fontWeight="600"
 *   textAlign="left"
 *   fontFamily="Arial, sans-serif"
 * />
 *
 * @returns {JSX.Element} A styled div containing the label text.
 */
export const Label = ({
  text,
  color,
  fontSize,
  fontWeight,
  textAlign,
  textTransform,
  letterSpacing,
  lineHeight,
  fontFamily,
  style = {},
  width = "300px",
}) => {
  const dynamicStyle = {
    color,
    fontSize,
    fontWeight,
    textAlign,
    textTransform,
    letterSpacing,
    lineHeight,
    fontFamily,
    ...style, // Additional custom styles passed via the `style` prop
  };

  return (
    <div className={`${styles.label}`} style={{ width, ...dynamicStyle }}>
      {text}
    </div>
  );
};
