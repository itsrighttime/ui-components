import { useState, useRef } from "react";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";
import styles from "../css/Navigator.module.css";
import { useOutsideClick } from "../../../Hooks/useOutsideClick";
import { DropdownSimple } from "../../../InputFields/Selectors/jsx/DropdownSimple";
import { useDynamicContent } from "../../../Context/jsx/DynamicContext";
import { workspaceKeys } from "./workspaceKeys";
import { getProductLogo } from "../../../assets/productsLogo/productLogo.assets";

export const Tab = ({
  tabRef,
  mykey,
  value,
  icon,
  onClick,
  color,
  dropdown,
  extra,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const dropdownRef = useRef(null);
  const { getValue } = useDynamicContent();

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  const activeTabKey = getValue(workspaceKeys.tabClickedKey);

  if (!onClick) {
    console.warn(
      `You have not passed the onClick for tab "${value}" (key: ${mykey}). Kindly pass onClick.`
    );
  }

  // Check if this tab or one of its dropdown items is active
  const isSelected = dropdown?.length
    ? dropdown.some((item) => item.key === activeTabKey)
    : mykey === activeTabKey;

  const isSpecial =
    mykey === workspaceKeys.workspaceName ||
    mykey === workspaceKeys.toggleFullscreen;

  const iconBtnClass = `${styles.iconBtn} ${
    isSelected ? styles.isSelected : ""
  }`;

  const plainBtnClass = `${styles.plainBtn} ${
    isSpecial ? styles.isSpecial : ""
  } ${isSelected ? styles.isSelected : ""}`;

  const handleClick = () => {
    if (dropdown?.length) {
      setShowDropdown((prev) => !prev);
    } else if (!isSelected) {
      onClick?.(mykey);
    }
  };

  const handleDropdownSelect = (selectedKey) => {
    if (selectedKey !== dropdownValue) {
      onClick?.(selectedKey);
      setDropdownValue(selectedKey);
    }
    setShowDropdown(false);
  };

  const cssVariable = {
    "--colorSpecial":
      extra?.total === 0 ? color || "var(--colorCyan)" : "var(--colorRed)",
    "--colorSpecialBg": "",
  };

  return (
    <div
      className={styles.tabWithDropdown}
      ref={(el) => {
        dropdownRef.current = el;
        if (typeof tabRef === "function") tabRef(el);
        else if (tabRef) tabRef.current = el;
      }}
      style={cssVariable}
    >
      {mykey === workspaceKeys.notification ? (
        <div className={iconBtnClass}>
          <div className={styles.notification} onClick={handleClick}>
            <p>{extra.total}</p>
            <IconButton icon={icon} label={value} color={color} size={1.2} />
          </div>
        </div>
      ) : icon ? (
        <div className={iconBtnClass}>
          <IconButton
            icon={icon}
            label={value}
            color={mykey === workspaceKeys.toggleFullscreen ? "#ff5969" : color}
            size={1.2}
            onClick={handleClick}
          />
        </div>
      ) : (
        <div className={plainBtnClass}>
          <PlainButton text={value} onClick={handleClick} color={color} />
        </div>
      )}

      {showDropdown && dropdown?.length > 0 && (
        <DropdownSimple items={dropdown} onSelect={handleDropdownSelect} />
      )}
    </div>
  );
};
