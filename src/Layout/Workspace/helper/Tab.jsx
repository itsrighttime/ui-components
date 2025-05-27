import { useState, useRef } from "react";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";
import styles from "../css/Navigator.module.css";
import { useOutsideClick } from "../../../Hooks/useOutsideClick";
import { DropdownSimple } from "../../../InputFields/Selectors/jsx/DropdownSimple";
import { useDynamicContent } from "../../../Context/jsx/DynamicContext";
import { workspaceKeys } from "./workspaceKeys";

export const Tab = ({ mykey, value, icon, onClick, color, dropdown }) => {
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

  const isSelected = mykey === activeTabKey;
  const isSpecial =
    mykey === workspaceKeys.workspaceName ||
    mykey === workspaceKeys.toggleFullscreen;

  const iconBtnClass = `${styles.iconBtn}  ${
    isSelected ? styles.isSelected : ""
  }`;
  const plainBtnClass = `${styles.plainBtn} ${
    isSpecial ? styles.isSpecial : ""
  } 
  ${isSelected ? styles.isSelected : ""}`;

  const handleClick = () => {
    if (dropdown?.length > 0) {
      setShowDropdown((prev) => !prev);
    } else {
      !isSelected && onClick?.(mykey);
    }
  };

  const handleDropdownSelect = (selectedKey) => {
    console.log(selectedKey)
    if (dropdownValue !== selectedKey) {
      onClick?.(selectedKey);
      setDropdownValue(selectedKey);
    }
    setShowDropdown(false);
  };

  return (
    <div className={styles.tabWithDropdown} ref={dropdownRef}>
      {icon ? (
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
