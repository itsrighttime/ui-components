import styles from "../css/CalendarBox.module.css";

export const RenderMonths = ({
  isSmall,
  year,
  handleMonthClick,
  restrictionStartDate,
  restrictionEndDate,
}) => {

  const months = [];

  const formateMonth = (month, year) =>
    `${month.toString().padStart(2, "0")}-${year}`;

  for (let i = 0; i < 12; i++) {
    const cellDate = new Date(year, i, 1);
   
    // Adjusted logic to check if the entire month is within the restriction range
    const startMonthCondition =
      !restrictionStartDate ||
      year > restrictionStartDate.getFullYear() ||
      (year === restrictionStartDate.getFullYear() &&
        i >= restrictionStartDate.getMonth());

    const endMonthCondition =
      !restrictionEndDate ||
      year < restrictionEndDate.getFullYear() ||
      (year === restrictionEndDate.getFullYear() &&
        i <= restrictionEndDate.getMonth());

    const isWithinRange = startMonthCondition && endMonthCondition;

    months.push(
      <div
        key={i}
        className={`${styles.contentBox} ${
          !isWithinRange ? styles.restrictedCells : ""
        }`}
        onClick={
          isWithinRange
            ? () => {
                handleMonthClick(formateMonth(i, year));
              }
            : undefined
        }
      >
        {cellDate.toLocaleString("default", { month: "short" })}
      </div>
    );
  }

  return (
    <div className={`${styles.calendarBody} ${isSmall ? styles.isSmall : ""}`}>
      <div
        className={`${styles.calendar} ${styles.gridOf4} ${
          isSmall ? styles.isSmall : ""
        }`}
      >
        {months}
      </div>
    </div>
  );
};

export default RenderMonths;
