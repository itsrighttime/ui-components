"use client";

import styles from "../css/Container.module.css";
import { toCSSValue } from "../helper/toCSSValue.js";

/**
 * FlexContainer Component
 *
 * A reusable wrapper component for creating flexible layouts using CSS Flexbox.
 * Supports direction, alignment, justification, wrapping, and gap control via props.
 *
 * Props:
 * @param {React.ReactNode} children - The content to be wrapped inside the flex container.
 * @param {"row"|"column"} [direction="row"] - Flex direction.
 * @param {"start"|"center"|"end"|"between"|"around"|"evenly"} [justify="start"] - Justify content.
 * @param {"start"|"center"|"end"|"stretch"} [align="stretch"] - Align items.
 * @param {"wrap"|"nowrap"|"wrap-reverse"} [wrap="wrap"] - Flex wrapping behavior.
 * @param {string|number} [gap="8px"] - Gap between flex items.
 * @param {string} [className=""] - Additional CSS class names to apply.
 * @param {React.CSSProperties} [style={}] - Inline styles to merge with the component.
 * @param {React.Ref<HTMLDivElement>} [flexRef=null] - Ref to access the container DOM element.
 *
 * @example
 * Example usage:
 * <FlexContainer
 *   direction="column"
 *   justify="center"
 *   align="start"
 *   gap="16px"
 * >
 *   <ChildComponent1 />
 *   <ChildComponent2 />
 * </FlexContainer>
 */

export const FlexContainer = ({
  children,
  direction = "row", // row | column
  justify = "start", // start | center | end | between | around | evenly
  align = "stretch", // start | center | end | stretch
  wrap = "wrap", // wrap | nowrap | wrap-reverse
  gap = "8px", // numeric px value
  className = "",
  style = {},
  flexRef = null,
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
      ref={flexRef}
      className={`${styles.flexContainer} ${className}`}
      style={{ ...cssVariables, ...style }}
    >
      {children}
    </div>
  );
};
