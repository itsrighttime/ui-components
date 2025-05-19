import React from "react";
import styles from "../css/ActiveForms.module.css";
import ActiveInforCard from "./ActiveInforCard";

export const ActiveForms = () => {
  return (
    <div className={styles.activeForms}>
      <ActiveInforCard />
      <ActiveInforCard />
      <ActiveInforCard />
    </div>
  );
};

export default ActiveForms;
