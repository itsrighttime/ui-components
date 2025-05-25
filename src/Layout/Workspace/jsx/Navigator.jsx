import { FlexContainer } from "../../Containers/jsx/FlexContainer";
import styles from "../css/Navigator.module.css";
import { Tabs } from "../helper/Tabs";

export const Navigator = ({
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
  return (
    <FlexContainer justify="between" className={styles.navigator}>
      <Tabs tabs={tabs.left} />
      <Tabs tabs={tabs.mid} />
      <Tabs tabs={tabs.right} />
    </FlexContainer>
  );
};
