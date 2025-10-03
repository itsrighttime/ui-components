import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// OTP
engine.register(FORM_FIELDS_TYPE.OTP, {
  validateConfig: (field) => {
    if (!field.length || field.length < 4 || field.length > 8) {
      return { valid: false, error: "OTP length must be 4-8" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "string")
      return { valid: false, error: "OTP must be string" };
    if (value.length !== field.length)
      return { valid: false, error: "OTP length mismatch" };
    if (field.isNumeric && !/^\d+$/.test(value))
      return { valid: false, error: "OTP must be numeric" };
    return { valid: true };
  },
});
