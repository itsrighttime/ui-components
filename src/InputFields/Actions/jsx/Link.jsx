import styles from "../css/Link.module.css";

/**
 * A styled hyperlink component with customizable typography.
 *
 * @component
 * @param {string} text - The display text of the link.
 * @param {string} url - The URL the link points to.
 * @param {string} color - Text color.
 * @param {string} fontSize - Font size of the link.
 * @param {string} fontWeight - Font weight.
 * @param {string} textAlign - Text alignment.
 * @param {string} textTransform - Text transformation (uppercase, lowercase, etc.).
 * @param {string} letterSpacing - Letter spacing.
 * @param {string} lineHeight - Line height.
 * @param {string} fontFamily - Font family.
 * @param {Object} style - Additional custom styles.
 *
 * @example
 * <Link text="Visit Site" url="https://example.com" color="blue" fontWeight="bold" />
 */

export const Link = ({
  text,
  url = "#",
  color = "#00b0f0",
  fontSize,
  fontWeight,
  textAlign,
  textTransform,
  letterSpacing,
  lineHeight,
  fontFamily,
  style = {},
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
    <a
      href={url}
      className={styles.link}
      style={dynamicStyle}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text || url}
    </a>
  );
};
