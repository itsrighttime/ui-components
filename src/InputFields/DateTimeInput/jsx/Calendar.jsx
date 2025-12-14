"use client";

import React, { useState, Suspense } from "react";
import styles from "../css/CalendarBox.module.css";
import { arrowLeftIcon, arrowRightIcon } from "../../../utils/icons.jsx";
import { convertStrDate2Date } from "../helper/handleDateChange.js";
import { isAfterDate } from "../helper/handleDateCompare.js";
import {
  canMoveNext,
  canMovePrev,
  getHeaderText,
  handleMonthSelection,
  handleNext,
  handlePrev,
  handleViewChange,
  handleYearSelection,
} from "../helper/helperCalnedar";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { Loading } from "../../../SpecialPages/js/Loading.jsx";

// // Dynamically import components
const RenderCalendar = React.lazy(() => import("../helper/RenderDates.jsx"));
const RenderMonths = React.lazy(() => import("../helper/RenderMonths.jsx"));
const RenderYears = React.lazy(() => import("../helper/RenderYears.jsx"));

/**
 * Calendar Component
 *
 * A versatile calendar component for selecting dates, months, or years.
 * Supports restrictions on selectable date ranges, small/compact display,
 * and different modes ("date", "month", "month-year", "year").
 * Uses lazy-loaded subcomponents for rendering calendar, months, and years.
 *
 * @component
 *
 * @param {Object} props - Props to configure the Calendar
 * @param {boolean} [props.isSmall=false] - If true, renders a compact calendar
 * @param {function} props.setResult - Callback to return selected value (date, month, or year)
 * @param {string} [props.color] - Custom color for calendar highlights and icons
 * @param {string|null} [props.restrictionStartDate=null] - Earliest selectable date in "dd-mm-yyyy" format
 * @param {string|null} [props.restrictionEndDate=null] - Latest selectable date in "dd-mm-yyyy" format
 * @param {string} [props.height="100%"] - Height of the calendar container
 * @param {string} [props.width="100%"] - Width of the calendar container
 * @param {string} [props.mode="date"] - Mode of selection: "date", "month", "month-year", or "year"
 *
 * @returns {JSX.Element} Rendered Calendar component
 *
 * @example
 * <Calendar
 *   isSmall={true}
 *   setResult={(value) => console.log(value)}
 *   color="#00bcd4"
 *   restrictionStartDate="01-01-2024"
 *   restrictionEndDate="31-12-2024"
 *   mode="month-year"
 * />
 *
 * @notes
 * - Internally uses lazy-loaded components for performance (`RenderCalendar`, `RenderMonths`, `RenderYears`)
 * - Automatically adjusts initial date based on restrictions
 * - Validates that `restrictionStartDate` <= `restrictionEndDate`
 * - Clicking the header toggles between views (calendar, months, years)
 * - Arrows navigate within allowed date range
 */

export const Calendar = ({
  isSmall = false,
  setResult,
  color,
  restrictionStartDate = null, // 05-05-2024
  restrictionEndDate = null,
  height = "100%",
  width = "100%",
  mode = "date", // "month-year" | "year" | "month" | "date"
}) => {
  // Convert string dates to Date objects
  if (restrictionStartDate)
    restrictionStartDate = convertStrDate2Date(restrictionStartDate);
  if (restrictionEndDate)
    restrictionEndDate = convertStrDate2Date(restrictionEndDate);

  if (
    restrictionStartDate &&
    restrictionEndDate &&
    isAfterDate(restrictionStartDate, restrictionEndDate)
  )
    throw new Error("Start Date must be before End Date");

  // Determine the initial date to render
  const getInitialDate = () => {
    const today = new Date();
    if (restrictionStartDate && restrictionEndDate)
      if (today < restrictionStartDate || today > restrictionEndDate) {
        const centralDate = new Date(
          (restrictionStartDate.getTime() + restrictionEndDate.getTime()) / 2
        );
        return centralDate;
      }
    return today;
  };

  const getInitialView = () => {
    switch (mode) {
      case "year":
        return "years";
      case "month":
      case "month-year":
        return "months";
      case "day":
      case "date":
      default:
        return "calendar";
    }
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate());
  const [view, setView] = useState(getInitialView()); // "date", "months", or "years"

  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--height": height,
    "--width": width,
  };

  return (
    <div
      className={`${styles.calendarBox} ${isSmall ? styles.isSmall : ""}`}
      style={cssVariable}
    >
      <div className={styles.calendarHeader}>
        {!restrictionStartDate ||
        canMovePrev(view, currentDate, restrictionStartDate) ? (
          <IconButton
            icon={arrowLeftIcon}
            onClick={() =>
              handlePrev(
                currentDate,
                setCurrentDate,
                restrictionStartDate,
                view
              )
            }
            color={color}
            label="Previous"
          />
        ) : (
          <div></div>
        )}

        <h2 onClick={() => handleViewChange(setView)}>
          {getHeaderText(currentDate, view)}
        </h2>
        {!restrictionEndDate ||
        canMoveNext(view, currentDate, restrictionEndDate) ? (
          <IconButton
            icon={arrowRightIcon}
            onClick={() =>
              handleNext(currentDate, setCurrentDate, restrictionEndDate, view)
            }
            color={color}
            label="Next"
          />
        ) : (
          <div></div>
        )}
      </div>

      <Suspense
        fallback={
          <Loading color={color} windowHeight="200px" windowWidth="100%" />
        }
      >
        {view === "calendar" && (
          <RenderCalendar
            isSmall={isSmall}
            date={currentDate}
            handleDateClick={setResult}
            restrictionStartDate={restrictionStartDate}
            restrictionEndDate={restrictionEndDate}
          />
        )}

        {view === "months" && (
          <RenderMonths
            isSmall={isSmall}
            year={currentDate.getFullYear()}
            handleMonthClick={(monthYear) => {
              const [month, year] = monthYear?.split("-");
              setCurrentDate(new Date(year, month, 1));

              if (mode === "month") {
                setResult(month); // return month only
              } else if (mode === "month-year") {
                setResult(`${month}-${year}`);
              } else {
                handleMonthSelection(monthYear, setCurrentDate, setView);
              }
            }}
            restrictionStartDate={restrictionStartDate}
            restrictionEndDate={restrictionEndDate}
          />
        )}

        {view === "years" && (
          <RenderYears
            isSmall={isSmall}
            startYear={currentDate.getFullYear() - 7}
            endYear={currentDate.getFullYear() + 8}
            handleYearClick={(year) => {
              setCurrentDate(new Date(year, 0, 1));
              if (mode === "year") {
                setResult(year); // return only year
              } else {
                handleYearSelection(year, setCurrentDate, setView);
              }
            }}
            restrictionStartYear={
              restrictionStartDate ? restrictionStartDate.getFullYear() : null
            }
            restrictionEndYear={
              restrictionEndDate ? restrictionEndDate.getFullYear() : null
            }
          />
        )}
      </Suspense>
    </div>
  );
};
