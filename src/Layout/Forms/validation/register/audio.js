import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// AUDIO
engine.register(FORM_FIELDS_TYPE.AUDIO, {
  validateConfig: (field) => {
    if (
      field.maxSizeMB &&
      (typeof field.maxSizeMB !== "number" || field.maxSizeMB <= 0)
    ) {
      return { valid: false, error: "maxSizeMB must be a positive number" };
    }
    if (field.allowedTypes && !Array.isArray(field.allowedTypes)) {
      return { valid: false, error: "allowedTypes must be an array" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (typeof value !== "object" || !value) {
      return { valid: false, error: "Value must be an audio file" };
    }
    if (field.maxSizeMB && value.size > field.maxSizeMB * 1024 * 1024) {
      return {
        valid: false,
        error: `Audio size must not exceed ${field.maxSizeMB} MB`,
      };
    }
    if (field.allowedTypes && !field.allowedTypes.includes(value.type)) {
      return { valid: false, error: `Audio type ${value.type} not allowed` };
    }
    return { valid: true };
  },
});
