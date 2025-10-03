import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// DROPDOWN
engine.register(FORM_FIELDS_TYPE.DROPDOWN, {
  validateConfig: (field) => {
    if (!Array.isArray(field.options) || field.options.length === 0) {
      return { valid: false, error: "Dropdown must have options" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    const selected = Array.isArray(value) ? value[0] : value;

    if (!field.options.includes(selected)) {
      return { valid: false, error: "Invalid selection" };
    }

    return { valid: true };
  },
});
