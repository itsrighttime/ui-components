import { FlexContainer } from "../../Containers/jsx/FlexContainer";
import styles from "../css/Navigator.module.css";
import { Tabs } from "../helper/Tabs";
import { validateTabsIcons } from "../helper/validateTabsIcons";

export const Navigator = ({
  direction = "row", // "row", "column"
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
  validateTabsIcons(tabs, direction);

  return (
    <FlexContainer
      direction={direction}
      justify="between"
      className={styles.navigator}
    >
      <Tabs tabs={tabs.left} />
      <Tabs tabs={tabs.mid} />
      <Tabs tabs={tabs.right} />
    </FlexContainer>
  );
};
