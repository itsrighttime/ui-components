// src/useTranslator.js
import { useState, useEffect } from "react";
import { translator } from "./Translator.js";

/**
 * React hook for accessing translations
 * @param {string|string[]} defaultNamespaces - One or more namespaces to search
 */
export const useTranslator = (defaultNamespaces = "common") => {
  const [lang, setLang] = useState(translator.getLanguage());

  useEffect(() => {
    if (!translator.isInitialized) {
      throw new Error(
        `[useTranslator] Translator is not initialized. Call translator.init(translations) before using this hook.`
      );
    }
  }, []);

  const nsList = Array.isArray(defaultNamespaces)
    ? defaultNamespaces
    : [defaultNamespaces];

  const changeLanguage = (newLang) => {
    translator.setLanguage(newLang);
    setLang(newLang);
  };

  /**
   * Translates a key using namespaces
   * @param {string} key
   * @param {string} [overrideNs] - optional namespace override
   */
  const t = (key, overrideNs) => {
    if (overrideNs) {
      return translator.t(key, overrideNs);
    }

    for (const ns of nsList) {
      const translated = translator.t(key, ns, true); // suppress debug here
      if (translated !== key) return translated;
    }

    // If we get here, key is missing in all namespaces
    if (translator.isDebug) {
      console.warn(
        `Translator: Missing key "${key}" in namespaces [${nsList.join(
          ", "
        )}] [lang: ${lang}]`
      );
    }

    return key;
  };

  return {
    t,
    lang,
    changeLanguage,
    availableLanguages: translator.getAvailableLanguages(),
  };
};
