import { useCallback } from "react";
import { VALIDITY } from "../helper/validity";

export function useFormNavigation(
  config,
  formError,
  currentStep,
  setCurrentStep
) {
  const isStepValid = useCallback(() => {
    const fields =
      config.mode === "multi"
        ? config.steps[currentStep].fields
        : config.fields;
    console.log("DDDD", formError);
    return fields.every((f) => formError[f.name] === VALIDITY.valid);
  }, [config, currentStep, formError]);

  const next = () => isStepValid() && setCurrentStep((s) => s + 1);
  const back = () => setCurrentStep((s) => Math.max(0, s - 1));

  return { isStepValid, next, back };
}
