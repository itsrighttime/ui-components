import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// OTP
engine.register(FORM_FIELDS_TYPE.OTP, {
  validateConfig: (field) => {
    if (!field[FPs.LENGTH] || field[FPs.LENGTH] < 4 || field[FPs.LENGTH] > 8) {
      return { valid: false, error: "OTP length must be 4-8" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "string")
      return { valid: false, error: "OTP must be string" };
    if (value.length !== field[FPs.LENGTH])
      return { valid: false, error: "OTP length mismatch" };
    if (field[FPs.IS_NUMERIC] && !/^\d+$/.test(value))
      return { valid: false, error: "OTP must be numeric" };
    return { valid: true };
  },
});
