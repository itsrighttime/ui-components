import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// MOBILE
engine.register(FORM_FIELDS_TYPE.MOBILE, {
  validateConfig: (field) => {
    if (field[FPs.CODE] && typeof field[FPs.CODE] !== "string") {
      return { valid: false, error: "Country code must be a string" };
    }
    return { valid: true };
  },

  validateResponse: (field, value) => {
    // Value should be an object with code & number
    if (typeof value !== "object" || value === null) {
      return {
        valid: false,
        error: "Mobile value must be an object with code and number",
      };
    }

    const { [FPs.CODE] :code, [FPs.NUMBER]: number } = value;

    // Validate code
    if (!code || typeof code !== "string" || !/^\+\d{1,4}$/.test(code)) {
      return { valid: false, error: "Invalid country code" };
    }

    // Validate number
    if (!number || typeof number !== "string" || !/^\d{7,15}$/.test(number)) {
      return { valid: false, error: "Invalid mobile number format" };
    }

    return { valid: true };
  },
});
