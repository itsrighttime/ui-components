export const getMonthsInRange = (restrictionStartDate, restrictionEndDate) => {
    const months = [];

    let currentDate = new Date(
        restrictionStartDate.getFullYear(),
        restrictionStartDate.getMonth(),
        1
    );

    while (
        currentDate <=
        new Date(restrictionEndDate.getFullYear(), restrictionEndDate.getMonth(), 1)
    ) {
        months.push(
            `${currentDate.toLocaleString("default", {
                month: "long",
            })} ${currentDate.getFullYear()}`
        );

        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
};


export const getYearsInRange = (restrictionStartDate, restrictionEndDate) => {
    const years = [];

    const startYear = restrictionStartDate.getFullYear();
    const endYear = restrictionEndDate.getFullYear();

    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    return years;
};
