import { configToSchema } from "../validation/configToSchema";
import { validateResponse } from "../validation/validateResponse";
import { validateSchema } from "../validation/validateSchema";

export const validateFormData = (formData, config) => {
  const errors = {};
  let isValid = true;

  console.log("DDDD", formData, config);

  const schema = configToSchema(config);

  const configRe1 = validateSchema(schema);
  const configRe2 = validateResponse(schema, formData);

  console.log("DDDD", configRe1, configRe2);

  // for (const [field, rules] of Object.entries(schema)) {
  //   console.log("DDDD ", field, rules);
  //   const result = rules.validator(formData[field]);
  //   if (result !== true) {
  //     isValid = false;
  //     errors[field] = result;
  //   }
  // }

  return { isValid, errors };
};
