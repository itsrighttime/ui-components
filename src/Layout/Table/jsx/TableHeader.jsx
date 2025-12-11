import React from "react";
import { TableCell } from "./TableCell.jsx";
import styles from "../css/Table.module.css";

export const TableHeader = ({ columns, columnWidths, isMinimunCellWidth }) => {
  return (
    <div className={styles.header}>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          label={col.label}
          style={{ flex: columnWidths[col.key] || 1 }}
          isHeader
          isMinimunCellWidth={isMinimunCellWidth}
        />
      ))}
    </div>
  );
};
