import { FlexContainer } from "../../Containers/jsx/FlexContainer.jsx";
import styles from "../css/Navigator.module.css";
import { Tabs } from "../helper/Tabs.jsx";
import { validateTabsIcons } from "../helper/validateTabsIcons.js";
import { workspaceLayoutKeys } from "../helper/workspaceLayoutKeys.js";

const { POSITIONS } = workspaceLayoutKeys;

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
