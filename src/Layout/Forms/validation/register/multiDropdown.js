import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// MULTI_DROPDOWN
engine.register(FORM_FIELDS_TYPE.MULTI_DROPDOWN, {
  validateConfig: (field) => {
    if (!Array.isArray(field[FPs.OPTIONS]) || field[FPs.OPTIONS].length === 0) {
      return { valid: false, error: "Multi-dropdown must have options" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (!Array.isArray(value)) {
      return { valid: false, error: "Value must be an array" };
    }

    for (const v of value) {
      if (!field[FPs.OPTIONS].includes(v)) {
        return { valid: false, error: `Invalid selection: ${v}` };
      }
    }
    return { valid: true };
  },
});
