import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// TEXT
engine.register(FORM_FIELDS_TYPE.TEXT, {
  validateConfig: (field) => {
    if (
      field[FPs.MIN_LENGTH] &&
      field[FPs.MAX_LENGTH] &&
      field[FPs.MIN_LENGTH] > field[FPs.MAX_LENGTH]
    ) {
      return { valid: false, error: "minLength cannot exceed maxLength" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "string")
      return { valid: false, error: "Must be string" };
    if (field[FPs.MIN_LENGTH] && value.length < field[FPs.MIN_LENGTH])
      return { valid: false, error: "Too short" };
    if (field[FPs.MAX_LENGTH] && value.length > field[FPs.MAX_LENGTH])
      return { valid: false, error: "Too long" };
    return { valid: true };
  },
});
