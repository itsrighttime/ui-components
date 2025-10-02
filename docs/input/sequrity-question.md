# Developer Guide

## Components Overview

This guide covers the following reusable input components:

1. **`OtpField`** — Multi-digit OTP input
2. **`PasswordField`** — Password input with strength indicator and visibility toggle
3. **`SecurityQuestion`** — Dropdown selector with conditional answer input

All components support custom styling via CSS variables like `--color` and `--width`.

#### Security

- [`OtpField`](#otpfield)
- [`PasswordField`](#passwordfield)
- [`SecurityQuestion`](#securityquestion)

---

## OtpField

### Location

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { OtpField, PasswordField, SecurityQuestion } = UIInputs.Security;
```

### Props

| Prop                  | Type     | Default       | Description                                                             |
| --------------------- | -------- | ------------- | ----------------------------------------------------------------------- |
| `length`              | `number` | `6`           | Number of characters in the OTP                                         |
| `setResult`           | `func`   | _required_    | Callback to return OTP string when all inputs are filled                |
| `color`               | `string` | `--colorCyan` | Sets the primary color using a CSS variable                             |
| `width`               | `string` | `300px`       | Width of the OTP container                                              |
| `verifcationEndpoint` | `string` | _required_    | Endpoint for backend otp verification                                   |
| `userId`              | `string` | _required_    | Id that need to verify OPT verification                                 |
| `setError`            | `func`   | _required_    | Callback to display an error message on failure                         |
| `isNumeric`           | `bool`   | `true`        | Whether to allow only numeric input (`true`) or any character (`false`) |

### Features

- **Numeric or Alphanumeric Support** — Use `isNumeric={false}` to accept any characters (e.g. for passwords or custom codes).
- **Auto Focus** — Automatically moves focus to the next input on valid entry.
- **Smart Backspace** — Clears current or previous input and moves focus backward.
- **Paste Support** — Allows pasting the full OTP at once.
- **Error Handling** — Highlights invalid input and resets fields with timeout.
- **Auto-Reset Focus** — Returns focus to the first field after an error.
- **Fully Controlled Styling** via CSS modules and variables.

### Usage

```jsx
<OtpField
  length={4}
  color="blue"
  isNumeric={false}
  verifcationEndpoint={"http://localhost:4999/verifyOpt"}
  userId={"A1542"}
  setResult={(otp) => console.log("Verified:", otp)}
  setError={(msg) => console.warn(msg)}
/>
```

## PasswordField

### Location

### Props

| Prop                  | Type      | Default       | Description                                            |
| --------------------- | --------- | ------------- | ------------------------------------------------------ |
| `label`               | `string`  | `"Password"`  | Label for the input field                              |
| `value`               | `string`  | `""`          | Initial value of the password field                    |
| `setResult`           | `func`    | _required_    | Callback to return final password value                |
| `placeholder`         | `string`  | `"Password"`  | Placeholder text                                       |
| `color`               | `string`  | `--colorCyan` | Sets accent color                                      |
| `width`               | `string`  | `300px`       | Width of the component                                 |
| `setPasswordStrength` | `func`    | _optional_    | To get the information about the strengt               |
| `showLabelAlways`     | `boolean` | `false`       | If true, always shows the label above the input field. |

### Features

- Toggle show/hide password using icon
- Displays password strength (`Short`, `Weak`, `Medium`, `Strong`)
- These can be get by setPasswordStrength
- Uses regex to validate strength

### Usage

```jsx
<PasswordField setResult={(password) => console.log(password)} color="red" />
```

### Strength Logic

| Strength | Criteria                                           |
| -------- | -------------------------------------------------- |
| Short    | Length < 6                                         |
| Weak     | Lacks uppercase, lowercase, digit, or special char |
| Medium   | Length 6–9 with all character types                |
| Strong   | Length ≥ 10 with all character types               |

## SecurityQuestion

### Location

### Props

| Prop          | Type     | Default               | Description                                  |
| ------------- | -------- | --------------------- | -------------------------------------------- |
| `questions`   | `array`  | `[]`                  | Array of question strings                    |
| `setResult`   | `func`   | _required_            | Callback that returns `{ question, answer }` |
| `color`       | `string` | `--colorCyan`         | Accent color                                 |
| `placeholder` | `string` | `"Select a question"` | Dropdown placeholder                         |
| `width`       | `string` | `"300px"`             | Component width                              |
| `value`       | `-`      | `""`                  | Initial value.                               |

### Features

- Custom dropdown to select a question
- Displays a text field for answer only if question is selected
- Sends result as `{ question: "selected", answer: "typed" }`

### Usage

```jsx
<SecurityQuestion
  questions={["Your first pet?", "Mother's maiden name?"]}
  setResult={(data) => console.log(data)}
/>
```

## Styling Notes

Each component supports theme customization via CSS variables:

| Variable  | Purpose              |
| --------- | -------------------- |
| `--color` | Primary accent color |
| `--width` | Container width      |

Place these styles in your global CSS or pass via inline `style`.
