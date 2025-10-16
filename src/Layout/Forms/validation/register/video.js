import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// VIDEO
engine.register(FORM_FIELDS_TYPE.VIDEO, {
  validateConfig: (field) => {
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
    if (typeof value !== "object" || !value) {
      return { valid: false, error: "Value must be a video file" };
    }
    if (
      field[FPs.MAX_SIZE_MB] &&
      value.size > field[FPs.MAX_SIZE_MB] * 1024 * 1024
    ) {
      return {
        valid: false,
        error: `Video size must not exceed ${field[FPs.MAX_SIZE_MB]} MB`,
      };
    }
    if (
      field[FPs.ALLOWED_TYPES] &&
      !field[FPs.ALLOWED_TYPES].includes(file[FPs.ALLOWED_TYPES])
    ) {
      return {
        valid: false,
        error: `File type ${file[FPs.ALLOWED_TYPES]} not allowed`,
      };
    }

    return { valid: true };
  },
});
