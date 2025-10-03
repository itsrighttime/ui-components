import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// VIDEO
engine.register(FORM_FIELDS_TYPE.VIDEO, {
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
      return { valid: false, error: "Value must be a video file" };
    }
    if (field.maxSizeMB && value.size > field.maxSizeMB * 1024 * 1024) {
      return {
        valid: false,
        error: `Video size must not exceed ${field.maxSizeMB} MB`,
      };
    }
    if (field.allowedTypes && !field.allowedTypes.includes(value.type)) {
      return { valid: false, error: `Video type ${value.type} not allowed` };
    }
    return { valid: true };
  },
});
