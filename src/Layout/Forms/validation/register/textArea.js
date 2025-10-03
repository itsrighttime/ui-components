import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// TEXT_AREA
engine.register(FORM_FIELDS_TYPE.TEXT_AREA, {
  validateConfig: (field) => {
    if (field.minLength && typeof field.minLength !== "number") {
      return { valid: false, error: "minLength must be number" };
    }
    if (field.maxLength && typeof field.maxLength !== "number") {
      return { valid: false, error: "maxLength must be number" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "string") {
      return { valid: false, error: "TextArea must be string" };
    }
    if (field.minLength && value.length < field.minLength) {
      return { valid: false, error: `Minimum length is ${field.minLength}` };
    }
    if (field.maxLength && value.length > field.maxLength) {
      return { valid: false, error: `Maximum length is ${field.maxLength}` };
    }
    return { valid: true };
  },
});
