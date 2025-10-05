import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";

engine.register(FORM_FIELDS_TYPE.SLIDER, {
  validateConfig: (field) => {
    if (
      typeof field[FPs.MIN] !== "number" ||
      typeof field[FPs.MAX] !== "number"
    ) {
      return { valid: false, error: "Slider must have numeric min/max" };
    }
    if (field[FPs.MIN] >= field[FPs.MAX]) {
      return { valid: false, error: "Slider min must be less than max" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "number") {
      return { valid: false, error: "Slider value must be number" };
    }
    if (value < field[FPs.MIN] || value > field[FPs.MAX]) {
      return { valid: false, error: "Slider value out of range" };
    }
    if (field[FPs.STEP] && (value - field[FPs.MIN]) % field[FPs.STEP] !== 0) {
      return { valid: false, error: "Slider value not aligned with step" };
    }
    return { valid: true };
  },
});
