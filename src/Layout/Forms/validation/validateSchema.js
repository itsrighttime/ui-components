import {
  FIELDS_PROPS as FPs,
} from "./helper/fields.js";
import { FORM_FIELDS_TYPE } from "./helper/fields.js";
import { OPERATORS } from "./helper/operators.js";
import { validationEngine as engine } from "./ValidationEngine.js";
import { pushError } from "./helper/errorFormatter.js";
import { verifyFieldProps } from "./verifyFieldProps.js";


export const validateSchema = (schema, parentNames = new Set()) => {
  const seenNames = new Set([...parentNames]);
  const errors = {};

  for (const field of schema) {
    verifyFieldProps(field, errors);

    // --- Generic props ---
    if (!field[FPs.NAME] || typeof field[FPs.NAME] !== "string") {
      pushError(errors, field, `Invalid or missing "name"`);
    }
    if (seenNames.has(field[FPs.NAME])) {
      pushError(errors, field, `Duplicate field name`);
    }
    seenNames.add(field[FPs.NAME]);

    if (!field[FPs.LABEL] || typeof field[FPs.LABEL] !== "string") {
      pushError(errors, field, `Missing or invalid "label"`);
    }

    // --- Repeatable handling ---
    if (field[FPs.REPEATABLE]) {
      if (!Array.isArray(field[FPs.FIELDS]) || field[FPs.FIELDS].length === 0) {
        pushError(errors, field, `Repeatable field must define child fields`);
      }
      if (!field[FPs.MORE_LABEL]) {
        pushError(errors, field, `Repeatable field must define "moreLabel"`);
      }
      const childResult = validateSchema(field[FPs.FIELDS], seenNames);
      Object.assign(errors, childResult.errors);
    } else {
      if (
        !field[FPs.TYPE] ||
        !Object.values(FORM_FIELDS_TYPE).includes(field[FPs.TYPE])
      ) {
        pushError(errors, field, `Invalid or missing "type"`);
      }
    }

    // --- Conditional rules ---
    if (field[FPs.CONDITIONAL]) {
      const COND = field[FPs.CONDITIONAL];
      if (!COND[FPs.DEPENDS_ON] || typeof COND[FPs.DEPENDS_ON] !== "string") {
        pushError(errors, field, `conditional.dependsOn must be a string`);
      }
      if (!Object.values(OPERATORS).includes(COND[FPs.OPERATOR])) {
        pushError(errors, field, `conditional.operator must be valid`);
      }
      if (!Array.isArray(COND[FPs.VALUE])) {
        pushError(errors, field, `conditional.value must be an array`);
      }
      if (!seenNames.has(COND[FPs.DEPENDS_ON])) {
        pushError(
          errors,
          field,
          `conditional.dependsOn "${COND[FPs.DEPENDS_ON]}" not found in schema`
        );
      }
    }

    // --- Field-specific validation ---
    if (!field[FPs.REPEATABLE] && field[FPs.TYPE]) {
      const result = engine.validateConfig(field);
      if (!result.valid) pushError(errors, field, result.error);
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
};
