import React from "react";
import styles from "../css/Label.module.css";

const Label = ({
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
    <div className={`${styles.label}`} style={dynamicStyle}>
      {text}
    </div>
  );
};

export default Label;
