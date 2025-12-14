import { useRef } from "react";
import styles from "../css/DropdownSimple.module.css";
import { useSmartPosition } from "../../../Hooks/useSmartPosition.js";

/**
 * `DropdownSimple` is a React component that renders a basic dropdown menu with custom items.
 * Each item can include a label, optional array of box values, and an optional description.
 * The dropdown position is dynamically adjusted using `useSmartPosition`.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - Array of dropdown items. Each item should have:
 *   @param {string|number} item.key - Unique key for the item.
 *   @param {string} item.value - Display label for the item.
 *   @param {Array<string>} [item.box] - Optional array of small labels to display alongside the main label.
 *   @param {string} [item.description] - Optional description text for the item.
 * @param {function} props.onSelect - Callback fired when an item is selected, receives `item.key` as argument.
 *
 * @example
 * <DropdownSimple
 *   items={[
 *     { key: 1, value: "Option 1", box: ["A", "B"], description: "Details about option 1" },
 *     { key: 2, value: "Option 2" }
 *   ]}
 *   onSelect={(key) => console.log("Selected:", key)}
 * />
 *
 * @returns {JSX.Element} A simple, customizable dropdown menu component.
 */
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
