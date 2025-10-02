import { useState, useEffect, useMemo } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../../../InputFields/Actions/jsx/Button";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { arrowLeftIcon, arrowRightIcon } from "../../../utils/icons";
import styles from "../css/GenericForm.module.css";

export function GenericForm({
  config,
  onSubmit,
  submitLabel = "Submit",
  style,
  settings = {},
}) {
  const VALIDITY = { VALID: "valid", INVALID: "invalid" };
  const mode = config.mode || "single";

  const STORAGE_KEY = `genericForm_${config.title || "form"}`;

  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // merge default settings with overrides
  const _settings = {
    showLabelAlways: false,
    gap: "2rem",
    color: "var(--colorCyan)",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--colorWhite)",
    textColor: "var(--colorSimple)",
    labelColor: "var(--colorGray4)",
    border: "none",
    borderRadius: "5px",
    ...settings,
  };

  const formStyle = {
    gap: _settings.gap,
    width: _settings.width,
    height: _settings.height,
    // backgroundColor: _settings.backgroundColor,
    border: _settings.border,
    borderRadius: _settings.borderRadius,
    ...style,
  };

  const color = _settings.color;

  // all fields (single or flattened multi-step)
  const allFields = useMemo(
    () =>
      mode === "multi" ? config.steps.flatMap((s) => s.fields) : config.fields,
    [config, mode]
  );

  // build initial state + error state
  const { initialState, initialError } = useMemo(() => {
    const state = {};
    const errors = {};
    allFields.forEach((f) => {
      state[f.name] = f.defaultValue ?? (f.repeatable ? [{}] : "");
      errors[f.name] = f.required ? VALIDITY.INVALID : VALIDITY.VALID;
    });
    return { initialState: state, initialError: errors };
  }, [allFields]);

  // initialize / load saved state once
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.formData || initialState);
      setFormError(parsed.formError || initialError);
      setCurrentStep(parsed.currentStep || 0);
    } else {
      setFormData(initialState);
      setFormError(initialError);
    }
    setIsInitialized(true); // mark as ready
  }, [initialState, initialError]);

  // persist to localStorage (only after init is complete)
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ formData, formError, currentStep })
    );
  }, [formData, formError, currentStep, isInitialized]);

  const handleChange = (name, value, isError) => {
    !isError && setFormData((prev) => ({ ...prev, [name]: value }));

    setFormError((prev) => {
      if (isError) {
        return { ...prev, [name]: value ? VALIDITY.VALID : VALIDITY.INVALID };
      }

      const isInitialValid =
        value === initialState[name] && initialError[name] === VALIDITY.VALID;

      return { ...prev, [name]: isInitialValid ? VALIDITY.VALID : prev[name] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    localStorage.removeItem(STORAGE_KEY); // clear after successful submit
  };

  // validate step fields
  const isStepValid = () => {
    const stepFields =
      mode === "multi" ? config.steps[currentStep].fields : config.fields;

    return stepFields.every(
      (field) => formError[field.name] === VALIDITY.VALID
    );
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep((s) => s + 1);
    } else {
      alert("Please complete all required fields in this step.");
    }
  };

  const fieldsToRender =
    mode === "multi" ? config.steps[currentStep].fields : config.fields;

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} style={formStyle}>
        <div className={styles.stepHeader}>
          <h2>{config.title}</h2>
          {config.description && <p>{config.description}</p>}
        </div>

        {mode === "multi" && (
          <div className={styles.stepHeader}>
            <h2>{config.steps[currentStep].title}</h2>
            {config.steps[currentStep].description && (
              <p>{config.steps[currentStep].description}</p>
            )}
          </div>
        )}

        {fieldsToRender.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={formData}
            onChange={handleChange}
            settings={_settings}
          />
        ))}

        {mode === "multi" && config.steps.length > 1 ? (
          <div className={styles.stepButtons}>
            {currentStep > 0 && (
              <IconButton
                icon={arrowLeftIcon}
                label="Back"
                onClick={() => setCurrentStep((s) => s - 1)}
                size="2"
                color={color}
              />
            )}
            {currentStep < config.steps.length - 1 ? (
              <IconButton
                icon={arrowRightIcon}
                label="Next"
                onClick={handleNext}
                size="2"
                color={color}
              />
            ) : (
              <Button text={submitLabel} onClick={handleSubmit} color={color} />
            )}
          </div>
        ) : (
          mode === "single" && (
            <Button text={submitLabel} onClick={handleSubmit} color={color} />
          )
        )}

        {mode === "multi" && (
          <>
            <div className={styles.progressStatus}>
              Step {currentStep + 1} of {config.steps.length}
            </div>
            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${((currentStep + 1) / config.steps.length) * 100}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
