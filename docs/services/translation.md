# Translator Developer Guide

A scalable, lightweight translation system built using JavaScript modules and React hooks — designed for large multilingual applications.

## Overview

This guide explains how to:

- Initialize the translator
- Define and organize translation keys
- Use translations in components
- Add new languages easily
- Maintain consistency with a single source of truth

## Folder Structure (Recommended)

```
src/
├── translator/
│   ├── keys/
│   │   ├── common.js
│   │   ├── header.js
│   │   └── index.js
│   ├── en/
│   │   ├── common.js
│   │   └── header.js
│   ├── fr/
│   │   ├── common.js
│   │   └── header.js
│   └── index.js
```

## Defining Translation Keys

### `translator/keys/common.js`

```js
export const BUTTON = {
  SUBMIT: "button.submit",
  CANCEL: "button.cancel",
  BOOK_NOW: "button.bookNow",
};
```

### `translator/keys/header.js`

```js
export const HEADER = {
  HOME: "header.home",
  ABOUT: "header.about",
  CONTACT: "header.contact",
};
```

### `translator/keys/index.js`

```js
export * from "./common";
export * from "./header";
```

Keys are reused throughout the app and translation files for consistency and safety during refactors.

## Adding Translation Values

### `translator/en/common.js`

```js
import { BUTTON } from "../keys/common";

export default {
  [BUTTON.SUBMIT]: "Submit",
  [BUTTON.CANCEL]: "Cancel",
  [BUTTON.BOOK_NOW]: "Book Now",
};
```

### `translator/fr/common.js`

```js
import { BUTTON } from "../keys/common";

export default {
  [BUTTON.SUBMIT]: "Soumettre",
  [BUTTON.CANCEL]: "Annuler",
  [BUTTON.BOOK_NOW]: "Réserver maintenant",
};
```

No duplicated key strings — values only. This ensures consistency.

## Master Translation Map

### `translator/index.js`

```js
import enCommon from "./en/common";
import enHeader from "./en/header";
import frCommon from "./fr/common";
import frHeader from "./fr/header";

export const translations = {
  en: {
    common: enCommon,
    header: enHeader,
  },
  fr: {
    common: frCommon,
    header: frHeader,
  },
};
```

## Initialization (One-Time)

### In `App.jsx` or `main.jsx`

```js
import { translator } from "@your-scope/simple-translator";
import { translations } from "./translator";

translator.init(translations, true); // true = enable debug mode
```

This must be called once before using the translation hook anywhere in your app.

## Using `useTranslator` Hook

```jsx
import { useTranslator } from "@your-scope/simple-translator";
import { BUTTON } from "#translator/keys";

const SubmitButton = () => {
  const { t, lang, changeLanguage } = useTranslator("common");

  return (
    <>
      <button>{t(BUTTON.SUBMIT)}</button>
      <button onClick={() => changeLanguage("fr")}>FR</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
    </>
  );
};
```

## Hook API

```ts
const {
  t, // Translate a key
  lang, // Current language
  changeLanguage, // Set a new language
  availableLanguages, // All supported language codes
} = useTranslator(namespaces);
```

- `t(key, overrideNamespace?)`: Translate a key
- `lang`: Current language
- `changeLanguage(langCode)`: Change language
- `availableLanguages`: Languages available in the initialized map

## Debugging Missing Keys

If debug mode is enabled during initialization, you will see warnings in the console like:

```
Translator: Missing key "button.delete" in namespace "common" [lang: en]
```

The fallback return will be the key string itself.

## Benefits of This Architecture

| Feature                      | Benefit                                       |
| ---------------------------- | --------------------------------------------- |
| Centralized translation keys | Reusable, consistent, and typo-proof          |
| JavaScript-based definitions | Enables logic, dynamic keys, and imports      |
| Hook-based API               | Fully reactive to language changes            |
| Debug mode                   | Easy to catch missing keys during development |
| Namespaces                   | Cleanly separated concerns for large apps     |

## Adding a New Language

1. Create a new folder: `translator/de/`
2. Add the same namespace files as existing languages
3. Use imported key constants in the value files
4. Update the master map in `translator/index.js`:

```js
import deCommon from "./de/common";
import deHeader from "./de/header";

export const translations = {
  en: { ... },
  fr: { ... },
  de: {
    common: deCommon,
    header: deHeader,
  },
};
```

## Best Practices

- Always define and use keys via `translator/keys`, never hardcoded
- Keep namespaces small and modular
- Use debug mode during development
- Centralize the translation map in one file
- Prefer `.js` over `.json` to use imports and constants
- Initialize only once in your application entry point

## Optional Add-ons

- Script to validate missing keys across languages
- Linter rule to block raw string keys in `t()` function
- LocalStorage or cookie-based language persistence
- Lazy-loaded namespaces for large-scale apps

Let me know if you want this as a pre-filled `README.md` for a reusable npm package template or help setting up some tooling for validation.
