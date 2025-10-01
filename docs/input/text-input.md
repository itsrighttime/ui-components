# `TextField` Developer Guide

The `TextField` component is a highly customizable input field designed for form inputs with built-in **validation**, **icons**, **prefix/suffix**, **pattern checks**, **length restrictions**, and more.

## Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { TextField } = UIInputs.Text;
```

---

## Props Reference

| Prop                   | Type        | Default              | Description                                                      |
| ---------------------- | ----------- | -------------------- | ---------------------------------------------------------------- |
| `type`                 | `string`    | `"text"`             | Input type (`text`, `password`, `email`, etc.)                   |
| `label`                | `string`    | —                    | Label text shown above input (when focused or `showLabelAlways`) |
| `placeholder`          | `string`    | `label`              | Placeholder shown inside input                                   |
| `value`                | `string`    | `""`                 | Controlled value of input                                        |
| `setResult`            | `function`  | —                    | Callback to receive trimmed final value (after `onBlur`)         |
| `setIsFieldValid`      | `function`  | `() => {}`           | Callback to return input validity status                         |
| `color`                | `string`    | `"var(--colorCyan)"` | Accent color (border, label, etc.)                               |
| `required`             | `boolean`   | `false`              | If true, marks input as required                                 |
| `minLength`            | `number`    | —                    | Minimum number of characters                                     |
| `maxLength`            | `number`    | —                    | Maximum number of characters                                     |
| `pattern`              | `string`    | —                    | Regex pattern to validate input                                  |
| `errorMessage`         | `string`    | `"Invalid Input"`    | Custom error message                                             |
| `autoComplete`         | `string`    | `"off"`              | Browser autocomplete setting                                     |
| `disabled`             | `boolean`   | `false`              | Disables input                                                   |
| `prefix`               | `ReactNode` | —                    | Element to render before input                                   |
| `suffix`               | `ReactNode` | —                    | Element to render after input                                    |
| `showCharacterCount`   | `boolean`   | `false`              | Shows character count (`current/max`)                            |
| `spellCheck`           | `boolean`   | `false`              | Enables browser spellchecking                                    |
| `ariaLabel`            | `string`    | —                    | For screen readers accessibility                                 |
| `autoFocus`            | `boolean`   | `false`              | Focuses input on load                                            |
| `style`                | `object`    | `{}`                 | Custom style object                                              |
| `isBorder`             | `boolean`   | `false`              | Applies full border instead of bottom border only                |
| `isApplyStrictPattern` | `boolean`   | `true`               | Enforces pattern & length while typing                           |
| `showLabelAlways`      | `boolean`   | `false`              | Always show label instead of only on focus                       |
| `onBlur`               | `function`  | —                    | Callback on blur                                                 |
| `onFocus`              | `function`  | —                    | Callback on focus                                                |
| `onClear`              | `function`  | —                    | Renders a clear (X) icon when provided                           |
| `icon`                 | `ReactNode` | —                    | Adds a right-side icon inside the input                          |
| `width`                | `string`    | `300px`              | to adjust the width of the Field                                 |
| `backendError`        | `string`   | `""`                                       | bakend error that reaches to the correct field. |

---

## Features

### Validation

- Supports `required`, `minLength`, `maxLength`, and `pattern`.
- Validation runs on `blur` and/or typing (`isApplyStrictPattern`).
- Auto trims whitespace before validation.

### Error Messaging

- Displays custom error messages or default fallback.
- Controlled by validation results.

### Character Counter

- Toggle character count (`current/max`) using `showCharacterCount`.

### Prefix & Suffix

- Add currency symbol, units, or additional UI elements with `prefix` / `suffix`.

### Clear Button

- When `onClear` is passed, a clear (`X`) button appears to reset the input.

### Custom Styling

- Fully themable with `color`, `style`, and `isBorder`.

---

## Usage Examples

### Basic Usage

```jsx
<TextField
  label="Full Name"
  setResult={(val) => console.log("Final value:", val)}
/>
```

---

### With Validation & Character Count

```jsx
<TextField
  label="Username"
  required
  minLength={3}
  maxLength={12}
  showCharacterCount
  errorMessage="Username must be 3–12 characters."
  setResult={(val) => setUser(val)}
  setIsFieldValid={(valid) => setIsValid(valid)}
/>
```

---

### Regex Validation

```jsx
<TextField
  label="Email Address"
  type="email"
  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
  errorMessage="Please enter a valid email."
  setResult={(val) => setEmail(val)}
  setIsFieldValid={(valid) => setEmailValid(valid)}
/>
```

---

### With Prefix, Suffix & Icon

```jsx
<TextField
  label="Amount"
  type="number"
  prefix="₹"
  suffix="INR"
  icon={<CurrencyIcon />}
  placeholder="Enter amount"
  setResult={(val) => setAmount(val)}
/>
```

---

### With Clear Button

```jsx
<TextField
  label="Search"
  value={search}
  onClear={() => setSearch("")}
  setResult={(val) => setSearch(val)}
/>
```

---

### Disabled & ReadOnly

```jsx
<TextField label="Email" value="readonly@example.com" disabled />
```

---

## Edge Cases & Handling

| Case                               | Behavior                                                               |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `isApplyStrictPattern = false`     | Pattern is not validated on every keystroke, only on blur.             |
| `pattern` includes `{}` quantifier | Component throws developer warning, use `minLength/maxLength` instead. |
| `value` prop changes externally    | `useEffect` syncs local state with prop.                               |
| `required` + `onBlur`              | Empty field will show error immediately on blur.                       |

---

## Best Practices

- Use `minLength` and `maxLength` instead of regex for length validation.
- Combine `setResult` and `setIsFieldValid` for robust form handling.
- Avoid putting complex JSX inside `prefix/suffix`, keep it simple.
- Disable `isApplyStrictPattern` for complex patterns that need final value only.
- Always use `ariaLabel` when `label` is not present for accessibility.
