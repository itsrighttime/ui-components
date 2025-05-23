# Developer Guide

## Components Overview

This guide covers the following reusable input components:

1. **`OtpField`** — Multi-digit OTP input
2. **`PasswordField`** — Password input with strength indicator and visibility toggle
3. **`SecurityQuestion`** — Dropdown selector with conditional answer input

All components support custom styling via CSS variables like `--color` and `--width`.

---

## OtpField

### Location

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { OtpField, PasswordField, SecurityQuestion } = UIInputs.Security;
```

### Props

| Prop        | Type     | Default       | Description                               |
| ----------- | -------- | ------------- | ----------------------------------------- |
| `length`    | `number` | `6`           | Number of digits in the OTP               |
| `setResult` | `func`   | _required_    | Callback to return OTP string on complete |
| `color`     | `string` | `--colorCyan` | Sets primary color via CSS variable       |
| `width`     | `string` | `300px`       | Width of the container                    |

### Features

- Automatically moves focus to the next input
- Supports **paste** of full OTP
- Clears input on backspace and moves backward
- OTP state is returned via `setResult` once filled

### Usage

```jsx
<OtpField length={4} color="blue" setResult={(otp) => console.log(otp)} />
```

### Style Customization

```css
--color: #00bcd4;
--width: 250px;
```

---

## PasswordField

### Location

### Props

| Prop          | Type     | Default       | Description                             |
| ------------- | -------- | ------------- | --------------------------------------- |
| `label`       | `string` | `"Password"`  | Label for the input field               |
| `value`       | `string` | `""`          | Initial value of the password field     |
| `setResult`   | `func`   | _required_    | Callback to return final password value |
| `placeholder` | `string` | `"Password"`  | Placeholder text                        |
| `color`       | `string` | `--colorCyan` | Sets accent color                       |
| `width`       | `string` | `300px`       | Width of the component                  |

### Features

- Toggle show/hide password using icon
- Displays password strength (`Short`, `Weak`, `Medium`, `Strong`)
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
