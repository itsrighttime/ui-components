import styles from "../css/LoadingStyle.module.css";

/**
 * CubesLoader Component
 *
 * Displays a 3x3 cube animation loader.
 *
 * Props:
 * @param {string} color - The color of the cubes (default: "var(--colorCyan)").
 *
 * Usage:
 * <CubesLoader color="var(--colorRed)" />
 */

export const CubesLoader = ({ color }) => {
  const cssVariables = {
    "--color": color || "var(--colorCyan)",
  };
  return (
    <div className={styles.cubes} style={cssVariables}>
      <div className={`${styles.skCube} ${styles.skCube1}`}></div>
      <div className={`${styles.skCube} ${styles.skCube2}`}></div>
      <div className={`${styles.skCube} ${styles.skCube3}`}></div>
      <div className={`${styles.skCube} ${styles.skCube4}`}></div>
      <div className={`${styles.skCube} ${styles.skCube5}`}></div>
      <div className={`${styles.skCube} ${styles.skCube6}`}></div>
      <div className={`${styles.skCube} ${styles.skCube7}`}></div>
      <div className={`${styles.skCube} ${styles.skCube8}`}></div>
      <div className={`${styles.skCube} ${styles.skCube9}`}></div>
    </div>
  );
};

/**
 * FoldingLoader Component
 *
 * Displays a folding cube animation loader.
 *
 * Props:
 * @param {string} color - The color of the folding cubes (default: "var(--colorCyan)").
 *
 * Usage:
 * <FoldingLoader color="var(--colorBlue)" />
 */
export const FoldingLoader = ({ color }) => {
  const cssVariables = {
    "--color": color || "var(--colorCyan)",
  };
  return (
    <div className={styles.folding} style={cssVariables}>
      <div className={`${styles.skCube} ${styles.skCube1}`}></div>
      <div className={`${styles.skCube} ${styles.skCube2}`}></div>
      <div className={`${styles.skCube} ${styles.skCube4}`}></div>
      <div className={`${styles.skCube} ${styles.skCube3}`}></div>
    </div>
  );
};

/**
 * BounceLoader Component
 *
 * Displays three bouncing dots animation loader.
 *
 * Props:
 * @param {string} color - The color of the dots (default: "var(--colorCyan)").
 *
 * Usage:
 * <BounceLoader color="var(--colorGreen)" />
 */
export const BounceLoader = ({ color }) => {
  const cssVariables = {
    "--color": color || "var(--colorCyan)",
  };
  return (
    <div className={styles.bounce} style={cssVariables}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
};

/**
 * PulseLoader Component
 *
 * Displays a pulsing line chart animation loader using SVG polyline.
 *
 * Props:
 * @param {string} color - The color of the pulse line (default: "var(--colorCyan)").
 *
 * @example
 * Usage:
 * <PulseLoader color="var(--colorOrange)" />
 */
export const PulseLoader = ({ color }) => {
  const cssVariables = {
    "--color": color || "var(--colorCyan)",
  };
  return (
    <div className={styles.pulse} style={cssVariables}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        className={styles.svg}
      >
        <polyline
          fill="none"
          strokeWidth="3px"
          className={styles.polyline}
          points="2.4,58.7 70.8,58.7 76.1,46.2 81.1,58.7 89.9,58.7 93.8,66.5 102.8,22.7 110.6,78.7 115.3,58.7 126.4,58.7 134.4,54.7 142.4,58.7 197.8,58.7"
        />
      </svg>
    </div>
  );
};
