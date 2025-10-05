import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";

// DATE
engine.register(FORM_FIELDS_TYPE.DATE, {
  validateConfig: (field) => {
    const modes = ["date", "month", "month-year", "year"];

    const pattern = /^\d{2}-\d{2}-\d{4}$/;
    if (field[FPs.MODE] && !modes.includes(field[FPs.MODE]))
      return { valid: false, error: "Invalid mode" };

    const checkDate = (dateStr) => {
      if (!dateStr) return true;
      if (!pattern.test(dateStr)) return false;

      const [dd, mm, yyyy] = dateStr.split("-").map(Number);
      const isValid =
        yyyy >= 1000 &&
        yyyy <= 9999 &&
        mm >= 1 &&
        mm <= 12 &&
        dd >= 1 &&
        dd <= new Date(yyyy, mm, 0).getDate(); // max days of month
      return isValid;
    };

    if (!checkDate(field[FPs.RESTRICTION_START_DATE]))
      return { valid: false, error: "Invalid start date" };
    if (!checkDate(field[FPs.RESTRICTION_END_DATE]))
      return { valid: false, error: "Invalid end date" };

    return { valid: true };
  },

  validateResponse: (field, value) => {
    const mode = field[FPs.MODE] || "date";
    const patterns = {
      date: /^\d{2}-\d{2}-\d{4}$/,
      month: /^\d{2}$/,
      "month-year": /^\d{2}-\d{4}$/,
      year: /^\d{4}$/,
    };

    const pattern = patterns[mode];
    if (!pattern.test(value))
      return { valid: false, error: "Invalid format for mode " + mode };

    const checkValue = () => {
      if (mode === "date") {
        const [dd, mm, yyyy] = value.split("-").map(Number);
        return (
          dd >= 1 &&
          mm >= 1 &&
          mm <= 12 &&
          dd <= new Date(yyyy, mm, 0).getDate()
        );
      } else if (mode === "month-year") {
        const [mm, yyyy] = value.split("-").map(Number);
        return mm >= 1 && mm <= 12 && yyyy >= 1000 && yyyy <= 9999;
      } else if (mode === "month") {
        const mm = Number(value);
        return mm >= 1 && mm <= 12;
      } else if (mode === "year") {
        const yyyy = Number(value);
        return yyyy >= 1000 && yyyy <= 9999;
      }
      return false;
    };

    if (!checkValue()) return { valid: false, error: "Invalid date value" };

    // Check restrictions (only for modes with year)
    const toComparableDate = (str) => {
      if (mode === "date") {
        const [dd, mm, yyyy] = str.split("-").map(Number);
        return new Date(yyyy, mm - 1, dd);
      } else if (mode === "month-year") {
        const [mm, yyyy] = str.split("-").map(Number);
        return new Date(yyyy, mm - 1, 1);
      } else if (mode === "year") {
        const yyyy = Number(str);
        return new Date(yyyy, 0, 1);
      }
      return null;
    };

    if (["date", "month-year", "year"].includes(mode)) {
      const valDate = toComparableDate(value);
      if (field[FPs.RESTRICTION_START_DATE]) {
        const [d, m, y] = field[FPs.RESTRICTION_START_DATE].split("-");
        const startDate = new Date(y, m - 1, d);
        if (valDate < startDate)
          return { valid: false, error: "Before allowed range" };
      }
      if (field[FPs.RESTRICTION_END_DATE]) {
        const [d, m, y] = field[FPs.RESTRICTION_END_DATE].split("-");
        const endDate = new Date(y, m - 1, d);

        if (valDate > endDate)
          return { valid: false, error: "After allowed range" };
      }
    }

    return { valid: true };
  },
});
