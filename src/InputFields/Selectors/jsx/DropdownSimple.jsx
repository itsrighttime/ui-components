import { useRef } from "react";
import styles from "../css/DropdownSimple.module.css";
import { useSmartPosition } from "../../../Hooks/useSmartPosition";

export const DropdownSimple = ({ items, onSelect }) => {
  const dropdownRef = useRef(null);
  const position = useSmartPosition(dropdownRef);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdownMenu} ${
        position.vertical === "top" ? styles.dropTop : styles.dropBottom
      } ${
        position.horizontal === "left" ? styles.alignLeft : styles.alignRight
      }`}
    >
      {items.map((item) => (
        <div
          key={item.key}
          className={styles.dropdownItem}
          onClick={() => onSelect?.(item.key)}
        >
          <div className={styles.dropdownItemLabelBox}>
            <div className={styles.dropdownItemLabel}>{item.value}</div>
            {Array.isArray(item.box) &&
              item.box.map((b, i) =>
                b ? (
                  <span key={i} className={styles.boxValue}>
                    {b}
                  </span>
                ) : null
              )}
          </div>
          {item.description && (
            <div className={styles.dropdownItemDescription}>
              {item.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
