import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// SWITCH
engine.register(FORM_FIELDS_TYPE.SWITCH, {
  validateConfig: () => ({ valid: true }),
  validateResponse: (field, value) => {
    if (typeof value !== "boolean") {
      return { valid: false, error: "Switch must be true/false" };
    }
    return { valid: true };
  },
});
