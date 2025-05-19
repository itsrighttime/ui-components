// handleDateChange.js

const updateDate = (currentDate, change, period) => {
  const newDate = new Date(currentDate);
  if (period === "month") {
    newDate.setMonth(newDate.getMonth() + change);
  } else if (period === "year") {
    newDate.setFullYear(newDate.getFullYear() + change);
  }
  return new Date(newDate.getFullYear(), newDate.getMonth(), 1); // Always set to the start of the month
};

export const convertStrDate2Date = (strDate) => {
  const [day, month, year] = strDate.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const handleDateChange = (
  currentDate,
  setCurrentDate,
  change,
  period = "month",
  restrictionDate = null
) => {
  let newDate = updateDate(currentDate, change, period);

  if (restrictionDate) {
    // Convert restrictionDate to start of the month for month period
    const restriction = new Date(
      restrictionDate.getFullYear(),
      restrictionDate.getMonth(),
      1
    );

    if (period === "month") {
      if (change > 0 && newDate <= restriction) {
        setCurrentDate(newDate);
      } else if (change < 0 && newDate >= restriction) {
        setCurrentDate(newDate);
      }
    } else if (period === "year") {
      if (change > 0 && newDate <= restriction) {
        setCurrentDate(newDate);
      } else if (change < 0 && newDate >= restriction) {
        setCurrentDate(newDate);
      }
    }
    // setCurrentDate(newDate);
  } else {
    setCurrentDate(newDate);
  }
};

// // Use Case for Months
// handleDateChange(currentDate, setCurrentDate, 1, "month"); // To go to the next month
// handleDateChange(currentDate, setCurrentDate, -1, "month"); // To go to the previous month
// handleDateChange(currentDate, setCurrentDate, 1, "month", new Date()); // To go to the next month with restriction
// handleDateChange(currentDate, setCurrentDate, -1, "month", new Date()); // To go to the previous month with restriction

// // Use Case for Year
// handleDateChange(currentDate, setCurrentDate, 1, "year"); // To go to the next year
// handleDateChange(currentDate, setCurrentDate, -1, "year"); // To go to the previous year
// handleDateChange(currentDate, setCurrentDate, 1, "year", new Date()); // To go to the next year with restriction
// handleDateChange(currentDate, setCurrentDate, -1, "year", new Date()); // To go to the previous year with restriction
