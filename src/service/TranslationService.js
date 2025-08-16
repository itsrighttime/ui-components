// src/services/translationService.js
class TranslationService {
  constructor(translationProvider, aiProvider, useAITranslation = true) {
    this.translationProvider = translationProvider;
    this.aiProvider = aiProvider;
    this.useAITranslation = useAITranslation;
  }

  async getTranslation(key, language) {
    const translation = await this.translationProvider.getTranslation(
      key,
      language
    );

    if (!translation && this.useAITranslation) {
      return this._getAITranslation(key, language);
    }

    return { text: translation, aiGenerated: false };
  }

  async _getAITranslation(key, language) {
    const aiTranslation = await this.aiProvider.generateAITranslation(
      key,
      language
    );
    return { text: aiTranslation, aiGenerated: true };
  }
}

export { TranslationService };
