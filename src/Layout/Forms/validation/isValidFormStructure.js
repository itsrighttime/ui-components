import { FIELDS_PROPS as FPs, FORM_FIELDS_TYPE } from "./helper/fields.js";
import { OPERATORS } from "./helper/operators.js";

/**
 * Validates the basic structure of a form config (single or multi-step)
 * Returns true if valid, false otherwise
 */
export function isValidFormStructure(config) {
  if (!config || typeof config !== "object" || Array.isArray(config))
    return false;

  // Required string fields
  const stringFields = [FPs.TITLE, FPs.DESCRIPTION, FPs.MODE];
  for (const key of stringFields) {
    if (typeof config[key] !== "string") return false;
  }

  // --- Helper to validate a field ---
  const validateField = (field) => {
    if (!field || typeof field !== "object") return false;
    if (
      !field[FPs.NAME] ||
      (!field[FPs.TYPE] && !field[FPs.REPEATABLE]) ||
      !field[FPs.LABEL]
    )
      return false;
    if (
      field[FPs.TYPE] &&
      !Object.values(FORM_FIELDS_TYPE).includes(field[FPs.TYPE])
    )
      return false;

    if (field[FPs.CONDITIONAL]) {
      const cond = field[FPs.CONDITIONAL];
      if (!cond[FPs.DEPENDS_ON] || !cond[FPs.OPERATOR] || !cond[FPs.VALUE])
        return false;
      if (!Object.values(OPERATORS).includes(cond[FPs.OPERATOR])) return false;
    }
    return true;
  };

  // Single-step form
  if (config[FPs.MODE] === "single") {
    if (!Array.isArray(config[FPs.FIELDS])) return false;
    for (const field of config[FPs.FIELDS]) {
      if (!validateField(field)) return false;
    }
  }

  // Multi-step form
  if (config[FPs.MODE] === "multi") {
    if (!Array.isArray(config[FPs.STEP])) return false;

    for (const step of config[FPs.STEP]) {
      if (!step || typeof step !== "object") return false;
      if (!Array.isArray(step[FPs.FIELDS])) return false;

      for (const field of step[FPs.FIELDS]) {
        if (!validateField(field)) return false;
      }
    }
  }

  return true;
}
