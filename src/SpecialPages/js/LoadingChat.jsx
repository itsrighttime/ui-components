import styles from "../css/LoadingChat.module.css";

/**
 * LoadingChat Component
 *
 * Displays an animated "gooey" blob loader, typically used to indicate
 * a chat or messaging interface is loading or processing.
 *
 * Props:
 * @param {string} color - The color of the animated blobs (default: "var(--colorCyan)").
 * @param {string} height - The height of the loader container (default: "100%").
 * @param {string} width - The width of the loader container (default: "100%").
 *
 * Features:
 * - Uses multiple divs styled with CSS to create animated blobs.
 * - Includes an SVG filter for a "gooey" merging effect.
 * - Fully responsive through CSS variables.
 *
 * @example
 * Usage:
 * <LoadingChat color="var(--colorRed)" height="50px" width="150px" />
 */
export const LoadingChat = ({ color, height = "100%", width = "100%" }) => {
  const cssVariables = {
    "--color": color || "var(--colorCyan)",
    "--height": height,
    "--width": width,
  };
  return (
    <div className={styles.blobs} style={cssVariables}>
      <div className={styles.blobCenter}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: "none" }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
