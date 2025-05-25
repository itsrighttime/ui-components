import { FlexContainer } from "../../Containers/jsx/FlexContainer";
import styles from "../css/VerticalNav.module.css";

export const VerticalNav = ({ tabs = { left: {}, mid: {}, right: {} } }) => {
  return (
    <FlexContainer>
      <FlexContainer
        className={styles.verticalNav}
        direction="column"
        gap="0.5rem"
      >
        {Object.entries(tabs.left).map(([key, value]) => (
          <div key={key} className={styles.navItem}>
            {value}
          </div>
        ))}
      </FlexContainer>

      <FlexContainer
        className={styles.verticalNav}
        direction="column"
        gap="0.5rem"
      >
        {Object.entries(tabs.mid).map(([key, value]) => (
          <div key={key} className={styles.navItem}>
            {value}
          </div>
        ))}
      </FlexContainer>

      <FlexContainer
        className={styles.verticalNav}
        direction="column"
        gap="0.5rem"
      >
        {Object.entries(tabs.right).map(([key, value]) => (
          <div key={key} className={styles.navItem}>
            {value}
          </div>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};
