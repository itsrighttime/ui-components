import { useEffect, useRef, useState, useCallback } from "react";
import { loadFile, saveFile, deleteFile } from "../helper/indexedDb";

export function useFormPersistence(STORAGE_KEY, initialState, initialError) {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(initialError);
  const [currentStep, setCurrentStep] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const isLoadingRef = useRef(false);
  const mountedRef = useRef(true);

  // file helpers
  const isFileLike = (v) => v instanceof File || v instanceof Blob;
  const isFileArray = (v) =>
    Array.isArray(v) && v.every((it) => isFileLike(it));

  const saveFilesFromFormData = useCallback(
    async (data) => {
      const filesManifest = {};
      const promises = [];

      Object.entries(data).forEach(([key, value]) => {
        if (isFileLike(value)) {
          const fileKey = `${STORAGE_KEY}::${key}`;
          filesManifest[key] = fileKey;
          promises.push(saveFile(fileKey, value));
        } else if (isFileArray(value)) {
          const keys = value.map((_, i) => `${STORAGE_KEY}::${key}_${i}`);
          filesManifest[key] = keys;
          value.forEach((f, i) => promises.push(saveFile(keys[i], f)));
        }
      });

      await Promise.all(promises);
      return filesManifest;
    },
    [STORAGE_KEY]
  );

  const loadFilesFromManifest = useCallback(async (manifest = {}) => {
    const entries = await Promise.all(
      Object.entries(manifest).map(async ([fieldKey, manifestValue]) => {
        if (Array.isArray(manifestValue)) {
          const files = await Promise.all(
            manifestValue.map((k) => loadFile(k))
          );
          return [fieldKey, files.filter(Boolean)];
        } else {
          const file = await loadFile(manifestValue);
          return [fieldKey, file || null];
        }
      })
    );
    return Object.fromEntries(entries);
  }, []);

  // load on mount
  useEffect(() => {
    isLoadingRef.current = true;
    const loadAll = async () => {
      try {
        const savedRaw = localStorage.getItem(STORAGE_KEY);
        const saved = savedRaw ? JSON.parse(savedRaw) : {};

        let loadedFiles = {};
        if (saved.files) loadedFiles = await loadFilesFromManifest(saved.files);

        setFormData({
          ...initialState,
          ...(saved.formData || {}),
          ...loadedFiles,
        });
        setFormError(saved.formError || initialError);
        setCurrentStep(saved.currentStep || 0);
      } catch (e) {
        setFormData(initialState);
        setFormError(initialError);
      } finally {
        if (mountedRef.current) {
          setIsInitialized(true);
          isLoadingRef.current = false;
        }
      }
    };
    loadAll();
    return () => {
      mountedRef.current = false;
    };
  }, [STORAGE_KEY, initialState, initialError, loadFilesFromManifest]);

  // persist
  useEffect(() => {
    if (!isInitialized || isLoadingRef.current) return;
    let cancelled = false;

    const persist = async () => {
      const formDataSnapshot = {};
      Object.entries(formData).forEach(([k, v]) => {
        formDataSnapshot[k] = isFileLike(v) || isFileArray(v) ? null : v;
      });

      const manifest = await saveFilesFromFormData(formData);
      if (cancelled) return;

      const storageData = {
        formData: formDataSnapshot,
        formError,
        currentStep,
        files: manifest,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    };

    persist();
    return () => {
      cancelled = true;
    };
  }, [formData, formError, currentStep, isInitialized, saveFilesFromFormData]);

  return {
    formData,
    setFormData,
    formError,
    setFormError,
    currentStep,
    setCurrentStep,
    isFileLike,
    isFileArray,
  };
}
