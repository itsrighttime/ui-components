import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../../../InputFields/Actions/jsx/Button";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { arrowLeftIcon, arrowRightIcon } from "../../../utils/icons";
import styles from "../css/GenericForm.module.css";
import { deleteFile } from "../helper/indexedDb";
import { useFormNavigation } from "./useFormNavigation";
import { useFormPersistence } from "./useFormPersistence";
import { registerValidations } from "../validation/registerValidations";
import { VALIDITY } from "../helper/validity";
import { FIELDS_PROPS as FPs } from "../validation/helper/fields";
import { validateResponse } from "../validation/validateResponse";
import { configToSchema } from "../validation/configToSchema";
import { Loading } from "../../../SpecialPages/js/Loading";
import { ErrorList } from "./ShowError";
import { SuccessMessage } from "./SuccessMessage";
import { submitToBackend } from "./submitTobackend";
import { useAlerts } from "../../../Hooks/useAlert";
import { AlertContainer } from "../../../Alert/js/AlertContainer";

const FORM_STATUS = {
  fill: "filling",
  error: "error",
  submitted: "submitted",
  submitting: "submitting",
  failed: "failed",
};

export function GenericForm({
  config,
  onSubmit, // optional external callback
  submitLabel = "Submit",
  style,
  settings = {},
}) {
  const mode = config.mode || "single";
  const STORAGE_KEY = `genericForm_${config.title || "form"}`;
  const [formStatus, setFormStatus] = useState(FORM_STATUS.fill);
  const [formStatusError, setFormStatusError] = useState({});
  const { alertContainer, addAlert, removeAlert } = useAlerts();
  const mountedRef = useRef(true);

  // --- Mount lifecycle ---
  useEffect(() => {
    registerValidations();
    return () => (mountedRef.current = false);
  }, []);

  // --- Configurable styling ---
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
    border: _settings.border,
    borderRadius: _settings.borderRadius,
    ...style,
  };

  const color = _settings.color;

  // --- Build initial state ---
  const allFields = useMemo(
    () =>
      mode === "multi"
        ? config[FPs.STEP].flatMap((s) => s[FPs.FIELDS])
        : config[FPs.FIELDS],
    [config, mode]
  );

  const { initialState, initialError } = useMemo(() => {
    const state = {},
      errors = {};
    allFields.forEach((f) => {
      state[f[FPs.NAME]] = f[FPs.VALUE] ?? (f[FPs.REPEATABLE] ? [{}] : "");
      errors[f[FPs.NAME]] = f[FPs.REQUIRED] ? VALIDITY.invalid : VALIDITY.valid;
    });
    return { initialState: state, initialError: errors };
  }, [allFields]);

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
  } = useFormPersistence(STORAGE_KEY, initialState, initialError);

  const { next, back } = useFormNavigation(
    config,
    formData,
    formError,
    currentStep,
    setCurrentStep,
    addAlert
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

  // --- Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(FORM_STATUS.submitting);

    const schema = configToSchema(config);
    const { valid, errors } = validateResponse(schema, formData);

    if (!valid) {
      setFormStatus(FORM_STATUS.error);
      setFormStatusError(errors);
      return;
    }

    try {
      // 1 Submit to backend
      const response = await submitToBackend(formData, config?.[FPs.ENDPOINT]);

      // 2 If success → clear data
      if (response?.success) {
        localStorage.removeItem(STORAGE_KEY);
        for (const k of Object.keys(formData)) {
          const v = formData[k];
          if (isFileLike(v)) await deleteFile(`${STORAGE_KEY}::${k}`);
          if (isFileArray(v)) {
            for (let idx = 0; idx < v.length; idx++)
              await deleteFile(`${STORAGE_KEY}::${k}_${idx}`);
          }
        }

        // 3 Trigger external callback if any
        if (onSubmit) onSubmit(formData);
        setFormStatus(FORM_STATUS.submitted);
        addAlert(
          `${config[FPs.TITLE] || "Deatils"} Submitted Successfully`,
          "success"
        );
      } else {
        setFormStatus(FORM_STATUS.failed);

        setFormStatusError(
          response.data || {
            general: { error: response?.message || "Submission failed" },
          }
        );
        addAlert(`Resolve the errors and submit again`, "error");
      }
    } catch (err) {
      console.error("Form submit failed:", err);
      setFormStatus(FORM_STATUS.failed);
      setFormStatusError({
        general: { error: err.message || "Network error" },
      });
      addAlert(`Resolve the errors and submit again`, "error");
    }
  };

  // --- Determine fields for current step ---
  const fieldsToRender =
    mode === "multi"
      ? config[FPs.STEP][currentStep][FPs.FIELDS]
      : config[FPs.FIELDS];

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
        <div className={styles.stepHeader}>
          <h3>{config[FPs.TITLE]}</h3>
          {config[FPs.DESCRIPTION] && <p>{config[FPs.DESCRIPTION]}</p>}
        </div>

        {mode === "multi" && (
          <div className={styles.stepHeader}>
            <h3>{config[FPs.STEP][currentStep][FPs.TITLE]}</h3>
            {config[FPs.STEP][currentStep][FPs.DESCRIPTION] && (
              <p>{config[FPs.STEP][currentStep][FPs.DESCRIPTION]}</p>
            )}
          </div>
        )}

        {fieldsToRender.map((field) => (
          <FieldRenderer
            key={field[FPs.NAME]}
            field={field}
            value={formData}
            onChange={handleChange}
            settings={_settings}
          />
        ))}

        <div className={styles.footer}>
          {mode === "multi" && config[FPs.STEP].length > 1 ? (
            <div className={styles.stepButtons}>
              {currentStep > 0 && (
                <IconButton
                  icon={arrowLeftIcon}
                  label="Back"
                  onClick={back}
                  size="2"
                  color={color}
                />
              )}
              {currentStep < config[FPs.STEP].length - 1 ? (
                <IconButton
                  icon={arrowRightIcon}
                  label="Next"
                  onClick={next}
                  size="2"
                  color={color}
                />
              ) : (
                <Button
                  text={submitLabel}
                  onClick={handleSubmit}
                  color={color}
                />
              )}
            </div>
          ) : (
            <Button text={submitLabel} onClick={handleSubmit} color={color} />
          )}

          {mode === "multi" && (
            <>
              <div className={styles.progressBarWrapper}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${
                      ((currentStep + 1) / config[FPs.STEP].length) * 100
                    }%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <div className={styles.progressStatus}>
                Step {currentStep + 1} of {config[FPs.STEP].length}
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
