import { validationEngine } from "./ValidationEngine.js";

/**
 * Validate the form configuration
 * @param {Object} formConfig - configData object
 * @returns {Object} result with valid flag and errors
 */
export function validateFormConfig(formConfig) {
  const errors = [];
  formConfig.fields.forEach((field) => {
    if (!field.repeatable) {
      try {
        const result = validationEngine.validateConfig(field);
        if (!result.valid) {
          errors.push({ field: field.name, error: result.error });
        }
      } catch (err) {
        errors.push({ field: field.name, error: err.message });
      }
    }

    // Handle repeatable / nested fields
    if (field.repeatable && field.fields?.length) {
      field.fields.forEach((nestedField) => {
        try {
          const result = validationEngine.validateConfig(nestedField);
          if (!result.valid) {
            errors.push({
              field: `${field.name}.${nestedField.name}`,
              error: result.error,
            });
          }
        } catch (err) {
          errors.push({
            field: `${field.name}.${nestedField.name}`,
            error: err.message,
          });
        }
      });
    }
  });

  return { valid: errors.length === 0, errors };
}

/**
 * Validate a user response against the form config
 * @param {Object} formConfig - configData object
 * @param {Object} responseData - object with user input
 * @returns {Object} result with valid flag and errors
 */
export function validateFormResponse(formConfig, responseData) {
  const errors = [];

  formConfig.fields.forEach((field) => {
    const value = responseData[field.name];

    if (!field.repeatable) {
      try {
        const result = validationEngine.validateResponse(field, value);
        if (!result.valid) {
          errors.push({ field: field.name, error: result.error });
        }
      } catch (err) {
        errors.push({ field: field.name, error: err.message });
      }
    }

    // Handle repeatable / nested fields
    if (field.repeatable && Array.isArray(value)) {
      value.forEach((item, idx) => {
        field.fields.forEach((nestedField) => {
          try {
            const result = validationEngine.validateResponse(
              nestedField,
              item[nestedField.name]
            );
            if (!result.valid) {
              errors.push({
                field: `${field.name}[${idx}].${nestedField.name}`,
                error: result.error,
              });
            }
          } catch (err) {
            errors.push({
              field: `${field.name}[${idx}].${nestedField.name}`,
              error: err.message,
            });
          }
        });
      });
    }
  });

  return { valid: errors.length === 0, errors };
}
