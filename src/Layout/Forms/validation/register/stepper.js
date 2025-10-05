import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";

// STEPPER
engine.register(FORM_FIELDS_TYPE.STEPPER, {
  validateConfig: (field) => {
    if (
      typeof field[FPs.MIN] !== "number" ||
      typeof field[FPs.MAX] !== "number"
    ) {
      return { valid: false, error: "Stepper must have numeric min/max" };
    }
    if (field[FPs.MIN] >= field[FPs.MAX]) {
      return { valid: false, error: "Stepper min must be less than max" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "number") {
      return { valid: false, error: "Stepper value must be number" };
    }
    if (value < field[FPs.MIN] || value > field[FPs.MAX]) {
      return { valid: false, error: "Stepper value out of range" };
    }
    if (field[FPs.STEP] && (value - field[FPs.MIN]) % field[FPs.STEP] !== 0) {
      return { valid: false, error: "Stepper value not aligned with step" };
    }
    return { valid: true };
  },
});
