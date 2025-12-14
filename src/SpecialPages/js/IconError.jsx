import styles from "../css/IconError.module.css";

/**
 * IconError Component
 *
 * Displays an icon along with an error message. The size and dimensions of the container
 * and icon can be customized via props.
 *
 * Props:
 * @param {React.ReactNode} icon - The icon to display.
 * @param {string} messgae - The error message to display below the icon. (Note: 'messgae' is likely a typo; should be 'message')
 * @param {string} height - Height of the container (default: "100%").
 * @param {string} width - Width of the container (default: "100%").
 * @param {number} size - Size of the icon in `rem` units (default: 2).
 *
 * Features:
 * - Uses CSS variables for dynamic sizing of container and icon.
 * - Displays the icon centered with the message below.
 * - Fully styled using `IconError.module.css`.
 *
 * @example
 * Usage:
 * <IconError
 *    icon={<SomeSvgIcon />}
 *    messgae="Something went wrong!"
 *    height="150px"
 *    width="150px"
 *    size={3}
 * />
 */

export const IconError = ({
  icon,
  messgae,
  height = "100%",
  width = "100%",
  size = 2,
}) => {
  const cssVariable = {
    "--iconSize": `${size}rem`,
    "--height": height,
    "--width": width,
  };
  return (
    <div className={styles.container} style={cssVariable}>
      {/* <IconButton icon={icon} size={size} /> */}
      <div className={styles.icon}>{icon}</div>
      <p>{messgae}</p>
    </div>
  );
};
