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

/**
 * GenericForm
 * - Persists simple fields in localStorage
 * - Persists files (single or arrays) in IndexedDB and stores a manifest in localStorage
 * - Restores both on load and merges with initial state
 *
 * Principles: KISS, modularity (small helpers), single responsibility for each function,
 * and clear async flow to avoid race conditions.
 */
const FORM_STATUS = {
  fill: "flling",
  error: "error",
  submited: "submitted",
  submitting: "submitting",
};
export function GenericForm({
  config,
  onSubmit,
  submitLabel = "Submit",
  style,
  settings = {},
}) {
  const mode = config.mode || "single";
  const STORAGE_KEY = `genericForm_${config.title || "form"}`;
  const [formStatus, setFormStatus] = useState(FORM_STATUS.fill);
  const [formStatusError, setFormStatusError] = useState({});

  useEffect(() => {
    registerValidations();
  }, []);

  // Prevent writes while loading
  const mountedRef = useRef(true);
  useEffect(() => () => (mountedRef.current = false), []);

  // Settings + style
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

  // build initial states
  const allFields = useMemo(
    () =>
      mode === "multi"
        ? config.steps.flatMap((s) => s[FPs.FIELDS])
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

  // persistence + navigation
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
    setCurrentStep
  );

  // change handler
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

  // submit
  const handleSubmit = async (e) => {
    setFormStatus(FORM_STATUS.submitting);
    e.preventDefault();

    const schema = configToSchema(config);
    const { valid, errors } = validateResponse(schema, formData);

    if (!valid) {
      setFormStatus(FORM_STATUS.error);
      setFormStatusError(errors);
      return;
    }

    // clear storage on success
    try {
      localStorage.removeItem(STORAGE_KEY);
      Object.keys(formData).forEach(async (k) => {
        const v = formData[k];
        if (isFileLike(v)) await deleteFile(`${STORAGE_KEY}::${k}`);
        if (isFileArray(v)) {
          v.forEach(
            async (_, idx) => await deleteFile(`${STORAGE_KEY}::${k}_${idx}`)
          );
        }
      });
      onSubmit(formData);

      // Reset everything

      setFormStatus(FORM_STATUS.submited);
    } catch (err) {
      console.warn("GenericForm: failed to clear storage after submit", err);
    }
  };

  // Fields to render for current step
  const fieldsToRender =
    mode === "multi"
      ? config.steps[currentStep][FPs.FIELDS]
      : config[FPs.FIELDS];

  if (formStatus === FORM_STATUS.submitting)
    return <Loading color={color} text="Submitting" showText />;

  if (formStatus === FORM_STATUS.error)
    return (
      <ErrorList
        errors={formStatusError}
        color={color}
        onClick={() => setFormStatus(FORM_STATUS.fill)}
      />
    );

  if (formStatus === FORM_STATUS.submited)
    return <SuccessMessage color={color} onHomeClick={"/"} />;

  // ------------------ Render ------------------
  return (
    <div className={styles.formWrapper}>
      <form
        className={styles.form}
        style={formStyle}
        onSubmit={(e) => e.preventDefault()}
      >
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
            key={field[FPs.NAME]}
            field={field}
            value={formData}
            onChange={handleChange}
            settings={_settings}
          />
        ))}

        <div className={styles.footer}>
          {mode === "multi" && config.steps.length > 1 ? (
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

              {currentStep < config.steps.length - 1 ? (
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
            mode === "single" && (
              <Button text={submitLabel} onClick={handleSubmit} color={color} />
            )
          )}

          {mode === "multi" && (
            <>
              <div className={styles.progressBarWrapper}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${
                      ((currentStep + 1) / config.steps.length) * 100
                    }%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <div className={styles.progressStatus}>
                Step {currentStep + 1} of {config.steps.length}
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
