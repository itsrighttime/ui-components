import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";

// FILE
engine.register(FORM_FIELDS_TYPE.FILE, {
  validateConfig: (field) => {
    if (
      field[FPs.MAX_FILES] &&
      (typeof field[FPs.MAX_FILES] !== "number" || field[FPs.MAX_FILES] <= 0)
    ) {
      return { valid: false, error: "maxFiles must be a positive number" };
    }
    if (
      field[FPs.MAX_SIZE_MB] &&
      (typeof field[FPs.MAX_SIZE_MB] !== "number" ||
        field[FPs.MAX_SIZE_MB] <= 0)
    ) {
      return { valid: false, error: "maxSizeMB must be a positive number" };
    }
    if (field[FPs.ALLOWED_TYPES] && !Array.isArray(field[FPs.ALLOWED_TYPES])) {
      return { valid: false, error: "allowedTypes must be an array" };
    }
    return { valid: true };
  },
  validateResponse: (field, value) => {
    if (!Array.isArray(value)) {
      return { valid: false, error: "Value must be an array of files" };
    }
    if (field[FPs.MAX_FILES] && value.length > field[FPs.MAX_FILES]) {
      return {
        valid: false,
        error: `Max ${field[FPs.MAX_FILES]} files allowed`,
      };
    }
    for (const file of value) {
      if (
        field[FPs.MAX_SIZE_MB] &&
        file.size > field[FPs.MAX_SIZE_MB] * 1024 * 1024
      ) {
        return {
          valid: false,
          error: `File size must not exceed ${field[FPs.MAX_SIZE_MB]} MB`,
        };
      }
      if (
        field[FPs.ALLOWED_TYPES] &&
        !field[FPs.ALLOWED_TYPES].includes(file.type)
      ) {
        return { valid: false, error: `File type ${file.type} not allowed` };
      }
    }
    return { valid: true };
  },
});
