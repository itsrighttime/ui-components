import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

// FILE
engine.register(FORM_FIELDS_TYPE.FILE, {
  validateConfig: (field) => {
    if (
      field.maxFiles &&
      (typeof field.maxFiles !== "number" || field.maxFiles <= 0)
    ) {
      return { valid: false, error: "maxFiles must be a positive number" };
    }
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
    if (!Array.isArray(value)) {
      return { valid: false, error: "Value must be an array of files" };
    }
    if (field.maxFiles && value.length > field.maxFiles) {
      return { valid: false, error: `Max ${field.maxFiles} files allowed` };
    }
    for (const file of value) {
      if (field.maxSizeMB && file.size > field.maxSizeMB * 1024 * 1024) {
        return {
          valid: false,
          error: `File size must not exceed ${field.maxSizeMB} MB`,
        };
      }
      if (field.allowedTypes && !field.allowedTypes.includes(file.type)) {
        return { valid: false, error: `File type ${file.type} not allowed` };
      }
    }
    return { valid: true };
  },
});
