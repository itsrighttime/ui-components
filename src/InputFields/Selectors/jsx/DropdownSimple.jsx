import { useEffect, useRef, useState } from "react";
import styles from "../css/DropdownSimple.module.css";

export const DropdownSimple = ({ items, onSelect }) => {
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({
    vertical: "bottom",
    horizontal: "right",
  });

  useEffect(() => {
    const checkPosition = () => {
      const el = dropdownRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const dropdownWidth = el.offsetWidth;
      const dropdownHeight = el.offsetHeight;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      const spaceRight = viewportWidth - rect.right;
      const spaceLeft = rect.left;

      const willOverflowBottom = spaceBelow < dropdownHeight;
      const canFlipTop = spaceAbove >= dropdownHeight;

      const willOverflowRight = spaceRight < dropdownWidth;
      const canAlignLeft = spaceLeft >= dropdownWidth;

      setPosition({
        vertical: willOverflowBottom && canFlipTop ? "top" : "bottom",
        horizontal: willOverflowRight && canAlignLeft ? "left" : "right",
      });
    };

    checkPosition();
    window.addEventListener("resize", checkPosition);
    return () => window.removeEventListener("resize", checkPosition);
  }, []);

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
          onClick={() => onSelect(item.key)}
        >
          <div className={styles.dropdownItemLabel}>{item.value}</div>
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
