import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// IMAGE
engine.register(FORM_FIELDS_TYPE.IMAGE, {
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
      return { valid: false, error: "Value must be an image file" };
    }
    if (field.maxSizeMB && value.size > field.maxSizeMB * 1024 * 1024) {
      return {
        valid: false,
        error: `Image size must not exceed ${field.maxSizeMB} MB`,
      };
    }
    if (field.allowedTypes && !field.allowedTypes.includes(value.type)) {
      return { valid: false, error: `Image type ${value.type} not allowed` };
    }
    if (field.requireSquare && value.width !== value.height) {
      return { valid: false, error: "Image must be square" };
    }
    return { valid: true };
  },
});
