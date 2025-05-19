import React from "react";
import styles from "../css/Link.module.css";

const Link = ({
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
      className={`${styles.link}`}
      style={dynamicStyle}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text || url}
    </a>
  );
};

export default Link;
