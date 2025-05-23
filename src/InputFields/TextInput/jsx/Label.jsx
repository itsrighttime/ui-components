import styles from "../css/Label.module.css";

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
