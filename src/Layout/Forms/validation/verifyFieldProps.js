import {
  CORE_FIELDS_PROPS,
  FIELDS_PROPS as FPs,
  GENERIC_PROP,
} from "./helper/fields.js";
import { FORM_FIELDS_TYPE } from "./helper/formFieldTypes.js";
import { pushError } from "./helper/errorFormatter.js";

export const verifyFieldProps = (field, errors) => {
  const genericAllowed = [...GENERIC_PROP.compulsory, ...GENERIC_PROP.optional];

  const coreProps = CORE_FIELDS_PROPS[field[FPs.TYPE]] || {
    compulsory: [],
    optional: [],
  };
  const allowedProps = [
    ...genericAllowed,
    ...coreProps.compulsory,
    ...coreProps.optional,
  ];

  const fieldKeys = Object.keys(field);

  // --- Check for invalid properties ---
  for (const key of fieldKeys) {
    if (!allowedProps.includes(key)) {
      pushError(errors, field, `Invalid property: ${key}`);
    }
  }

  // --- Generic compulsory ---
  for (const key of GENERIC_PROP.compulsory) {
    if (!fieldKeys.includes(key)) {
      if (field[FPs.REPEATABLE] && key === FPs.TYPE) continue; // skip error for TYPE

      pushError(errors, field, `Missing generic compulsory property: ${key}`);
    }
  }

  // --- Special case: checkbox / radio options validation ---
  if (
    [FORM_FIELDS_TYPE.CHECKBOX, FORM_FIELDS_TYPE.RADIO].includes(
      field[FPs.TYPE]
    )
  ) {
    const options = field[FPs.OPTIONS];

    if (!Array.isArray(options) || options.length === 0) {
      pushError(
        errors,
        field,
        `Field ${field[FPs.NAME]} must have a non-empty options array`
      );
    } else {
      for (const opt of options) {
        const optKeys = Object.keys(opt);

        // compulsory
        if (!opt[FPs.VALUE]) {
          pushError(
            errors,
            field,
            `Option in ${field[FPs.NAME]} missing compulsory property: ${
              FPs.VALUE
            }`
          );
        }
        if (!opt[FPs.LABEL]) {
          pushError(
            errors,
            field,
            `Option in ${field[FPs.NAME]} missing compulsory property: ${
              FPs.LABEL
            }`
          );
        }

        // check for invalid keys
        const allowedKeys = [FPs.VALUE, FPs.LABEL, FPs.HELP, FPs.DISABLED];
        for (const k of optKeys) {
          if (!allowedKeys.includes(k)) {
            pushError(
              errors,
              field,
              `Option in ${field[FPs.NAME]} has invalid property: ${k}`
            );
          }
        }
      }
    }
  }

  // --- Fields → repeatable check ---
  if (field[FPs.FIELDS]) {
    if (!field[FPs.REPEATABLE] || !field[FPs.MORE_LABEL]) {
      pushError(
        errors,
        field,
        `"fields" present but "repeatable" or "moreLabel" missing`
      );
    }
  }

  // --- Conditional dependency check ---
  if (field[FPs.CONDITIONAL]) {
    const COND = field[FPs.CONDITIONAL];
    if (!COND[FPs.DEPENDS_ON] || !COND[FPs.OPERATOR] || !COND[FPs.VALUE]) {
      pushError(
        errors,
        field,
        `Conditional must include dependsOn, operator, and value`
      );
    }
  }
};
