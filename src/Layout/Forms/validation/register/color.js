import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// COLOR
engine.register(FORM_FIELDS_TYPE.COLOR, {
  validateConfig: () => ({ valid: true }),
  validateResponse: (field, value) => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!regex.test(value)) {
      return { valid: false, error: "Invalid hex color code" };
    }
    return { valid: true };
  },
});
