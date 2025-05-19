import React from "react";
import styles from "../css/PropsCss.module.css";
import DatePicker from "../../InputFields/DateTimeInput/jsx/DatePicker";

const DatePickerProp = ({
  label,
  initialDate = null,
  restrictionStartDate = null,
  restrictionEndDate = null,
  color,
  setResult,
}) => {
  return (
    <div className={styles.datePickerProp}>
      <DatePicker
        label={label}
        initialDate={initialDate}
        restrictionStartDate={restrictionStartDate}
        restrictionEndDate={restrictionEndDate}
        setResult={setResult}
        color={color}
        isSmall
        isBorder={true}
      />
    </div>
  );
};

export default DatePickerProp;
