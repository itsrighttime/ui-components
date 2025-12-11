import { Footer } from "../../Footer/jsx/Footer.jsx";
import { Header } from "../../Header/jsx/Header.jsx";
import styles from "../css/WebStructure.module.css";

export const WebStructure = ({ children, brandFooter, brandHeader }) => {
  return (
    <div className={styles.webStructure}>
      <div className={styles.header}>
        <Header
          tabs={brandHeader?.tabs}
          logoURL={brandHeader?.logoURL}
          defaultTab={brandHeader?.defaultTab}
          breakpoint={brandHeader?.breakpoint}
          loginRegisterTabName={brandHeader?.loginRegisterTabName}
          loginRegisterURL={brandHeader?.loginRegisterURL}
          color={brandHeader?.color}
          brand={brandHeader?.brand}
        />
      </div>
      <div className={styles.top} id="body-layout-scroll">
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <Footer brands={brandFooter.brands} baseURLs={brandFooter.baseURLs} />
        </div>
      </div>
    </div>
  );
};
