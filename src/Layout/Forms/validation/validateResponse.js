import { isConditional } from "./isConditional.js";
import { pushError } from "./helper/errorFormatter.js";
import { FIELDS_PROPS as FPs } from "./helper/fields.js";
import { validationEngine as engine } from "./ValidationEngine.js";

/**
 * Recursively validates a form response against its schema.
 * Supports:
 *  - repeatable and nested repeatable fields
 *  - conditional visibility
 *  - group and primitive fields
 */
export function validateResponse(schema = [], response = {}, parentKey = "") {
  const errors = {};

  for (const field of schema) {
    const fieldName = field[FPs.NAME];
    const value = response?.[fieldName];
    const keyPath = parentKey ? `${parentKey}.${fieldName}` : fieldName;

    // --- CONDITIONAL VISIBILITY ---
    if (field[FPs.CONDITIONAL]) {
      const visible = isConditional(field, response); // use shared logic
      if (!visible) continue; // skip hidden fields entirely
    }

    // --- EMPTY CHECKS ---
    const isEmpty =
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    // --- REPEATABLE FIELDS ---
    if (field[FPs.REPEATABLE]) {
      if (!Array.isArray(value)) {
        pushError(errors, field, `Must be an array`, keyPath);
        continue;
      }

      value.forEach((item, index) => {
        const nestedKey = `${keyPath}[${index}]`;
        const subResult = validateResponse(field[FPs.FIELDS], item, nestedKey);
        Object.assign(errors, subResult.errors);
      });

      continue;
    }

    if (field[FPs.REQUIRED] && isEmpty) {
      pushError(errors, field, `This field is required`, keyPath);
      continue;
    }

    if (!field[FPs.REQUIRED] && !field[FPs.REPEATABLE] && isEmpty) {
      continue; // optional empty → skip further validation
    }

    // --- NESTED GROUPS ---
    if (Array.isArray(field[FPs.FIELDS]) && field[FPs.FIELDS].length > 0) {
      const subResult = validateResponse(
        field[FPs.FIELDS],
        value || {},
        keyPath
      );
      Object.assign(errors, subResult.errors);
      continue;
    }

    // --- SIMPLE FIELD VALIDATION ---
    const res = engine.validateResponse(field, value);
    if (!res.valid) pushError(errors, field, res.error, keyPath);
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
