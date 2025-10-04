import { useCallback } from "react";
import { VALIDITY } from "../helper/validity";
import { FIELDS_PROPS as FPs } from "../validation/helper/fields";
import { isConditional } from "./conditional";

export function useFormNavigation(
  config,
  formData,
  formError,
  currentStep,
  setCurrentStep
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

  const next = () => isStepValid() && setCurrentStep((s) => s + 1);
  const back = () => setCurrentStep((s) => Math.max(0, s - 1));

  return { isStepValid, next, back };
}
