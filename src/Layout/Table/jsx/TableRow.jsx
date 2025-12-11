import React from "react";
import { TableCell } from "./TableCell.jsx";
import styles from "../css/Table.module.css";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton.jsx";


export const TableRow = ({
  row,
  columns,
  columnWidths,
  isAction,
  actionButtons,
  clickableColumns,
  onCellClick,
  isMinimunCellWidth,
}) => {
  return (
    <div className={styles.row}>
      {columns
        .filter((col) => col.key !== "actions") // Avoid duplicate rendering
        .map((col) => (
          <TableCell
            key={col.key}
            label={col.render ? col.render(row[col.key], row) : row[col.key]}
            style={{ flex: columnWidths[col.key] || 1 }}
            isClickable={clickableColumns.includes(col.key)}
            onClick={() =>
              clickableColumns.includes(col.key) &&
              onCellClick(row[col.key], row)
            }
            isMinimunCellWidth={isMinimunCellWidth}
          />
        ))}

      {isAction && actionButtons?.length > 0 && (
        <TableCell
          key="action"
          label={
            <div className={styles.actions}>
              {actionButtons.map((btn, index) => (
                <IconButton
                  key={index}
                  label={btn.label}
                  icon={btn.icon}
                  onClick={() => btn.onClick(row)}
                  className={`${styles.actionBtn} ${btn.style}`}
                />
              ))}
            </div>
          }
          isMinimunCellWidth={isMinimunCellWidth}
          style={{ flex: columnWidths["actions"] || 1 }}
        />
      )}
    </div>
  );
};
