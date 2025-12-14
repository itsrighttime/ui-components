import styles from "../css/Container.module.css";

/**
 * GridContainer Component
 *
 * A reusable wrapper component for creating CSS grid layouts.
 * Allows setting the number of columns and the gap between grid items.
 *
 * Props:
 * @param {React.ReactNode} children - The content to be placed inside the grid container.
 * @param {number} [cols=2] - Number of columns in the grid.
 * @param {string|number} [gap="8px"] - Gap between grid items.
 * @param {string} [className=""] - Additional CSS class names to apply.
 * @param {React.CSSProperties} [style={}] - Inline styles to merge with the component.
 *
 * @example
 * Example usage:
 * <GridContainer cols={3} gap="16px">
 *   <Item1 />
 *   <Item2 />
 *   <Item3 />
 * </GridContainer>
 */

export const GridContainer = ({
  children,
  cols = 2, // numeric: number of columns
  gap = "8px", // numeric: px gap
  className = "",
  style = {},
}) => {
  const cssVariables = {
    "--grid-cols": cols,
    "--grid-gap": gap,
  };

  return (
    <div
      className={`${styles.gridContainer} ${className}`}
      style={{ ...cssVariables, ...style }}
    >
      {children}
    </div>
  );
};
