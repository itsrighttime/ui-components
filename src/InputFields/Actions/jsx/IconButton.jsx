import { Tooltip } from "../../../ExtraThings/js/Tooltip";
import styles from "../css/IconButton.module.css";

/**
 * An icon-based button with optional tooltip.
 *
 * @component
 * @param {JSX.Element} icon - Icon element to render inside the button.
 * @param {Function} onClick - Function to execute when clicked.
 * @param {string} color - Icon color.
 * @param {Object} style - Inline styles to override or extend.
 * @param {string|number} size - Scaling factor for icon size.
 * @param {string|null} label - Tooltip text shown on hover.
 *
 * @example
 * <IconButton icon={<FaEdit />} label="Edit" onClick={() => alert('Edit')} />
 */

export const IconButton = ({
  icon,
  onClick,
  color = "#52C9BD",
  style = {},
  size = "1",
  label = null,
  isBorder = false,
}) => {
  const colorStyle = {
    "--iconColor": color,
    "--iconSize": `calc(var(--size) * ${size})`,
    "--border": isBorder ? `1px solid ${color}` : "none",
  };

  return (
    <div className={styles.iconButton} style={colorStyle}>
      <Tooltip content={label}>
        <button
          type="button"
          className={`${styles.btn}`}
          onClick={onClick}
          style={{ ...style, ...colorStyle }}
        >
          {icon}
        </button>
      </Tooltip>
    </div>
  );
};
