import { useLayoutEffect, useRef, useState } from "react";
import styles from "../css/Navigator.module.css";
import { FlexContainer } from "../../Containers/jsx/FlexContainer";
import { Tab } from "./Tab";
import { DropdownSimple } from "../../../InputFields/Selectors/jsx/DropdownSimple";
import { toCSSValue } from "../../Containers/helper/toCSSValue";

export const Tabs = ({ tabs, direction }) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [visibleTabs, setVisibleTabs] = useState(tabs);
  const [overflowTabs, setOverflowTabs] = useState([]);

  const calculateTabs = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerSize =
      direction === "row" ? container.offsetWidth : container.offsetHeight;

    let usedSize = 0;
    const newVisible = [];
    const newOverflow = [];

    tabs.forEach((tab, index) => {
      const el = itemRefs.current[index];
      if (!el) return;

      const itemSize = direction === "row" ? el.offsetWidth : el.offsetHeight;

      if (usedSize + itemSize < containerSize - 80) {
        usedSize += itemSize;
        newVisible.push(tab);
      } else {
        newOverflow.push(tab);
      }
    });

    setVisibleTabs(newVisible);
    setOverflowTabs(newOverflow);
  };

  useLayoutEffect(() => {
    calculateTabs(); // initial calculation

    const handleResize = () => {
      // Wait for DOM reflow
      setTimeout(() => {
        calculateTabs();
      }, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tabs, direction]);

  return (
    <FlexContainer
      flexRef={containerRef}
      direction={direction}
      justify="center"
      align="center"
      className={styles.navigatorSection}
    >
      {visibleTabs.map((tab, i) => (
        <Tab
          tabRef={(el) => (itemRefs.current[i] = el)}
          key={tab.key}
          mykey={tab.key}
          value={tab.value}
          icon={tab.icon}
          onClick={tab.onClick}
          color={tab.color}
          dropdown={tab.dropdown}
        />
      ))}
    </FlexContainer>
  );
};
