import { pushError } from "./helper/errorFormatter.js";
import {
  FIELDS_PROPS as FPs,
} from "./helper/fields.js";
import { OPERATORS } from "./helper/operators.js";
import { validationEngine as engine } from "./ValidationEngine.js";


export function validateResponse(schema, response) {
  const errors = {};

  for (const field of schema) {
    // --- Conditional visibility ---
    if (field[FPs.CONDITIONAL]) {
      const depValue = response[field[FPs.CONDITIONAL][FPs.DEPENDS_ON]];
      const visible =
        field[FPs.CONDITIONAL][FPs.OPERATOR] === OPERATORS.in
          ? field[FPs.CONDITIONAL][FPs.VALUE].includes(depValue)
          : false;

      if (!visible) continue;
    }

    const value = response[field[FPs.NAME]];

    // required check
    if (
      field[FPs.REQUIRED] &&
      (value === undefined || value === null || value === "")
    ) {
      pushError(errors, field, `This field is required`);
    }
    if (
      !field[FPs.REQUIRED] &&
      (value === undefined || value === null || value === "")
    ) {
      continue;
    }

    if (field[FPs.REPEATABLE]) {
      if (!Array.isArray(value)) {
        pushError(errors, field, `Must be array`);
      } else {
        value.forEach((item) => {
          const subCheck = validateResponse(field[FPs.FIELDS], item);
          Object.assign(errors, subCheck.errors);
        });
      }
      continue;
    }

    const res = engine.validateResponse(field, value);
    if (!res.valid) pushError(errors, field, res.error);
  }

  return { valid: Object.keys(errors).length === 0, errors };
}