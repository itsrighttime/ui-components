import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// URL
engine.register(FORM_FIELDS_TYPE.URL, {
  validateConfig: (field) => {
    // Optional:  Nothing extra yet

    return { valid: true };
  },
  validateResponse: (field, value) => {
    // Must be string
    if (typeof value !== "string")
      return { valid: false, error: "Must be a string" };

    const trimmed = value.trim();

    // URL format validation
    try {
      const url = new URL(trimmed);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return { valid: false, error: "Invalid URL protocol" };
      }
    } catch {
      return { valid: false, error: "Invalid URL format" };
    }

    return { valid: true };
  },
});
