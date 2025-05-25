import styles from "../css/Container.module.css";

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
