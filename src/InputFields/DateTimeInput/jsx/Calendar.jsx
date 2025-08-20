import React, { useState, Suspense } from "react";
import styles from "../css/CalendarBox.module.css";
import { arrowLeftIcon, arrowRightIcon } from "../../../utils/icons";
import { convertStrDate2Date } from "../helper/handleDateChange";
import { isAfterDate } from "../helper/handleDateCompare";
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
import { IconButton } from "../../Actions/jsx/IconButton";
import { Loading } from "../../../SpecialPages/js/Loading";

// // Dynamically import components
const RenderCalendar = React.lazy(() => import("../helper/RenderDates"));
const RenderMonths = React.lazy(() => import("../helper/RenderMonths"));
const RenderYears = React.lazy(() => import("../helper/RenderYears"));

export const Calendar = ({
  isSmall = false,
  setResult,
  color,
  restrictionStartDate = null, // 05-05-2024
  restrictionEndDate = null,
  height = "100%",
  width = "100%",
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

  const [currentDate, setCurrentDate] = useState(getInitialDate());
  const [view, setView] = useState("calendar"); // "calendar", "months", or "years"

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
          <Loading color={color} windowHeight="100%" windowWidth="100%" />
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
            handleMonthClick={(monthYear) =>
              handleMonthSelection(monthYear, setCurrentDate, setView)
            }
            restrictionStartDate={restrictionStartDate}
            restrictionEndDate={restrictionEndDate}
          />
        )}

        {view === "years" && (
          <RenderYears
            isSmall={isSmall}
            startYear={currentDate.getFullYear() - 7}
            endYear={currentDate.getFullYear() + 8}
            handleYearClick={(year) =>
              handleYearSelection(year, setCurrentDate, setView)
            }
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
