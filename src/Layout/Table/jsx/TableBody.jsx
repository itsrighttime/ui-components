import React from "react";
import { TableRow } from "./TableRow";
import styles from "../css/Table.module.css";

export const TableBody = ({
  data,
  columns,
  columnWidths,
  isAction,
  actionButtons,
  clickableColumns,
  onCellClick,
  isMinimunCellWidth,
  nothingToShow,
}) => {
  return (
    <div className={styles.body}>
      {data.length === 0 ? (
        <p className={styles.emptyMsg}>{nothingToShow}</p>
      ) : (
        data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            row={row}
            columns={columns}
            columnWidths={columnWidths}
            isAction={isAction}
            actionButtons={actionButtons}
            clickableColumns={clickableColumns}
            onCellClick={onCellClick}
            isMinimunCellWidth={isMinimunCellWidth}
          />
        ))
      )}
    </div>
  );
};
