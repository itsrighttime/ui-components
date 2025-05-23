import { useEffect, useRef, useState } from "react";
import { Calendar } from "./Calendar"; // Assuming Calendar is your existing component
import styles from "../css/DatePicker.module.css";

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
}) => {
  const [selectedDate, setSelectedDate] = useState(
    initialDate === null ? label || "Select a Date" : initialDate
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setResult(date);
    setIsOpen(false); // Close the calendar after a date is selected
  };

  const pickerRef = useRef(null);

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
          />
        </div>
      )}
    </div>
  );
};
