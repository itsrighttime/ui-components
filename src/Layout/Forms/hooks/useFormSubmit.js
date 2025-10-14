import { deleteFile } from "../helper/indexedDb";
import { configToSchema } from "../validation/configToSchema";
import { validateResponse } from "../validation/validateResponse";
import { submitToBackend } from "../helper/submitTobackend";
import { FORM_STATUS } from "../helper/formStatus";
import { FIELDS_PROPS as FPs } from "../validation/helper/fields";

export function useFormSubmit({
  config,
  formData,
  setFormStatus,
  setFormStatusError,
  addAlert,
  onSubmit,
  STORAGE_KEY,
  isFileLike,
  isFileArray,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(FORM_STATUS.SUBMITTING);

    const schema = configToSchema(config);
    const { valid, errors } = validateResponse(schema, formData);

    if (!valid) {
      setFormStatus(FORM_STATUS.ERROR);
      setFormStatusError(errors);
      return;
    }

    try {
      const response = await submitToBackend(formData, config?.[FPs.ENDPOINT]);
      if (response?.success) {
        localStorage.removeItem(STORAGE_KEY);

        for (const k of Object.keys(formData)) {
          const v = formData[k];
          if (isFileLike(v)) await deleteFile(`${STORAGE_KEY}::${k}`);
          if (isFileArray(v))
            for (let idx = 0; idx < v.length; idx++)
              await deleteFile(`${STORAGE_KEY}::${k}_${idx}`);
        }

        if (onSubmit) onSubmit(formData);
        setFormStatus(FORM_STATUS.SUBMITTED);
        addAlert(
          `${config[FPs.TITLE] || "Details"} Submitted Successfully`,
          "success"
        );
      } else {
        setFormStatus(FORM_STATUS.FAILED);
        setFormStatusError(
          response.data || {
            general: { error: response?.message || "Submission failed" },
          }
        );
        addAlert("Resolve the errors and submit again", "error");
      }
    } catch (err) {
      setFormStatus(FORM_STATUS.FAILED);
      setFormStatusError({
        general: { error: err.message || "Network error" },
      });
      addAlert("Resolve the errors and submit again", "error");
    }
  };

  return { handleSubmit };
}
