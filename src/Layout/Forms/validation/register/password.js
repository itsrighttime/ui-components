import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// PASSWORD
engine.register(FORM_FIELDS_TYPE.PASSWORD, {
  validateConfig: () => ({ valid: true }),
  validateResponse: (field, value) => {
    if (typeof value !== "string") {
      return { valid: false, error: "Password must be a string" };
    }
    // Example: at least 6 chars, must contain a number
    if (value.length < 6) {
      return { valid: false, error: "Password must be at least 6 characters" };
    }
    if (!/\d/.test(value)) {
      return {
        valid: false,
        error: "Password must contain at least one number",
      };
    }
    return { valid: true };
  },
});
