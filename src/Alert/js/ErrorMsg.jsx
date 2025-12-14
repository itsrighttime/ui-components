"use client"


import React from "react";

/**
 * ErrorMsg Component
 *
 * A reusable UI component for displaying error messages with
 * customizable styling such as font weight, size, alignment, and padding.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.message - The error message text to display
 * @param {boolean} [props.bold=true] - Whether the error text should be bold
 * @param {number} [props.fontSize=0.8] - Font size multiplier based on CSS variable `--size`
 * @param {"left"|"center"|"right"|"justify"} [props.textAlign="left"] - Text alignment of the message
 * @param {string} [props.padding="10px"] - CSS padding applied to the message container
 *
 * @returns {JSX.Element} Rendered error message paragraph
 *
 * @example
 * <ErrorMsg message="Invalid email address" />
 *
 * @example
 * <ErrorMsg
 *   message="Something went wrong"
 *   bold={false}
 *   fontSize={1}
 *   textAlign="center"
 *   padding="8px 12px"
 * />
 */

const ErrorMsg = ({
  message,
  bold = true,
  fontSize = 0.8,
  textAlign = "left",
  padding = "10px",
}) => {
  const styling = {
    fontWeight: bold ? "var(--boldL2)" : 400,
    fontSize: `calc(var(--size)* ${fontSize})`,
    color: "var(--colorRed)",
    textAlign: textAlign,
    padding: padding,
  };

  return <p style={{ ...styling, textWrap: "wrap" }}>{message}</p>;
};

export default ErrorMsg;
