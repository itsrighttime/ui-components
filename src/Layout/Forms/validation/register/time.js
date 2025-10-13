import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

engine.register(FORM_FIELDS_TYPE.TIME, {
  validateConfig: (field) => {
    // Nothing extra yet (future: minTime, maxTime)
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "string") {
      return { valid: false, error: "Time must be string" };
    }

    // Format: hh:mm AM/PM
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
    if (!regex.test(value)) {
      return {
        valid: false,
        error: "Invalid time format (expected hh:mm AM/PM)",
      };
    }

    return { valid: true };
  },
});
