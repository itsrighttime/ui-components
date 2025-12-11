import { Calendar } from "../../InputFields/DateTimeInput/jsx/Calendar.jsx";
import { DatePicker } from "../../InputFields/DateTimeInput/jsx/DatePicker.jsx";
import { TimePicker } from "../../InputFields/DateTimeInput/jsx/TimePicker.jsx";

export const UseDateTimeExample = () => {
  return (
    <div
      style={{ display: "flex", gap: "20px", width: "100%", height: "100%" }}
    >
      {/* <Calendar
        setResult={(value) => {
          console.log(value);
        }}
        isSmall
      /> */}
      <DatePicker width="300px" />
      <TimePicker />
    </div>
  );
};
