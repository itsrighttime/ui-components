import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";
import { FORM_FIELDS_TYPE } from "../helper/fields.js";

// AUDIO
engine.register(FORM_FIELDS_TYPE.AUDIO, {
  validateConfig: (field) => {
    const { [FPs.MAX_SIZE_MB]: maxSize, [FPs.ALLOWED_TYPES]: allowedTypes } =
      field;

    if (maxSize && (typeof maxSize !== "number" || maxSize <= 0)) {
      return {
        valid: false,
        error: `${FPs.MAX_SIZE_MB} must be a positive number`,
      };
    }

    if (allowedTypes && !Array.isArray(allowedTypes)) {
      return { valid: false, error: `${FPs.ALLOWED_TYPES} must be an array` };
    }

    return { valid: true };
  },

  validateResponse: (field, value) => {
    const { [FPs.MAX_SIZE_MB]: maxSize, [FPs.ALLOWED_TYPES]: allowedTypes } =
      field;

    if (typeof value !== "object" || !value) {
      return { valid: false, error: "Value must be an audio file" };
    }

    if (maxSize && value.size > maxSize * 1024 * 1024) {
      return {
        valid: false,
        error: `Audio size must not exceed ${maxSize} MB`,
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
