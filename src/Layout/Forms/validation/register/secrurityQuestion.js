import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";
import { FIELDS_PROPS as FPs } from "../helper/fields.js";

// SECURITY_QUESTION
engine.register(FORM_FIELDS_TYPE.SECURTY_QUESTION, {
  validateConfig: (field) => {
    if (!Array.isArray(field[FPs.OPTIONS]) || field[FPs.OPTIONS].length === 0) {
      return { valid: false, error: "Security Question must have options" };
    }
    return { valid: true };
  },

  validateResponse: (field, value) => {
    if (typeof value !== "object" || value === null) {
      return {
        valid: false,
        error: "Value must be an object with question and answer",
      };
    }

    const { question, answer } = value;

    // Validate question
    if (!question || typeof question !== "string") {
      return { valid: false, error: "Question must be a string" };
    }
    if (!field[FPs.OPTIONS].includes(question)) {
      return { valid: false, error: "Invalid security question selected" };
    }

    // Validate answer
    if (!answer || typeof answer !== "string" || answer.trim().length === 0) {
      return { valid: false, error: "Answer must be a non-empty string" };
    }

    return { valid: true };
  },
});
