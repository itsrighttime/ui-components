"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar } from "./Calendar.jsx"; // Assuming Calendar is your existing component
import styles from "../css/DatePicker.module.css";
import { getCommonCssVariables } from "../../helper/getCommonCssVariables.js";

/**
 * DatePicker Component
 *
 * A reusable date picker input that allows users to select a date, month, or year
 * using the Calendar component. Supports restricted date ranges, custom colors,
 * small/compact display, and optional border styling.
 *
 * @component
 *
 * @param {Object} props - Props to configure the DatePicker
 * @param {string} props.label - Label for the input field
 * @param {string|null} [props.initialDate=null] - Initial selected date or value
 * @param {string|null} [props.restrictionStartDate=null] - Earliest selectable date in "dd-mm-yyyy" format
 * @param {string|null} [props.restrictionEndDate=null] - Latest selectable date in "dd-mm-yyyy" format
 * @param {string} [props.color] - Custom color for calendar and input highlights
 * @param {function} props.setResult - Callback to return selected value
 * @param {boolean} [props.isSmall=true] - If true, renders a compact calendar
 * @param {boolean} [props.isBorder=false] - If true, displays a border around the input
 * @param {string} [props.width="200px"] - Width of the date picker input
 * @param {string} [props.mode="date"] - Mode of selection: "date", "month", "month-year", or "year"
 * @param {boolean} [props.required=false] - If true, marks the field as required
 *
 * @returns {JSX.Element} Rendered DatePicker component
 *
 * @example
 * <DatePicker
 *   label="Select Date"
 *   initialDate="12-12-2024"
 *   restrictionStartDate="01-01-2024"
 *   restrictionEndDate="31-12-2024"
 *   color="#00bcd4"
 *   setResult={(value) => console.log(value)}
 *   isSmall={false}
 *   isBorder={true}
 *   width="250px"
 *   mode="month-year"
 *   required={true}
 * />
 *
 * @notes
 * - Clicking outside the picker closes the calendar popup
 * - The selected value is displayed in the input field
 * - Works in combination with the Calendar component for different selection modes
 */
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
