import { handleDateChange } from "./handleDateChange.js";
import { isAfterDate, isBeforeDate } from "./handleDateCompare.js";

// New function to get header text based on the current view
export const getHeaderText = (currentDate, view,) => {
    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    if (view === "calendar") {
        return `${monthName.substring(0, 3)} ${year}`;
    } else if (view === "months") {
        return `${year}`;
    } else if (view === "years") {
        const startYear = year - 7;
        const endYear = year + 8;
        return `${startYear} - ${endYear}`;
    }
};

export const handlePrev = (currentDate, setCurrentDate, restrictionStartDate, view) => {
    if (view === "calendar") {
        handleDateChange(
            currentDate,
            setCurrentDate,
            -1,
            "month",
            restrictionStartDate
        );
    } else if (view === "months") {
        handleDateChange(
            currentDate,
            setCurrentDate,
            -1,
            "year",
            restrictionStartDate
        );
    } else if (view === "years") {
        handleDateChange(
            currentDate,
            setCurrentDate,
            -16,
            "year",
            restrictionStartDate
        );
    }
};

export const handleNext = (currentDate, setCurrentDate, restrictionEndDate, view) => {
    if (view === "calendar") {
        handleDateChange(
            currentDate,
            setCurrentDate,
            1,
            "month",
            restrictionEndDate
        );
    } else if (view === "months") {
        handleDateChange(
            currentDate,
            setCurrentDate,
            1,
            "year",
            restrictionEndDate
        );
    } else if (view === "years") {
        handleDateChange(
            currentDate,
            setCurrentDate,
            16,
            "year",
            restrictionEndDate
        );
    }
};

export const handleViewChange = (setView) => {
    // Cycle through the views: calendar -> months -> years -> calendar
    setView((prevView) => {
        if (prevView === "calendar") return "months";
        if (prevView === "months") return "years";
        return "calendar";
    });
};

export const handleYearSelection = (year, setCurrentDate, setView) => {
    setCurrentDate(new Date(year, 0, 1));
    setView("months");
};

export const handleMonthSelection = (monthYear, setCurrentDate, setView) => {
    const [month, year] = monthYear.split("-").map(Number);
    setCurrentDate(new Date(year, month, 1));
    setView("calendar");
};

export const canMovePrev = (view, currentDate, restrictionStartDate) => {
    if (view === "calendar") {
        return isAfterDate(currentDate, restrictionStartDate);
    } else if (view === "months") {
        return isAfterDate(currentDate, restrictionStartDate, "yearwise");
    } else if (view === "years") {
        const startYear = currentDate.getFullYear() - 7;
        return startYear > restrictionStartDate.getFullYear();
    }
    return false;
};

export const canMoveNext = (view, currentDate, restrictionEndDate) => {
    if (view === "calendar") {
        return isBeforeDate(currentDate, restrictionEndDate);
    } else if (view === "months") {
        return isBeforeDate(currentDate, restrictionEndDate, "yearwise");
    } else if (view === "years") {
        const endYear = currentDate.getFullYear() + 8;
        return endYear < restrictionEndDate.getFullYear();
    }
    return false;
};