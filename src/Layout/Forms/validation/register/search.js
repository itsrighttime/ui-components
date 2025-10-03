import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// SEARCH
engine.register(FORM_FIELDS_TYPE.SEARCH, {
  validateConfig: (field) => {
    if (!Array.isArray(field.options)) {
      return { valid: false, error: "Search options must be array" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "string") {
      return { valid: false, error: "Search value must be string" };
    }
    // optional: check if value is subset of options
    return { valid: true };
  },
});
