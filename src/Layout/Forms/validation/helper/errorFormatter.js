// --- utils/errors.js ---
function makeError(field, message) {
  return {
    name: field?.name || null,
    label: field?.label || null,
    error: message,
  };
}

export function pushError(errors, field, message) {
  errors[field.name] = makeError(field, message);
}
