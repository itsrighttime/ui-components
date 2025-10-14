import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FieldRenderer } from "./FieldRenderer";
import styles from "../css/GenericForm.module.css";
import { useFormNavigation } from "../hooks/useFormNavigation";
import { useFormPersistence } from "../hooks/useFormPersistence";
import { registerValidations } from "../validation/registerValidations";
import { VALIDITY } from "../helper/validity";
import { FIELDS_PROPS as FPs } from "../validation/helper/fields";
import { Loading } from "../../../SpecialPages/js/Loading";
import { ErrorList } from "./ShowError";
import { SuccessMessage } from "./SuccessMessage";
import { useAlerts } from "../../../Hooks/useAlert";
import { AlertContainer } from "../../../Alert/js/AlertContainer";
import { useInitializeForm } from "../hooks/useInitializeForm";
import { FormFooter } from "./FormFooter";
import { FORM_STATUS } from "../helper/formStatus";
import { useFormSettings } from "../hooks/useFormSettings";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { isValidFormStructure } from "../validation/isValidFormStructure";
import { validateSchema } from "../validation/validateSchema";
import { configToSchema } from "../validation/configToSchema";

export function GenericForm({
  config,
  onSubmit, // optional external callback
  submitLabel = "Submit",
  style,
  settings = {},
  scrollRef = null,
}) {
  const mode = config.mode || "single";
  const STORAGE_KEY = `genericForm_${config.title || "form"}`;
  const [formStatus, setFormStatus] = useState(FORM_STATUS.fill);
  const [formStatusError, setFormStatusError] = useState({});
  const mountedRef = useRef(true);

  // --- Alerts & Notifications ---
  const { alertContainer, addAlert, removeAlert } = useAlerts();

  // --- Mount lifecycle ---
  useEffect(() => {
    registerValidations();
    return () => (mountedRef.current = false);
  }, []);

  // --- Styling Configuration ---
  const { _settings, formStyle } = useFormSettings(settings, style);
  const color = _settings.color;

  // --- Compute All Fields (single/multi mode) ---
  const allFields = useMemo(
    () =>
      mode === "multi"
        ? config[FPs.STEP].flatMap((s) => s[FPs.FIELDS])
        : config[FPs.FIELDS],
    [config, mode]
  );

  // --- Initialize Field States ---
  const { initialState, initialError } = useInitializeForm(allFields);

  // --- Persistence & navigation ---
  const {
    formData,
    setFormData,
    formError,
    setFormError,
    currentStep,
    setCurrentStep,
    isFileLike,
    isFileArray,
    clearFormPersistence,
  } = useFormPersistence(STORAGE_KEY, initialState, initialError);

  const { next, back } = useFormNavigation(
    config,
    formData,
    formError,
    currentStep,
    setCurrentStep,
    addAlert,
    setFormStatus,
    setFormStatusError,
    scrollRef
  );

  // --- Change handler ---
  const handleChange = useCallback(
    (name, value, isError) => {
      if (!isError) setFormData((prev) => ({ ...prev, [name]: value }));
      setFormError((prev) => ({
        ...prev,
        [name]: isError
          ? value
            ? VALIDITY.valid
            : VALIDITY.invalid
          : prev[name],
      }));
    },
    [setFormData, setFormError]
  );

  // --- Submit Handler (delegated to hook) ---
  const { handleSubmit } = useFormSubmit({
    config,
    formData,
    setFormStatus,
    setFormStatusError,
    addAlert,
    onSubmit,
    STORAGE_KEY,
    isFileLike,
    isFileArray,
  });

  // --- Determine fields for current step ---
  const fieldsToRender =
    mode === "multi"
      ? config[FPs.STEP][currentStep][FPs.FIELDS]
      : config[FPs.FIELDS];

  const _isValidFormStructure = isValidFormStructure(config);
  let validStructure = false;
  if (_isValidFormStructure) {
    const schema = configToSchema(config);
    const { valid, errors } = validateSchema(schema);
    validStructure = valid;
  }

  if (!validStructure) {
    return (
      <div className={styles.formWrapper}>
        <SuccessMessage
          color={"var(--colorRed)"}
          message="Something wrong with the structure, contact to admin!"
          onHomeClick={() => (window.location.href = "/")}
          title="ERROR !!!"
        />
      </div>
    );
  }

  // --- Conditional UI states ---
  if (formStatus === FORM_STATUS.submitting)
    return (
      <div className={styles.formWrapper}>
        <div className={styles.loading}>
          <Loading color={color} text="Submitting..." showText />
        </div>
      </div>
    );

  if (formStatus === FORM_STATUS.error)
    return (
      <div className={styles.formWrapper}>
        <ErrorList
          errors={formStatusError}
          color={color}
          onClick={() => setFormStatus(FORM_STATUS.fill)}
          clearFormPersistence={clearFormPersistence}
        />
      </div>
    );

  if (formStatus === FORM_STATUS.failed)
    return (
      <div className={styles.formWrapper}>
        <ErrorList
          errors={formStatusError}
          color={"var(--colorRed)"}
          onClick={() => setFormStatus(FORM_STATUS.fill)}
          clearFormPersistence={clearFormPersistence}
        />
      </div>
    );

  if (formStatus === FORM_STATUS.submitted)
    return (
      <div className={styles.formWrapper}>
        <SuccessMessage
          color={color}
          message="Your form has been submitted successfully!"
          onHomeClick={() => (window.location.href = "/")}
        />
      </div>
    );

  // --- Default form rendering ---
  return (
    <div className={styles.formWrapper}>
      <AlertContainer
        alertContainer={alertContainer}
        removeAlert={removeAlert}
      />

      <form className={styles.form} style={formStyle} onSubmit={handleSubmit}>
        {/* Form Header */}
        <div className={styles.stepHeader}>
          <h3>{config[FPs.TITLE]}</h3>
          {config[FPs.DESCRIPTION] && <p>{config[FPs.DESCRIPTION]}</p>}
        </div>

        {/* Step Header (for multi-step) */}
        {mode === "multi" && (
          <div className={styles.stepHeader}>
            <h3>{config[FPs.STEP][currentStep][FPs.TITLE]}</h3>
            {config[FPs.STEP][currentStep][FPs.DESCRIPTION] && (
              <p>{config[FPs.STEP][currentStep][FPs.DESCRIPTION]}</p>
            )}
          </div>
        )}

        {/* Field Renderer */}
        {fieldsToRender.map((field) => (
          <FieldRenderer
            key={field[FPs.NAME]}
            field={field}
            value={formData}
            onChange={handleChange}
            settings={_settings}
          />
        ))}

        {/* Footer Buttons & Progress */}
        <FormFooter
          mode={mode}
          config={config}
          currentStep={currentStep}
          color={color}
          submitLabel={submitLabel}
          next={next}
          back={back}
          handleSubmit={handleSubmit}
          clearFormPersistence={clearFormPersistence}
        />
      </form>
    </div>
  );
}
