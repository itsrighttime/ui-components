import styles from "../css/Navigator.module.css";
import { FlexContainer } from "../../Containers/jsx/FlexContainer";
import { Tab } from "./Tab";

export const Tabs = ({ tabs }) => {
  return (
    <FlexContainer className={styles.navigatorSection}>
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          value={tab.value}
          icon={tab.icon}
          onClick={tab.onClick}
          color={tab.color}
        />
      ))}
    </FlexContainer>
  );
};
