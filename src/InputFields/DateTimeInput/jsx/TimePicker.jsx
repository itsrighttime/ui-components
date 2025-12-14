import { useState } from "react";
import styles from "../css/TimePicker.module.css";
import { CustomDropdown } from "../helper/CustomDropdown.jsx";
import { useEffect } from "react";

/**
 * TimePicker Component
 *
 * A reusable time picker input that allows users to select hours, minutes,
 * and period (AM/PM) using dropdowns. Provides formatted time to parent component
 * via the `setResult` callback.
 *
 * @component
 *
 * @param {Object} props - Props to configure the TimePicker
 * @param {string} props.label - Label for the time input
 * @param {string} [props.value="--:-- --"] - Initial time value in "hh:mm AM/PM" format
 * @param {function} props.setResult - Callback function that receives the formatted time
 * @param {string} [props.color] - Custom color for the dropdowns
 * @param {string} [props.width="200px"] - Maximum width of the TimePicker
 * @param {boolean} [props.required=false] - If true, marks the field as required
 *
 * @returns {JSX.Element} Rendered TimePicker component
 *
 * @example
 * <TimePicker
 *   label="Select Time"
 *   value="08:30 AM"
 *   setResult={(time) => console.log(time)}
 *   color="#00bcd4"
 *   width="250px"
 *   required={true}
 * />
 *
 * @notes
 * - Splits the time value into hours, minutes, and period for independent selection
 * - Updates parent component with formatted time once all fields are selected
 * - Uses `CustomDropdown` for each selector
 */

export const TimePicker = ({
  label,
  value = "--:-- --",
  setResult,
  color,
  width = "200px",
  required = false,
}) => {
  const [_time, _period] = value.split(" ");
  const [_hour, _minute] = _time.split(":");

  const [hours, setHours] = useState(_hour);
  const [minutes, setMinutes] = useState(_minute);
  const [period, setPeriod] = useState(_period);

  // console.log("DDDD", value)

  useEffect(() => {
    const [_time, _p] = value.split(" ");
    const [_h, _m] = _time.split(":");
    setHours(_h || "--");
    setMinutes(_m || "--");
    setPeriod(_p || "--");
  }, [value]);

  const handleHoursChange = (value) => {
    setHours(value);
    notifyTimeChange(value, minutes, period);
  };

  const handleMinutesChange = (value) => {
    setMinutes(value);
    notifyTimeChange(hours, value, period);
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
    notifyTimeChange(hours, minutes, value);
  };

  const notifyTimeChange = (hours, minutes, period) => {
    if (hours !== "--" && minutes !== "--" && period !== "--") {
      const formattedTime = `${hours}:${minutes} ${period}`;
      setResult(formattedTime);
    }
  };

  const hoursOptions = [...Array(12).keys()].map((h) =>
    String(h + 1).padStart(2, "0")
  );
  const minutesOptions = [...Array(60).keys()].map((m) =>
    String(m).padStart(2, "0")
  );
  const periodOptions = ["AM", "PM"];

  return (
    <div className={styles.timeInputContainer} style={{ maxWidth: width }}>
      {label && <label className={styles.label}>{label}</label>}
      {required && <p className={styles.required}>*</p>}

      <div className={styles.timeSelectors}>
        <CustomDropdown
          options={hoursOptions}
          value={hours}
          onChange={handleHoursChange}
          color={color}
        />
        <span>
          <b>:</b>
        </span>
        <CustomDropdown
          options={minutesOptions}
          value={minutes}
          onChange={handleMinutesChange}
          color={color}
        />
        <CustomDropdown
          options={periodOptions}
          value={period}
          onChange={handlePeriodChange}
          color={color}
        />
      </div>
    </div>
  );
};
