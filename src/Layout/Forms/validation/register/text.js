import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// TEXT
engine.register(FORM_FIELDS_TYPE.TEXT, {
  validateConfig: (field) => {
    if (
      field.minLength &&
      field.maxLength &&
      field.minLength > field.maxLength
    ) {
      return { valid: false, error: "minLength cannot exceed maxLength" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "string")
      return { valid: false, error: "Must be string" };
    if (field.minLength && value.length < field.minLength)
      return { valid: false, error: "Too short" };
    if (field.maxLength && value.length > field.maxLength)
      return { valid: false, error: "Too long" };
    return { valid: true };
  },
});
