import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// JSON
engine.register(FORM_FIELDS_TYPE.JSON, {
  validateConfig: () => ({ valid: true }),
  validateResponse: (field, value) => {
    if (typeof value !== "string") {
      return { valid: false, error: "JSON must be string" };
    }
    try {
      JSON.parse(value);
      return { valid: true };
    } catch (e) {
      return { valid: false, error: "Invalid JSON format" };
    }
  },
});
