import { FIELDS_PROPS } from "./helper/fields.js";

// --- Preprocess form config ---
export const configToSchema = (config) => {
  if (!config) return [];

  if (config.mode === "multi" && Array.isArray(config.steps)) {
    // Flatten all step fields into one array
    const allFields = config.steps.flatMap((step) => step[FIELDS_PROPS.FIELDS] || []);
    return allFields;
  }

  // Single mode already has fields
  return config[FIELDS_PROPS.FIELDS];
};
