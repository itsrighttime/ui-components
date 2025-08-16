// src/context/TranslationContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { TranslationService } from "../../service/translationService";
import { I18nextProvider } from "../../service/I18nextProvider";
import { AITranslationProvider } from "../../service/AITranslationProvider";

// Create Context
const TranslationContext = createContext();

// Create a custom hook to use the context
export const useTranslation = () => {
  return useContext(TranslationContext);
};

// The Provider Component
export const TranslationProvider = ({
  children,
  initialLanguage = "en",
  providers,
}) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  // Instantiate translation service with passed-in providers
  const translationService = new TranslationService(
    providers.translationProvider || new I18nextProvider(),
    providers.aiProvider || new AITranslationProvider()
  );

  // Fetch translations when language changes
  useEffect(() => {
    const fetchTranslations = async () => {
      const keys = ["welcome", "submit", "placeholder"]; // Example keys
      const loadedTranslations = {};

      for (const key of keys) {
        const result = await translationService.getTranslation(key, language);
        loadedTranslations[key] = result;
      }

      setTranslations(loadedTranslations);
      setLoading(false); // Set loading to false after translations are fetched
    };

    fetchTranslations();
  }, [language, translationService]);

  // Handle language change
  const changeLanguage = (lang) => {
    setLoading(true); // Show loading state while fetching translations
    setLanguage(lang);
  };

  // Provide context value to children components
  const contextValue = {
    language,
    translations,
    loading,
    changeLanguage,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
