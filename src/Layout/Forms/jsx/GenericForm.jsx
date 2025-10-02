import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../../../InputFields/Actions/jsx/Button";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { arrowLeftIcon, arrowRightIcon } from "../../../utils/icons";
import styles from "../css/GenericForm.module.css";
import { loadFile, saveFile, deleteFile } from "../helper/indexedDb";

/**
 * GenericForm
 * - Persists simple fields in localStorage
 * - Persists files (single or arrays) in IndexedDB and stores a manifest in localStorage
 * - Restores both on load and merges with initial state
 *
 * Principles: KISS, modularity (small helpers), single responsibility for each function,
 * and clear async flow to avoid race conditions.
 */
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

  // Prevent writes while loading
  const isLoadingRef = useRef(false);
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

  // Flatten fields for single or multi mode
  const allFields = useMemo(
    () =>
      mode === "multi" ? config.steps.flatMap((s) => s.fields) : config.fields,
    [config, mode]
  );

  // Build initial state and error map
  const { initialState, initialError } = useMemo(() => {
    const state = {};
    const errors = {};
    allFields.forEach((f) => {
      state[f.name] = f.defaultValue ?? (f.repeatable ? [{}] : "");
      errors[f.name] = f.required ? VALIDITY.INVALID : VALIDITY.VALID;
    });
    return { initialState: state, initialError: errors };
  }, [allFields]);

  // ---------- Helper: Detect file-like objects ----------
  const isFileLike = (v) => v instanceof File || v instanceof Blob;
  const isFileArray = (v) =>
    Array.isArray(v) && v.every((it) => isFileLike(it));

  // ---------- Helper: Build manifest & save files to IndexedDB ----------
  // Returns an object mapping fieldKey -> key or array of keys for persisted files
  const saveFilesFromFormData = useCallback(
    async (data) => {
      const filesManifest = {}; // { fieldKey: 'fieldKey' | ['fieldKey_0','fieldKey_1'] }
      const savePromises = [];

      Object.entries(data).forEach(([key, value]) => {
        if (isFileLike(value)) {
          // single file
          const fileKey = `${STORAGE_KEY}::${key}`; // unique-ish key
          filesManifest[key] = fileKey;
          savePromises.push(saveFile(fileKey, value));
        } else if (isFileArray(value)) {
          // multiple files
          const keys = value.map((_, idx) => `${STORAGE_KEY}::${key}_${idx}`);
          filesManifest[key] = keys;
          value.forEach((file, idx) => {
            savePromises.push(saveFile(keys[idx], file));
          });
        }
        // else: not a file -> nothing to do
      });

      // wait for all saves to finish
      await Promise.all(savePromises);
      return filesManifest;
    },
    [STORAGE_KEY]
  );

  // ---------- Helper: Load files from manifest ----------
  // Accepts manifest shape { fieldKey: key | [keys] } and returns { fieldKey: File | [File] }
  const loadFilesFromManifest = useCallback(async (manifest = {}) => {
    const entries = await Promise.all(
      Object.entries(manifest).map(async ([fieldKey, manifestValue]) => {
        if (Array.isArray(manifestValue)) {
          // multiple
          const files = await Promise.all(
            manifestValue.map((k) => loadFile(k))
          );
          return [fieldKey, files.filter(Boolean)]; // drop any missing
        } else {
          const file = await loadFile(manifestValue);
          return [fieldKey, file || null];
        }
      })
    );
    return Object.fromEntries(entries);
  }, []);

  // ---------- LOAD on mount: localStorage + IndexedDB ----------
  useEffect(() => {
    isLoadingRef.current = true;

    const loadAll = async () => {
      try {
        const savedRaw = localStorage.getItem(STORAGE_KEY);
        const saved = savedRaw ? JSON.parse(savedRaw) : {};

        // load files from indexed db if manifest present
        let loadedFiles = {};
        if (saved.files && Object.keys(saved.files).length) {
          loadedFiles = await loadFilesFromManifest(saved.files);
        }

        // merge: initialState <- saved.formData <- loadedFiles
        const merged = {
          ...initialState,
          ...(saved.formData || {}),
          ...loadedFiles,
        };

        if (!mountedRef.current) return;
        setFormData(merged);
        setFormError(saved.formError || initialError);
        setCurrentStep(saved.currentStep || 0);
      } catch (err) {
        // fail gracefully: fallback to initial state
        console.error("GenericForm: failed to load saved state", err);
        if (mountedRef.current) {
          setFormData(initialState);
          setFormError(initialError);
          setCurrentStep(0);
        }
      } finally {
        if (mountedRef.current) {
          setIsInitialized(true);
          isLoadingRef.current = false;
        }
      }
    };

    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState, initialError]);

  // ---------- PERSIST whenever formData/formError/currentStep changes (after init) ----------
  // We save files into IndexedDB and then store a lightweight snapshot (without binary)
  useEffect(() => {
    if (!isInitialized || isLoadingRef.current) return;

    let cancelled = false;
    const persist = async () => {
      try {
        // Build snapshot of non-file formData to store in localStorage
        const formDataSnapshot = {};
        // make a shallow copy but strip file objects (replace with null so snapshot is JSON-safe)
        Object.entries(formData).forEach(([k, v]) => {
          if (isFileLike(v) || isFileArray(v)) {
            formDataSnapshot[k] = null;
          } else {
            formDataSnapshot[k] = v;
          }
        });

        // Save files to IndexedDB (if any)
        const manifest = await saveFilesFromFormData(formData);

        if (cancelled) return;

        const storageData = {
          formData: formDataSnapshot,
          formError,
          currentStep,
          files: manifest, // manifest describes keys inside IndexedDB
          savedAt: Date.now(),
        };

        // finally write snapshot
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
      } catch (err) {
        console.error("GenericForm: persist error", err);
      }
    };

    persist();

    return () => {
      cancelled = true;
    };
  }, [formData, formError, currentStep, isInitialized, saveFilesFromFormData]);

  // ---------- Public API: handleChange ----------
  // name: field name; value: any; isError: boolean (when coming from FieldRenderer)
  const handleChange = useCallback(
    (name, value, isError) => {
      // update formData only if not a validation call (isError indicates validation feedback)
      if (!isError) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }

      // update error map
      setFormError((prev) => {
        if (isError) {
          return { ...prev, [name]: value ? VALIDITY.VALID : VALIDITY.INVALID };
        }
        const isInitialValid =
          value === initialState[name] && initialError[name] === VALIDITY.VALID;
        return {
          ...prev,
          [name]: isInitialValid ? VALIDITY.VALID : prev[name],
        };
      });
    },
    [initialState, initialError]
  );

  // submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // onSubmit might upload files from formData; give caller full formData
      await onSubmit(formData);

      // clear storage on success
      try {
        localStorage.removeItem(STORAGE_KEY);
        // optionally delete files from IndexedDB too — depends on your desired semantics
        // If you want to remove files on submit uncomment below (careful: expensive).
        // Object.keys(formData).forEach(async (k) => {
        //   const v = formData[k];
        //   if (isFileLike(v)) await deleteFile(`${STORAGE_KEY}::${k}`);
        //   if (isFileArray(v)) {
        //     v.forEach((_, idx) => deleteFile(`${STORAGE_KEY}::${k}_${idx}`));
        //   }
        // });
      } catch (err) {
        console.warn("GenericForm: failed to clear storage after submit", err);
      }
    },
    [formData, onSubmit]
  );

  // Step validation
  const isStepValid = useCallback(() => {
    const stepFields =
      mode === "multi" ? config.steps[currentStep].fields : config.fields;
    return stepFields.every(
      (field) => formError[field.name] === VALIDITY.VALID
    );
  }, [config, currentStep, mode, formError]);

  const handleNext = useCallback(() => {
    if (isStepValid()) {
      setCurrentStep((s) => s + 1);
    } else {
      // UX: your app may want a nicer error UI rather than alert
      alert("Please complete all required fields in this step.");
    }
  }, [isStepValid]);

  // Fields to render for current step
  const fieldsToRender =
    mode === "multi" ? config.steps[currentStep].fields : config.fields;

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
