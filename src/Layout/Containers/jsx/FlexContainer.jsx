import styles from "../css/Container.module.css";
import { toCSSValue } from "../helper/toCSSValue";

export const FlexContainer = ({
  children,
  direction = "row", // row | column
  justify = "start", // start | center | end | between | around | evenly
  align = "stretch", // start | center | end | stretch
  wrap = "wrap", // wrap | nowrap | wrap-reverse
  gap = "8px", // numeric px value
  className = "",
  style = {},
}) => {
  const cssVariables = {
    "--flex-direction": toCSSValue("direction", direction),
    "--flex-justify": toCSSValue("justify", justify),
    "--flex-align": toCSSValue("align", align),
    "--flex-wrap": toCSSValue("wrap", wrap),
    "--flex-gap": gap,
  };

  return (
    <div
      className={`${styles.flexContainer} ${className}`}
      style={{ ...cssVariables, ...style }}
    >
      {children}
    </div>
  );
};
