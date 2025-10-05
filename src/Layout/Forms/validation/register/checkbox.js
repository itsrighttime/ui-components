import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";

// CHECKBOX
engine.register(FORM_FIELDS_TYPE.CHECKBOX, {
  validateConfig: (field) => {
    const { [FPs.OPTIONS]: options } = field;

    if (!Array.isArray(options) || options.length === 0) {
      return { valid: false, error: "Checkbox must have options" };
    }

    for (const opt of options) {
      const { label, value } = opt;
      if (!label || typeof label !== "string") {
        return { valid: false, error: "Each option must have a label" };
      }
      if (!value || typeof value !== "string") {
        return { valid: false, error: "Each option must have a value" };
      }
    }

    return { valid: true };
  },

  validateResponse: (field, value) => {
    const { [FPs.OPTIONS]: options } = field;

    if (!Array.isArray(value)) {
      return { valid: false, error: "Checkbox value must be an array" };
    }

    const validValues = options.map((opt) => opt.value);

    for (const v of value) {
      if (!validValues.includes(v)) {
        return { valid: false, error: `Invalid checkbox selection: ${v}` };
      }
    }

    return { valid: true };
  },
});
