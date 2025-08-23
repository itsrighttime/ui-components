// src/Translator.js

class Translator {
  constructor() {
    this.language = "en";
    this.translations = {};
    this.isDebug = false;
    this.isInitialized = false;
  }

  /**
   * Initialize translation map
   * @param {Object} translationMap - { en: { common: {}, ... }, fr: { ... } }
   * @param {Boolean} isDebug - Enable debug mode (default: false)
   */
  init(translationMap, isDebug = false) {
    this.translations = translationMap;
    this.language = Object.keys(translationMap)[0] || "en";
    this.isDebug = isDebug;
    this.isInitialized = true;
  }

  setLanguage(lang) {
    if (!this.isInitialized) {
      console.warn("Translator not initialized. Call translator.init() first.");
      return;
    }

    if (this.translations[lang]) {
      this.language = lang;
    } else if (this.isDebug) {
      console.warn(`Language "${lang}" not available.`);
    }
  }

  getLanguage() {
    return this.language;
  }

  getAvailableLanguages() {
    return Object.keys(this.translations);
  }

  /**
   * Translate a key from the current language
   * @param {string} key - Translation key
   * @param {string} namespace - Namespace (e.g., 'header')
   * @returns {string}
   */
  t(key, namespace = "common") {
    if (!this.isInitialized) {
      if (this.isDebug) {
        console.warn("Translator: Not initialized");
      }
      return key;
    }

    const langData = this.translations[this.language] || {};
    const ns = langData[namespace];

    const value = (ns && ns[key]) || key;

    if (this.isDebug && value === key) {
      console.warn(
        `Translator: Missing key "${key}" in namespace "${namespace}" [lang: ${this.language}]`
      );
    }

    return value;
  }
}

export const translator = new Translator();
