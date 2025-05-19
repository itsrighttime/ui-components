import React from "react";
import styles from "../css/ImageButton.module.css";
import Label from "../../TextInput/jsx/Label";

export const ImageButton = ({
  text,
  onClick,
  style,
  backgroundImage,
  radius,
  padding,
  color,
  fontSize,
  fontWeight,
  textAlign,
  textTransform,
  letterSpacing,
  lineHeight,
  fontFamily,
  textStyle,
}) => {
  const cssVariable = {
    "--radius": radius,
    "--padding": padding,
  };

  const buttonStyle = {
    ...style,
    ...cssVariable,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundSize: "cover", // Ensure the background image covers the entire button
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <button
      type="button"
      className={`${styles.btn}`}
      onClick={onClick}
      style={buttonStyle}
    >
      {text && (
        <Label
          text={text}
          color={color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAlign={textAlign}
          textTransform={textTransform}
          letterSpacing={letterSpacing}
          lineHeight={lineHeight}
          fontFamily={fontFamily}
          style={textStyle}
        />
      )}
    </button>
  );
};
