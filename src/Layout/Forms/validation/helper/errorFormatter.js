import { FIELDS_PROPS as FPs } from "./fields.js";

// --- utils/errors.js ---
function makeError(field, message) {
  return {
    name: field[FPs.NAME] || null,
    label: field[FPs.LABEL] || null,
    error: message,
  };
}

export function pushError(errors, field, message) {
  errors[field[FPs.NAME]] = makeError(field, message);
}
