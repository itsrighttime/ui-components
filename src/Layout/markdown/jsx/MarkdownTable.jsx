import styles from "../css/MarkdownTable.module.css";

export function MarkdownTable({ node }) {
  // Safety checks for table structure
  if (!node?.children || node.children.length === 0) {
    return null;
  }

  // Filter to get only element nodes (ignore text/whitespace nodes)
  const elementChildren = node.children.filter(
    (child) => child.type === "element"
  );

  const head = elementChildren.find((child) => child.tagName === "thead");
  const body = elementChildren.find((child) => child.tagName === "tbody");

  // Extract header cells - filter for element nodes only
  const headerRow = head?.children?.find(
    (child) => child.type === "element" && child.tagName === "tr"
  );
  const headerCells =
    headerRow?.children?.filter((child) => child.type === "element") || [];

  // Extract body rows - filter for element nodes only
  const bodyRows =
    body?.children?.filter(
      (child) => child.type === "element" && child.tagName === "tr"
    ) || [];

  // Helper function to extract text content from a cell node
  const getCellContent = (cell) => {
    if (!cell?.children) return "";

    // If it's a simple text node
    if (cell.children.length === 1 && cell.children[0]?.value) {
      return cell.children[0].value;
    }

    // For complex content, map through all children
    return cell.children
      .map((child) => {
        if (child.type === "text") {
          return child.value;
        }
        if (child.type === "element") {
          // Recursively get content from nested elements
          return getCellContent(child);
        }
        return "";
      })
      .join("");
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        {headerCells.length > 0 && (
          <thead>
            <tr>
              {headerCells.map((cell, idx) => (
                <th key={idx}>{getCellContent(cell)}</th>
              ))}
            </tr>
          </thead>
        )}
        {bodyRows.length > 0 && (
          <tbody>
            {bodyRows.map((row, i) => {
              // Filter cells to only include element nodes
              const cells =
                row.children?.filter((child) => child.type === "element") || [];
              return (
                <tr key={i}>
                  {cells.map((cell, j) => (
                    <td key={j}>{getCellContent(cell)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}
