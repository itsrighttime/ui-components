"use client";

import { useState } from "react";
import styles from "../css/CalendarBox.module.css";

export const RenderCalendar = ({
  isSmall,
  date,
  handleDateClick,
  restrictionStartDate,
  restrictionEndDate,
}) => {
  const [clicked, setClicked] = useState(new Date());

  const calendarDates = [];
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarDates.push(
      <div key={`empty-${i}`} className={styles.emptyBox}></div>
    );
  }

  const formateDate = (date) =>
    `${date.getDate().toString().padStart(2, "0")}-${date
      .getMonth()
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

  for (let i = 1; i <= lastDate; i++) {
    const cellDate = new Date(year, month, i);
    const isClicked = cellDate.toDateString() === clicked.toDateString();

    // Check if cellDate is within the restriction range
    const isWithinRange =
      (!restrictionStartDate || cellDate >= restrictionStartDate) &&
      (!restrictionEndDate || cellDate <= restrictionEndDate);

    calendarDates.push(
      <div
        key={i}
        className={`${styles.contentBox} ${
          isClicked && isWithinRange ? styles.currentCell : ""
        } ${!isWithinRange ? styles.restrictedCells : ""}`}
        onClick={
          isWithinRange
            ? () => {
                handleDateClick(formateDate(cellDate));
                setClicked(cellDate);
              }
            : undefined
        }
      >
        {i}
      </div>
    );
  }

  return (
    <div className={`${styles.calendarBody} ${isSmall ? styles.isSmall : ""}`}>
      <div
        className={`${styles.calendarDays}  ${isSmall ? styles.isSmall : ""}`}
      >
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className={`${styles.calendar}  ${isSmall ? styles.isSmall : ""}`}>
        {calendarDates}
      </div>
    </div>
  );
};

export default RenderCalendar;
