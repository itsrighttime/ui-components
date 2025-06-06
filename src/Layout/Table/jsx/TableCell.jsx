import React from "react";
import styles from "../css/Table.module.css";

export const TableCell = ({
  label,
  style: cellStyle,
  isHeader = false,
  isClickable = false,
  onClick,
  isMinimunCellWidth,
}) => {
  const cssVariable = {
    "--flexValue": cellStyle.flex,
    "--minumumWidth": isMinimunCellWidth
      ? `${parseFloat(cellStyle.flex) * 100}px`
      : `0px`,
  };

  return (
    <div
      className={`${styles.cell} ${isHeader ? styles.headerCell : ""}`}
      style={cssVariable}
      onClick={isClickable ? onClick : undefined}
    >
      <div
        className={`${isClickable ? styles.clickableCell : ""} ${
          styles.cellLabel
        }`}
      >
        {label}
      </div>
    </div>
  );
};
