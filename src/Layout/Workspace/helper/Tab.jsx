import { useState, useRef } from "react";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";
import styles from "../css/Navigator.module.css";
import { useOutsideClick } from "../../../Hooks/useOutsideClick";
import { DropdownSimple } from "../../../InputFields/Selectors/jsx/DropdownSimple";

export const Tab = ({ mykey, value, icon, onClick, color, dropdown }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  if (!onClick) {
    console.warn(
      `You have not passed the onClick for tab "${value}" (key: ${mykey}). Kindly pass onClick.`
    );
  }

  const handleClick = () => {
    if (dropdown?.length > 0) {
      setShowDropdown((prev) => !prev);
    } else {
      onClick?.(mykey);
    }
  };

  const handleDropdownSelect = (selectedKey) => {
    onClick?.(selectedKey);
    setShowDropdown(false);
  };

  const isSpecial = mykey === "workspaceName" || mykey === "toggleFullscreen";

  return (
    <div className={styles.tabWithDropdown} ref={dropdownRef}>
      {icon ? (
        <IconButton
          icon={icon}
          label={value}
          color={mykey === "toggleFullscreen" ? "#ff5969" : color}
          size={1.2}
          onClick={handleClick}
        />
      ) : (
        <PlainButton
          text={value}
          onClick={handleClick}
          color={color}
          style={
            isSpecial
              ? {
                  textDecoration: "none",
                  color: "var(--colorRed)",
                  fontWeight: "700",
                }
              : {}
          }
        />
      )}

      {showDropdown && dropdown?.length > 0 && (
        <DropdownSimple items={dropdown} onSelect={handleDropdownSelect} />
      )}
    </div>
  );
};
