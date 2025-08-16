# `Translation` System – Integration Guide for Component Developers

This guide is meant for developers working inside a shared codebase or design system who want to **integrate multilingual translation functionality into components**. It covers how to **set up translations**, **use dynamic translation services**, and **maintain clean localization UX** across your feature modules.

## Purpose

The `Translation` system enables **multilingual support** in your components with:

- Static translations via **i18next**.
- Dynamic translations using **AI-generated translations** (like OpenAI).
- Easy language switching and custom translation fallback strategies.

## What’s Available

| Export                | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| `TranslationProvider` | Provider component to wrap your app and provide translations globally |
| `useTranslation`      | Custom hook to consume translations and language settings             |
| `I18nextProvider`     | Static translation provider using i18next                             |

You only need to **use `TranslationProvider` and `useTranslation`** in your feature components. `LocalizedButton` and `LocalizedInput` are auto-managed translation components.

## Step-by-Step Usage

### 1. Importing

<!--  const { TranslationProvider, useTranslation, I18nextProvider, AITranslationProvider } = -->

```js
import { UIContext } from "@itsrighttime/ui-components";

const { TranslationProvider, useTranslation, I18nextProvider } =
  UIContext.Translation;
```

### 2. Set Up Translations in Your Component

```jsx
const MyComponent = () => {
  const { translations, loading, changeLanguage } = useTranslation();

  const handleSave = () => {
    // Your save logic here...
    // Then show a localized button with the translation key "submit"
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>

      <LocalizedButton translationKey="submit" />
      <LocalizedInput translationKey="placeholder" />
    </>
  );
};
```

### 3. Wrapping Your App with `TranslationProvider`

To provide the translations globally, wrap your app in the `TranslationProvider`.

```jsx
const App = () => {
  return (
    <TranslationProvider
      initialLanguage="en"
      providers={{ translationProvider: new I18nextProvider() }}
    >
      <MyComponent />
    </TranslationProvider>
  );
};
```

#### Props for `TranslationProvider`:

- **`initialLanguage`**: (Optional) Set the default language for translations (default is `"en"`).
- **`providers`**: (Optional) Allows you to provide custom translation providers. By default, it uses `I18nextProvider` for static translations.

## `useTranslation()` Hook

This hook allows you to access the translation context within your components.

### Usage:

```js
const { translations, loading, changeLanguage } = useTranslation();
```

#### `translations`

- A key-value object of translations where each key corresponds to a translation value for the current language.

#### `loading`

- A boolean indicating whether translations are still being loaded.

#### `changeLanguage(language)`

- A function to change the app's current language.

### Example:

```jsx
const LanguageSwitcher = () => {
  const { changeLanguage } = useTranslation();

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
    </div>
  );
};
```

## `I18nextProvider` and `AITranslationProvider`

These are the providers for handling translations in different ways:

### 1. **i18nextProvider**

This provider uses **i18next** for static translations. You can use it by default or configure your own `i18next` instance.

#### Example usage:

```jsx
import { I18nextProvider } from "translation-library";

const app = (
  <TranslationProvider
    providers={{ translationProvider: new I18nextProvider() }}
  />
);
```

- **Installation**: You need to install `i18next` in your project if you're using the `I18nextProvider`.

```bash
npm install i18next
```

- **Setting up i18next**: Here's an example of how you can initialize `i18next`:

```js
import i18n from "i18next";

i18n.init({
  resources: {
    en: {
      translation: {
        submit: "Submit",
        placeholder: "Enter text...",
      },
    },
    fr: {
      translation: {
        submit: "Soumettre",
        placeholder: "Entrez du texte...",
      },
    },
  },
  lng: "en", // Default language
});
```

### 2. **AITranslationProvider**

This provider uses **AI-generated translations** (like OpenAI) to fetch dynamic translations.

#### Example usage:

```jsx
import { AITranslationProvider } from "translation-library";

const app = (
  <TranslationProvider
    providers={{ aiProvider: new AITranslationProvider() }}
  />
);
```

- **Custom AI Translation Logic**: You can replace the default logic of the `AITranslationProvider` to fit your preferred AI service (e.g., OpenAI).

## Advanced Configuration

You can configure the library to suit your needs, such as enabling multiple providers or customizing translation fallback behavior. For example:

### Combining Multiple Providers

You can configure both **static** and **dynamic** translation providers.

```jsx
const app = (
  <TranslationProvider
    providers={{
      translationProvider: new I18nextProvider(),
      aiProvider: new AITranslationProvider(),
    }}
  />
);
```

### Custom Translation Keys

You can specify custom translation keys for any component:

```jsx
<LocalizedButton translationKey="customSubmit" />
<LocalizedInput translationKey="customPlaceholder" />
```

## Customization

You can extend or modify the library to fit your specific use cases:

- **Adding New Providers**: Create custom translation providers (e.g., for backend translations) by implementing a provider class that adheres to the translation provider interface.
- **UI Customization**: Override or customize the `LocalizedButton` and `LocalizedInput` components to match your app's design.

## Design System Guidelines

As a component developer:

- **Do**: Use `useTranslation()` inside event handlers (e.g., button clicks, form submissions) to show translated text.
- **Don’t**: Call translation functions directly inside render logic or loops.
- **Clean Up**: The system handles the cleanup of translation keys automatically.
- **Consistency**: Keep translations consistent in structure and wording across your app.

## Tips for Consistent Integration

- Use `<TranslationProvider />` **once per page or layout**, ideally near the root of your app.
- **Avoid duplicate translations** for the same keys. Ensure that you de-duplicate if necessary.
- If you need additional fallback behavior (e.g., handling missing translations), the `TranslationProvider` is customizable to fit your requirements.

### Conclusion

With this library, you now have a powerful, reusable translation system that can easily be integrated into any React app. Whether you need static translations via `i18next` or dynamic translations from AI, this library provides a clean and maintainable way to handle multilingual support.

If you have any questions or need further help, feel free to reach out! Happy coding! 🎉
