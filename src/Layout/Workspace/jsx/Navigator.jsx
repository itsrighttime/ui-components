"use client";

import { FlexContainer } from "../../Containers/jsx/FlexContainer.jsx";
import styles from "../css/Navigator.module.css";
import { Tabs } from "../helper/Tabs.jsx";
import { validateTabsIcons } from "../helper/validateTabsIcons.js";
import { workspaceLayoutKeys } from "../helper/workspaceLayoutKeys.js";

const { POSITIONS } = workspaceLayoutKeys;
/**
 * Navigator Component
 *
 * Renders a navigational bar with tabs, supporting both row and column layouts.
 *
 * Props:
 * @param {object} style - Custom CSS styles applied to the navigator container.
 * @param {"row"|"column"} direction - Layout direction of the navigator. Default is "row".
 * @param {string} size - Size of the navigator (height if row, width if column). Default is "35px".
 * @param {object} tabs - Tabs to render in the navigator, structured by position:
 *   {
 *     left: [{ key, value, icon, onClick }],
 *     mid: [{ key, value, icon, onClick }],
 *     right: [{ key, value, icon, onClick }]
 *   }
 *
 * Behavior:
 * - Validates that each tab has an icon using `validateTabsIcons`.
 * - Maps tabs to three positions: start/center/end for rendering.
 * - Uses `FlexContainer` to arrange tabs according to the specified direction and size.
 * - Each tab is rendered via the `Tabs` component.
 * - Returns an empty fragment if no tabs are provided.
 */

export const Navigator = ({
  style,
  direction = "row", // "row", "column"
  size = "35px",
  tabs = {
    left: [
      {
        key: "",
        value: "",
        icon: null,
        onClick: () => {},
      },
    ],
    mid: [{ key: "", value: "", icon: null }],
    right: [{ key: "", value: "", icon: null }],
  },
}) => {
  if (!tabs) return <></>;

  validateTabsIcons(tabs, direction);

  const customStyle = {
    height: direction === "column" ? "100%" : size,
    width: direction === "column" ? size : "100%",
    ...style,
  };

  return (
    <FlexContainer
      direction={direction}
      justify="between"
      className={styles.navigator}
      style={customStyle}
    >
      <Tabs direction={direction} tabs={tabs[POSITIONS.start]} />
      <Tabs direction={direction} tabs={tabs[POSITIONS.center]} />
      <Tabs direction={direction} tabs={tabs[POSITIONS.end]} />
    </FlexContainer>
  );
};
