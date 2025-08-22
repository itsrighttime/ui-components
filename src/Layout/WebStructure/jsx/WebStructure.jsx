import { Footer } from "../../Footer/jsx/Footer";
import { Header } from "../../Header/jsx/Header";
import styles from "../css/WebStructure.module.css";

export const WebStructure = ({ children, brandFooter, headerTabs }) => {
  return (
    <div className={styles.webStructure}>
      <div className={styles.header}>
        <Header tabs={headerTabs} />
      </div>
      <div className={styles.top}>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <Footer brand={brandFooter} />
        </div>
      </div>
    </div>
  );
};
