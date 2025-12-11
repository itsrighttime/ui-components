import { useCallback } from "react";
import { VALIDITY } from "../helper/validity.js";
import { FIELDS_PROPS as FPs } from "../validation/helper/fields.js";
import { isConditional } from "../validation/isConditional.js";
import { validateResponse } from "../validation/validateResponse.js";
import { FORM_STATUS } from "../helper/formStatus.js";

export function useFormNavigation(
  config,
  formData,
  formError,
  currentStep,
  setCurrentStep,
  addAlert,
  setFormStatus,
  setFormStatusError,
  scrollRef
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
      // Scroll to top of container (smooth)
      if (scrollRef?.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setFormStatus(FORM_STATUS.error);
      setFormStatusError(errors);
    }
  };

  const back = () => {
    setCurrentStep((s) => Math.max(0, s - 1));

    // Scroll to top of container (smooth)
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return { isStepValid, next, back };
}
