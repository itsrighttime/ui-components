import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import styles from "../css/Table.module.css";

export const Table = ({
  data,
  columns,
  columnWidths = {},
  isAction = false,
  btns = [{ label: null, icon: null, onClick: null }],
  clickableColumns = [],
  onCellClick = () => {},
  isMinimunCellWidth = true,
  styling = {
    colorLinkText: "var(--colorBlue)",
    colorHeaderText: "var(--colorCyan)",
    colorBodyText: "var(--colorSimple)",
    colorHeaderCellBg: "var(--colorGray2)",
    colorBodyCellBg: "var(--colorGray2)",
    colorTableBg: "var(--colorWhite)",
  },
}) => {
  const cssVariables = {
    "--colorLinkText": styling.colorLinkText,
    "--colorHeaderText": styling.colorHeaderText,
    "--colorBodyText": styling.colorBodyText,
    "--colorHeaderCellBg": styling.colorHeaderCellBg,
    "--colorBodyCellBg": styling.colorBodyCellBg,
    "--colorTableBg": styling.colorTableBg,
  };

  return (
    <div className={styles.tableWrapper} style={cssVariables}>
      {/* Table Header - Fixed at Top */}
      <div className={styles.headerWrapper}>
        <TableHeader
          columns={columns}
          columnWidths={columnWidths}
          isMinimunCellWidth={isMinimunCellWidth}
        />
      </div>

      {/* Table Body - Scrollable */}
      <div className={styles.bodyWrapper}>
        <TableBody
          data={data}
          columns={columns}
          columnWidths={columnWidths}
          isAction={isAction}
          actionButtons={btns}
          clickableColumns={clickableColumns}
          onCellClick={onCellClick}
          isMinimunCellWidth={isMinimunCellWidth}
        />
      </div>
    </div>
  );
};
