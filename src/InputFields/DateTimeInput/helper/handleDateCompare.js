import { convertStrDate2Date } from "./handleDateChange";


/**
 *
 * @param {*} date1 : String or new Date()
 * @param {*} date2 : String or new Date()
 * @param {*} comparisonType : datewise, monthwise, yearwise
 * @returns
 */
export const compareDates = (date1, date2, comparisonType = "monthwise") => {
    // Convert string dates to Date objects if necessary
    if (typeof date1 === "string") date1 = convertStrDate2Date(date1);
    if (typeof date2 === "string") date2 = convertStrDate2Date(date2);

    // Datewise comparison
    if (comparisonType === "datewise") {
        if (date1.getFullYear() !== date2.getFullYear()) {
            return date1.getFullYear() - date2.getFullYear();
        }
        if (date1.getMonth() !== date2.getMonth()) {
            return date1.getMonth() - date2.getMonth();
        }
        return date1.getDate() - date2.getDate();
    }

    // Monthwise comparison
    if (comparisonType === "monthwise") {
        if (date1.getFullYear() !== date2.getFullYear()) {
            return date1.getFullYear() - date2.getFullYear();
        }
        return date1.getMonth() - date2.getMonth();
    }

    // Yearwise comparison
    if (comparisonType === "yearwise") {
        return date1.getFullYear() - date2.getFullYear();
    }

    // If the comparison type is invalid
    throw new Error("Invalid comparison type provided.");
};



// Generic boolean comparison function
export const isDateEqual = (date1, date2, comparisonType = "monthwise") => {
    // Convert string dates to Date objects if necessary
    if (typeof date1 === "string") date1 = convertStrDate2Date(date1);
    if (typeof date2 === "string") date2 = convertStrDate2Date(date2);

    // Datewise comparison
    if (comparisonType === "datewise") {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    // Monthwise comparison
    if (comparisonType === "monthwise") {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth()
        );
    }

    // Yearwise comparison
    if (comparisonType === "yearwise") {
        return date1.getFullYear() === date2.getFullYear();
    }

    // If the comparison type is invalid
    throw new Error("Invalid comparison type provided.");
};

// Additional helper functions for comparison
export const isBeforeDate = (date1, date2, comparisonType = "monthwise") => {
    if (typeof date1 === "string") date1 = convertStrDate2Date(date1);
    if (typeof date2 === "string") date2 = convertStrDate2Date(date2);

    if (comparisonType === "datewise") {
        return date1 < date2;
    }

    if (comparisonType === "monthwise") {
        return (
            date1.getFullYear() < date2.getFullYear() ||
            (date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() < date2.getMonth())
        );
    }

    if (comparisonType === "yearwise") {
        return date1.getFullYear() < date2.getFullYear();
    }

    throw new Error("Invalid comparison type provided.");
};

export const isAfterDate = (date1, date2, comparisonType = "monthwise") => {
    return !isDateEqual(date1, date2, comparisonType) && !isBeforeDate(date1, date2, comparisonType);
};