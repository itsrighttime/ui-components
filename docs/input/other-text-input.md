# Developer Guide for JsonField, TextArea, and Label Components

---

## 1. JsonField Component

### Purpose

`JsonField` provides a user-friendly text area specifically designed for JSON input. It validates JSON, pretty-prints (formats) valid JSON input, and reports errors on invalid JSON. It also optionally shows character/word counts and supports customizable UI features.

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { JsonField } = UIInputs.Text;
```

### Props

| Prop                 | Type      | Default | Description                                                                              |
| -------------------- | --------- | ------- | ---------------------------------------------------------------------------------------- |
| `label`              | string    | —       | Label text for the JSON input area.                                                      |
| `setResult`          | function  | —       | Callback to receive the formatted JSON string on every successful validation/save.       |
| `setIsFieldValid`    | function  | —       | Callback to notify parent component about the validation status (true if JSON is valid). |
| `color`              | string    | —       | Color theme for the input and button (used internally).                                  |
| `hideOnSave`         | boolean   | false   | If `true`, hides the input after successful save and shows a confirmation message.       |
| `showCharacterCount` | boolean   | false   | Show character count below the textarea.                                                 |
| `showWordCount`      | boolean   | false   | Show word count below the textarea.                                                      |
| `width`              | `string`  | `300px` | to adjust the width of the Field                                                         |
| `isBorder`           | `boolean` | `false` | Applies full border instead of bottom border only                                        |

### Behavior

- User types or pastes JSON text.
- On clicking **Validate & Save**, JSON is validated and formatted.
- If valid, JSON is pretty-printed and passed to `setResult`.
- If invalid, error message is shown.
- Optionally hides input on successful save if `hideOnSave` is true.
- Shows character and/or word count if respective flags are true.

### Usage Example

```jsx
const [jsonData, setJsonData] = useState("");
const [isValid, setIsValid] = useState(false);

<JsonField
  label="Enter JSON Data"
  setResult={setJsonData}
  setIsFieldValid={setIsValid}
  color="#0aa"
  hideOnSave={true}
  showCharacterCount={true}
  showWordCount={true}
/>;
```

## 2. TextArea Component

### Purpose

`TextArea` is a reusable, customizable multi-line input component with built-in validation, dynamic height adjustment, and optional character/word count display.

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { TextArea } = UIInputs.text;
```

### Props

| Prop                 | Type     | Default              | Description                                                                                 |
| -------------------- | -------- | -------------------- | ------------------------------------------------------------------------------------------- |
| `label`              | string   | —                    | Label text to display (shown only on focus and if input is not empty).                      |
| `value`              | string   | ""                   | Controlled value of the textarea.                                                           |
| `setResult`          | function | —                    | Callback to update the input value on change or blur.                                       |
| `color`              | string   | var(--colorCyan)     | Color for styling the input border/text.                                                    |
| `placeholder`        | string   | "Enter text here..." | Placeholder text shown when input is empty.                                                 |
| `minLength`          | number   | —                    | Minimum allowed length for input. If violated, shows error.                                 |
| `maxLength`          | number   | —                    | Maximum allowed length for input. Prevents typing beyond limit and shows error if exceeded. |
| `maxTextAreaHeight`  | number   | 200                  | Maximum height of the textarea in pixels. If content exceeds, scrollbar appears.            |
| `setIsFieldValid`    | function | () => {}             | Callback to notify if current field is valid (based on length validation).                  |
| `showCharacterCount` | boolean  | false                | Show character count below the textarea.                                                    |
| `showWordCount`      | boolean  | false                | Show word count below the textarea.                                                         |
| `disabled`           | boolean  | false                | Disable the textarea input.                                                                 |
| `style`              | object   | {}                   | Additional inline styles applied to the container.                                          |
| `width`              | `string` | `300px`              | to adjust the width of the Field                                                            |

### Behavior

- Auto-resizes textarea height dynamically based on content, up to `maxTextAreaHeight`.
- Validates length constraints (`minLength`, `maxLength`).
- Shows error messages for length violations.
- Shows live character and/or word count if enabled.
- Calls `setResult` on blur with the current input value.
- Calls `setIsFieldValid` with `true` or `false` depending on validation status.

### Usage Example

```jsx
const [text, setText] = useState("");
const [isValid, setIsValid] = useState(false);

<TextArea
  label="Description"
  value={text}
  setResult={setText}
  color="#007acc"
  placeholder="Write your description here..."
  minLength={10}
  maxLength={500}
  showCharacterCount={true}
  showWordCount={true}
  setIsFieldValid={setIsValid}
/>;
```

## 3. Label Component

### Purpose

`Label` is a simple customizable text label component, useful for headings, titles, or inline labels with flexible styling options.

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { Label } = UIInputs.text;
```

### Props

| Prop            | Type     | Default | Description                                      |
| --------------- | -------- | ------- | ------------------------------------------------ |
| `text`          | string   | —       | Text content to display inside the label.        |
| `color`         | string   | —       | Text color.                                      |
| `fontSize`      | string   | —       | CSS font-size (e.g., "16px", "1.5rem").          |
| `fontWeight`    | string   | —       | CSS font-weight (e.g., "bold", "400").           |
| `textAlign`     | string   | —       | CSS text-align property.                         |
| `textTransform` | string   | —       | CSS text-transform property (e.g., "uppercase"). |
| `letterSpacing` | string   | —       | CSS letter-spacing property.                     |
| `lineHeight`    | string   | —       | CSS line-height property.                        |
| `fontFamily`    | string   | —       | CSS font-family property.                        |
| `style`         | object   | {}      | Additional inline styles to merge with defaults. |
| `width`         | `string` | `300px` | to adjust the width of the Field                 |

### Usage Example

```jsx
<Label
  text="User Information"
  color="#333"
  fontSize="18px"
  fontWeight="600"
  textAlign="left"
  textTransform="uppercase"
  letterSpacing="1px"
/>
```

# `MobileField` Component

### Purpose

The `MobileField` component collects and validates a mobile number input along with a country code. It supports numeric-only validation and integrates easily with forms via state management props.

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { MobileField } = UIInputs.text;
```

### Props

| Prop              | Type      | Default | Description                                                       |
| ----------------- | --------- | ------- | ----------------------------------------------------------------- |
| `required`        | `boolean` | `false` | Whether the phone number field is mandatory.                      |
| `color`           | `string`  | `-`     | Primary theme color (used for styling).                           |
| `code`            | `string`  | `"+91"` | Default country code.                                             |
| `setResult`       | `func`    | `-`     | Callback to receive `{ countryCode, phoneNumber }` result object. |
| `setIsFieldValid` | `func`    | `-`     | Callback to indicate whether the phone number is valid.           |
| `noOfDigits`      | `number`  | `10`    | Expected number of digits in the phone number.                    |
| `showLabelAlways` | `boolean` | `false` | If true, always shows the label above the input field.            |
| `style`           | `object`  | `{}`    | Inline style object applied to the root container.                |
| `width`           | `string`  | `300px` | to adjust the width of the Field                                  |
| `isBorder`        | `boolean` | `false` | Applies full border instead of bottom border only                 |

### Validation

- Country Code: Must start with `+` and contain digits only (RegEx: `^\+\d*$`)
- Phone Number: Must contain digits only (RegEx: `^\d*$`)
- Length checks are enforced based on `minLength` and `maxLength`.

### Usage Example

```jsx
<MobileField
  color="var(--primaryColor)"
  setResult={(data) => console.log(data)}
  setIsFieldValid={(valid) => console.log("Valid:", valid)}
  code="+1"
  noOfDigits={10}
/>
```

# `EmailField` Component

### Purpose

The `EmailField` component provides a controlled and validated input for capturing email addresses. It uses built-in HTML5 `email` input behavior along with pattern matching.

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { EmailField } = UIInputs.text;
```

### Props

| Prop              | Type      | Default              | Description                                            |
| ----------------- | --------- | -------------------- | ------------------------------------------------------ |
| `label`           | `string`  | `"Email"`            | Label for the input field.                             |
| `placeholder`     | `string`  | `"Enter your email"` | Placeholder text shown inside the input.               |
| `color`           | `string`  | `-`                  | Primary color for styling the input field.             |
| `value`           | `string`  | `-`                  | Controlled input value.                                |
| `required`        | `boolean` | `true`               | Whether the field is mandatory.                        |
| `autoComplete`    | `string`  | `"email"`            | Sets `autoComplete` attribute of the input field.      |
| `disabled`        | `boolean` | `false`              | Disables the input when `true`.                        |
| `setResult`       | `func`    | `-`                  | Callback function that receives the email string.      |
| `setIsFieldValid` | `func`    | `-`                  | Callback to indicate whether the email is valid.       |
| `showLabelAlways` | `boolean` | `false`              | If true, always shows the label above the input field. |
| `style`           | `object`  | `{}`                 | Inline style for the component.                        |
| `width`           | `string`  | `300px`              | to adjust the width of the Field                       |
| `isBorder`        | `boolean` | `false`              | Applies full border instead of bottom border only      |

### Validation

- Pattern: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
- `isApplyStrictPattern` is disabled, so it acts as a fallback validator only if browser validation fails.

### Usage Example

```jsx
<EmailField
  color="var(--accentColor)"
  value=""
  setResult={(email) => console.log("Email:", email)}
  setIsFieldValid={(isValid) => console.log("Email Valid:", isValid)}
  showLabelAlways={true}
/>
```

### Integration Example in a Form

```jsx
const [form, setForm] = useState({ email: "", phone: "" });
const [isPhoneValid, setPhoneValid] = useState(false);
const [isEmailValid, setEmailValid] = useState(false);

return (
  <>
    <EmailField
      setResult={(email) => setForm((prev) => ({ ...prev, email }))}
      setIsFieldValid={setEmailValid}
    />
    <MobileField
      setResult={(data) => setForm((prev) => ({ ...prev, phone: data }))}
      setIsFieldValid={setPhoneValid}
    />
    <button disabled={!isPhoneValid || !isEmailValid}>Submit</button>
  </>
);
```

# Integration Tips

- **JsonField uses TextArea internally**, so if you want consistent styling or behavior, you can customize TextArea separately and then pass matching props to JsonField.
- Both `JsonField` and `TextArea` components support **color theming** via a `color` prop, which controls borders, buttons, and labels.
- Validation state from both input components is communicated upward via `setIsFieldValid` callback, enabling parent forms to control submission availability.
- Use `hideOnSave` in `JsonField` to create a clear UX flow where the JSON input disappears after validation, and confirmation is shown.
- Label is lightweight and purely presentational — use it wherever you want styled textual headings or inline labels, independent of inputs.

# Styling

- Components use modular CSS (e.g., `JsonField.module.css`, `TextArea.module.css`, `Label.module.css`).
- Customize colors primarily via the `color` prop.
- You can pass inline styles to `TextArea` and `Label` components via the `style` prop for additional flexibility.
