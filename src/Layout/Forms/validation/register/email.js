import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// EMAIL
engine.register(FORM_FIELDS_TYPE.EMAIL, {
  validateConfig: () => ({ valid: true }),
  validateResponse: (field, value) => {
    if (typeof value !== "string") {
      return { valid: false, error: "Email must be a string" };
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      return { valid: false, error: "Invalid email format" };
    }
    return { valid: true };
  },
});
