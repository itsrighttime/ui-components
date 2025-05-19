import React from "react";

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
