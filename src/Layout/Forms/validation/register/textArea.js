import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// TEXT_AREA
engine.register(FORM_FIELDS_TYPE.TEXT_AREA, {
  validateConfig: (field) => {
    if (field[FPs.MIN_LENGTH] && typeof field[FPs.MIN_LENGTH] !== "number") {
      return { valid: false, error: "minLength must be number" };
    }
    if (field[FPs.MAX_LENGTH] && typeof field[FPs.MAX_LENGTH] !== "number") {
      return { valid: false, error: "maxLength must be number" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "string") {
      return { valid: false, error: "TextArea must be string" };
    }
    if (field[FPs.MIN_LENGTH] && value.length < field[FPs.MIN_LENGTH]) {
      return {
        valid: false,
        error: `Minimum length is ${field[FPs.MIN_LENGTH]}`,
      };
    }
    if (field[FPs.MAX_LENGTH] && value.length > field[FPs.MAX_LENGTH]) {
      return {
        valid: false,
        error: `Maximum length is ${field[FPs.MAX_LENGTH]}`,
      };
    }
    return { valid: true };
  },
});
