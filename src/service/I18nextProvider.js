// src/services/I18nextProvider.js
import i18n from "i18next";

export class I18nextProvider {
  async getTranslation(key, language) {
    await i18n.loadLanguages(language);
    return i18n.t(key);
  }
}
