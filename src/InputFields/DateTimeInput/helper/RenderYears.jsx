import styles from "../css/CalendarBox.module.css";

export const RenderYears = ({
  isSmall,
  startYear,
  endYear,
  handleYearClick,
  restrictionStartYear,
  restrictionEndYear,
}) => {

  const years = [];

  for (let i = startYear; i <= endYear; i++) {


    // Check if the year is within the restriction range
    const isWithinRange =
      (!restrictionStartYear || i >= restrictionStartYear) &&
      (!restrictionEndYear || i <= restrictionEndYear);

    years.push(
      <div
        key={i}
        className={`${styles.contentBox}  ${
          !isWithinRange ? styles.restrictedCells : ""
        }`}
        onClick={
          isWithinRange
            ? () => {
                handleYearClick(i);
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
        className={`${styles.calendar} ${isSmall ? styles.isSmall : ""} ${
          styles.gridOf4
        }`}
      >
        {years}
      </div>
    </div>
  );
};

export default RenderYears;
