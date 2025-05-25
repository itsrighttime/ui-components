import styles from "../css/Navigator.module.css";
import { FlexContainer } from "../../Containers/jsx/FlexContainer";
import { Tab } from "./Tab";

export const Tabs = ({ tabs, direction }) => {
  return (
    <FlexContainer
      direction={direction}
      justify="center"
      align="center"
      className={styles.navigatorSection}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          mykey={tab.key}
          value={tab.value}
          icon={tab.icon}
          onClick={tab.onClick}
          color={tab.color}
        />
      ))}
    </FlexContainer>
  );
};
