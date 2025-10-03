import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

engine.register(FORM_FIELDS_TYPE.SLIDER, {
  validateConfig: (field) => {
    if (typeof field.min !== "number" || typeof field.max !== "number") {
      return { valid: false, error: "Slider must have numeric min/max" };
    }
    if (field.min >= field.max) {
      return { valid: false, error: "Slider min must be less than max" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "number") {
      return { valid: false, error: "Slider value must be number" };
    }
    if (value < field.min || value > field.max) {
      return { valid: false, error: "Slider value out of range" };
    }
    if (field.step && (value - field.min) % field.step !== 0) {
      return { valid: false, error: "Slider value not aligned with step" };
    }
    return { valid: true };
  },
});
