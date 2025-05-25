import styles from "../css/PlainButton.module.css";

/**
 * A customizable button with flexible styles using CSS variables.
 *
 * @component
 * @param {Function} onClick - Function to be called on button click.
 * @param {Object} style - Additional inline styles.
 * @param {string} text - Button text. Default is "Click Me".
 * @param {string} color - Main color used for text or background.
 *
 * @example
 * <PlainButton text="Submit" color="#007bff" onClick={() => console.log('Clicked!')} />
 */

export const PlainButton = ({
  onClick,
  style,
  text = "Click Me",
  color = "#52C9BD",
  fontSize = 1,
  fontWeight = 400,
  isUnderline = false,
}) => {
  const cssVariable = {
    "--color": color,
    "--fontSize": `${fontSize}rem`,
    "--fontWeight": fontWeight,
    "--underline": isUnderline ? "underline" : "none",
    "--underlineHover": isUnderline ? "none" : "underline",
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
