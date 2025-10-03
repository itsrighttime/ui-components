import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// STEPPER
engine.register(FORM_FIELDS_TYPE.STEPPER, {
  validateConfig: (field) => {
    if (typeof field.min !== "number" || typeof field.max !== "number") {
      return { valid: false, error: "Stepper must have numeric min/max" };
    }
    if (field.min >= field.max) {
      return { valid: false, error: "Stepper min must be less than max" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "number") {
      return { valid: false, error: "Stepper value must be number" };
    }
    if (value < field.min || value > field.max) {
      return { valid: false, error: "Stepper value out of range" };
    }
    if (field.step && (value - field.min) % field.step !== 0) {
      return { valid: false, error: "Stepper value not aligned with step" };
    }
    return { valid: true };
  },
});
