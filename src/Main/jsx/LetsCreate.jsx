import React from "react";
import styles from "../css/LetsCreate.module.css";
import ActiveForms from "./ActiveForms";

export const LetsCreate = () => {
  return (
    <div className={styles.letsCreate}>
      <div className={styles.header}></div>
      <div className={styles.body}>
        <div className={styles.mainleftBar}></div>
        <div className={styles.formSection}>
          <div className={styles.section}>
            <div className={`${styles.active} ${styles.forms}`}>
              <ActiveForms />
            </div>
            <div className={`${styles.building} ${styles.forms}`}></div>
          </div>
          <div className={styles.section}>
            <div className={`${styles.inActive} ${styles.forms}`}></div>
            <div className={`${styles.schedule} ${styles.forms}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsCreate;
