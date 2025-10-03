export const validateFormData = (formData, schema) => {
  const errors = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(schema)) {
    console.log("DDDD ", field, rules);
    const result = rules.validator(formData[field]);
    if (result !== true) {
      isValid = false;
      errors[field] = result;
    }
  }

  return { isValid, errors };
};
