// src/services/AITranslationProvider.js
export class AITranslationProvider {
  async generateAITranslation(key, language) {
    return;
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Translate the following text to ${language}: "${key}"`,
          max_tokens: 60,
        }),
      }
    );

    const data = await response.json();
    return data.choices[0].text.trim();
  }
}
