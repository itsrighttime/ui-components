import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// RADIO
engine.register(FORM_FIELDS_TYPE.RADIO, {
  validateConfig: (field) => {
    if (!Array.isArray(field[FPs.OPTIONS]) || field[FPs.OPTIONS].length === 0) {
      return { valid: false, error: "Radio must have options" };
    }

    for (const opt of field[FPs.OPTIONS]) {
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
    if (typeof value !== "string") {
      return { valid: false, error: "Radio value must be a string" };
    }

    // Extract valid labels
    const validLabels = field[FPs.OPTIONS].map((opt) => opt.value);

    if (!validLabels.includes(value)) {
      return { valid: false, error: `Invalid radio selection: ${value}` };
    }

    return { valid: true };
  },
});
