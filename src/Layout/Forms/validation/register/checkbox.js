import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// CHECKBOX
engine.register(FORM_FIELDS_TYPE.CHECKBOX, {
  validateConfig: (field) => {
    if (!Array.isArray(field.options) || field.options.length === 0) {
      return { valid: false, error: "Checkbox must have options" };
    }

    for (const opt of field.options) {
      if (!opt.label || typeof opt.label !== "string") {
        return { valid: false, error: "Each option must have a label" };
      }
      if (!opt.value || typeof opt.value !== "string") {
        return { valid: false, error: "Each option must have a value" };
      }
    }

    return { valid: true };
  },

  validateResponse: (field, value) => {
    if (!Array.isArray(value)) {
      return { valid: false, error: "Checkbox value must be an array" };
    }

    // Extract valid option labels
    const validLabels = field.options.map((opt) => opt.value);

    for (const v of value) {
      if (!validLabels.includes(v)) {
        return { valid: false, error: `Invalid checkbox selection: ${v}` };
      }
    }

    return { valid: true };
  },
});
