import styles from "../css/Button.module.css";

/**
 * A customizable button with flexible styles using CSS variables.
 *
 * @component
 * @param {Function} onClick - Function to be called on button click.
 * @param {Object} style - Additional inline styles.
 * @param {string} text - Button text. Default is "Click Me".
 * @param {string} color - Main color used for text or background.
 * @param {boolean} isBackground - Determines if color is background or text.
 * @param {string} height - Height of the button (e.g., "30px").
 * @param {string} width - Width of the button (e.g., "100px").
 * @param {string} borderRadius - Border radius of the button.
 *
 * @example
 * <Button text="Submit" color="#007bff" onClick={() => console.log('Clicked!')} />
 */

export const Button = ({
  onClick,
  style,
  text = "Click Me",
  color = "#52C9BD",
  isBackground = true,
  height = "30px",
  width = "100px",
  borderRadius = "5px",
}) => {
  const cssVariable = {
    "--color": isBackground ? "#fff" : color,
    "--background": isBackground ? color : "transparent",
    "--border": isBackground ? "none" : `1px solid ${color}`,
    "--hoverBackground": color,
    "--hoverColor": "#fff",
    "--height": height,
    "--width": width,
    "--borderRadius": borderRadius,
  };
  return (
    <button
      type="button"
      className={`${styles.btn} `}
      onClick={onClick}
      style={{ ...style, ...cssVariable }}
    >
      {text}
    </button>
  );
};
