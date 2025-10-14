import { useCallback } from "react";
import { VALIDITY } from "../helper/validity";
import { FIELDS_PROPS as FPs } from "../validation/helper/fields";
import { isConditional } from "./conditional";
import { configToSchema } from "../validation/configToSchema";
import { validateResponse } from "../validation/validateResponse";
import { FORM_STATUS } from "./GenericForm";

export function useFormNavigation(
  config,
  formData,
  formError,
  currentStep,
  setCurrentStep,
  addAlert,
  setFormStatus,
  setFormStatusError
) {
  const isStepValid = useCallback(() => {
    const fields =
      config.mode === "multi"
        ? config.steps[currentStep][FPs.FIELDS]
        : config[FPs.FIELDS];
    return fields.every((f) => {
      if (f[FPs.CONDITIONAL]) {
        const isMatch = isConditional(f, formData);
        if (!isMatch) return true;
      }
      return formError[f[FPs.NAME]] === VALIDITY.valid;
    });
  }, [config, currentStep, formError]);

  const next = () => {
    const subConfig = config[FPs.STEP][currentStep][FPs.FIELDS];
    const { valid, errors } = validateResponse(subConfig, formData);

    if (valid) {
      setCurrentStep((s) => s + 1);
    } else {
      setFormStatus(FORM_STATUS.error);
      setFormStatusError(errors);
    }
  };

  const back = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  return { isStepValid, next, back };
}
