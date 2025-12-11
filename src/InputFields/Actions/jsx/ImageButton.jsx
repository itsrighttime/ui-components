import styles from "../css/ImageButton.module.css";
import { Label } from "../../TextInput/jsx/Label.jsx";

/**
 * A button with an image background and optional text label.
 *
 * @component
 * @param {string} text - Optional text displayed on the button.
 * @param {Function} onClick - Function called when clicked.
 * @param {Object} imageStyle - Custom styles for the button image.
 * @param {string} backgroundImage - Image URL for the button background.
 * @param {string} height - Button height.
 * @param {string} width - Button width.
 * @param {string} borderRadius - Rounded corners.
 * @param {string} textColor - Color of the label text.
 * @param {Object} textStyle - Inline styles for the label.
 *
 * @example
 * <ImageButton
 *   text="Gallery"
 *   backgroundImage="/images/gallery.jpg"
 *   onClick={() => console.log('Image Button Clicked')}
 * />
 */

export const ImageButton = ({
  text,
  onClick,
  imageStyle,
  backgroundImage,
  height = "100px",
  width = "100px",
  borderRadius = "5px",
  textColor = "#52C9BD",
  textStyle,
}) => {
  const cssVariable = {
    "--height": height,
    "--width": width,
  };

  const buttonStyle = {
    ...cssVariable,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    borderRadius,
    ...imageStyle,
  };

  return (
    <button
      type="button"
      className={`${styles.btn}`}
      onClick={onClick}
      style={buttonStyle}
    >
      {text && <Label text={text} color={textColor} style={textStyle} />}
    </button>
  );
};
