import styles from "../css/IconError.module.css";

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
