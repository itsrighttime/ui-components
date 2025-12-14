import { TableHeader } from "./TableHeader.jsx";
import { TableBody } from "./TableBody.jsx";
import styles from "../css/Table.module.css";

/**
 * Table Component
 *
 * A reusable table component with fixed header and scrollable body,
 * supporting custom column widths, action buttons, clickable cells,
 * and customizable styling.
 *
 * Props:
 * @param {Array<Object>} data - Array of objects representing table rows.
 * @param {Array<string>} columns - Array of column keys to display.
 * @param {Object} columnWidths - Optional mapping of column keys to width values (e.g., { col1: "100px" }).
 * @param {boolean} isAction - Whether to display action buttons column.
 * @param {Array<{label: string, icon: any, onClick: function}>} btns - Array of action button definitions.
 * @param {Array<string>} clickableColumns - Array of column keys that trigger `onCellClick` on click.
 * @param {function} onCellClick - Callback when a clickable cell is clicked; receives row data and column key.
 * @param {boolean} isMinimunCellWidth - If true, enforces a minimum width for all cells.
 * @param {Object} styling - Object containing optional CSS customization:
 *   @property {string} colorLinkText
 *   @property {string} colorHeaderText
 *   @property {string} colorBodyText
 *   @property {string} colorHeaderCellBg
 *   @property {string} colorBodyCellBg
 *   @property {string} colorTableBg
 * @param {string} textWrap - CSS text wrapping for body cells (default: "wrap").
 * @param {string} headerWrap - CSS text wrapping for header cells (default: "nowrap").
 * @param {string} nothingToShow - Message to display when data is empty.
 *
 * Behavior:
 * - Displays a fixed header (`TableHeader`) and scrollable body (`TableBody`).
 * - Supports clickable cells and action buttons in a dedicated column.
 * - Accepts customizable column widths and styling via CSS variables.
 * - Shows a fallback message if no data is available.
 */
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
  textWrap = "wrap",
  headerWrap = "nowrap",
  nothingToShow = "No Records to Show",
}) => {
  const cssVariables = {
    "--colorLinkText": styling.colorLinkText || "var(--colorBlue)",
    "--colorHeaderText": styling.colorHeaderText || "var(--colorCyan)",
    "--colorBodyText": styling.colorBodyText || "var(--colorSimple)",
    "--colorHeaderCellBg": styling.colorHeaderCellBg || "var(--colorGray2)",
    "--colorBodyCellBg": styling.colorBodyCellBg || "var(--colorGray2)",
    "--colorTableBg": styling.colorTableBg || "var(--colorWhite)",
    "--textWrap": textWrap,
    "--headerWrap": headerWrap,
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
          nothingToShow={nothingToShow}
        />
      </div>
    </div>
  );
};
