import { useEffect, useRef, useState } from "react";
import { Calendar } from "./Calendar"; // Assuming Calendar is your existing component
import styles from "../css/DatePicker.module.css";
import { getCommonCssVariables } from "../../helper/getCommonCssVariables";

export const DatePicker = ({
  label,
  initialDate = null,
  restrictionStartDate = null,
  restrictionEndDate = null,
  color,
  setResult,
  isSmall = true,
  isBorder = false,
  width = "200px",
  mode = "date", // "month-year" | "year" | "month" | "date"
  required = false,
}) => {
  const _label = label || "Select a Date";

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    initialDate === null ? _label : initialDate
  );

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setResult(date);
    setIsOpen(false); // Close the calendar after a date is selected
  };

  const pickerRef = useRef(null);

  useEffect(() => {
    if (initialDate !== null && selectedDate === _label)
      setSelectedDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  const cssVariable = {
    ...getCommonCssVariables(isBorder, color, width),
  };
  return (
    <div className={styles.datePicker} ref={pickerRef} style={cssVariable}>
      {required && <p className={styles.required}>*</p>}
      <div className={styles.dateInput} onClick={() => setIsOpen(true)}>
        {selectedDate}
      </div>
      {isOpen && (
        <div className={styles.calendar}>
          <Calendar
            isSmall={isSmall}
            setResult={handleDateClick}
            color={color}
            restrictionStartDate={restrictionStartDate}
            restrictionEndDate={restrictionEndDate}
            mode={mode}
          />
        </div>
      )}
    </div>
  );
};
