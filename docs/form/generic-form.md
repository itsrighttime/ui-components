# Dynamic Form Engine Documentation

The **Form Engine** allows developers to build highly dynamic and customizable forms using configuration objects. It supports single-step and multi-step forms, various input field types, repeatable groups, file uploads, and powerful conditional rendering.

It supports:

- **Single-step or multi-step** forms
- **Conditional rendering** (fields visible only if certain conditions are met)
- **Repeatable groups** (dynamic field sets like education, work experience, etc.)
- **Static & API-driven dropdown options**
- **Field-level validations** (min, max, regex, required, etc.)
- **File uploads with type & size restrictions**
- **Custom React components integration**

Import the `GenericForm` component into your application.

```js
import { UILayout } from "@itsrighttime/ui-components";

const {
  Form,
  KEYS: { FORM_FIELDS_TYPE, OPERATORS, FIELDS_PROPS },
} = UILayout;
```

# `GenericForm` Props Reference

The `GenericForm` component is a dynamic, schema-driven form builder that supports single-step and multi-step forms with validation, persistence, and backend submission.

| **Prop**      | **Type**          | **Default**  | **Description**                                                                                                                     |
| ------------- | ----------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `config`      | `object`          | **Required** | The full configuration schema of the form. Defines structure, fields, steps, validation rules, and backend endpoint.                |
| `onSubmit`    | `function`        | `undefined`  | Optional external callback executed after successful form submission. Receives the final `formData` as an argument.                 |
| `submitLabel` | `string`          | `"Submit"`   | Label for the submit button (customizable per form).                                                                                |
| `style`       | `object`          | `undefined`  | Inline style overrides for the form container (merged with internal styles).                                                        |
| `settings`    | `object`          | `{}`         | Customizable visual and layout options for labels, spacing, colors, and borders. See **Settings Reference** below.                  |
| `scrollRef`   | `React.RefObject` | `null`       | Reference to the scrollable container. When navigating steps (Next/Back), the component scrolls this container smoothly to the top. |

### **Settings Reference**

| **Setting Key**   | **Type**  | **Default**            | **Description**                                        |
| ----------------- | --------- | ---------------------- | ------------------------------------------------------ |
| `showLabelAlways` | `boolean` | `false`                | Always show labels even when placeholders are visible. |
| `gap`             | `string`  | `"2rem"`               | Spacing between form fields.                           |
| `color`           | `string`  | `"var(--colorCyan)"`   | Primary accent color for buttons and highlights.       |
| `width`           | `string`  | `"100%"`               | Overall form width.                                    |
| `height`          | `string`  | `"100%"`               | Overall form height.                                   |
| `backgroundColor` | `string`  | `"var(--colorWhite)"`  | Background color of the form container.                |
| `textColor`       | `string`  | `"var(--colorSimple)"` | Text color for labels and inputs.                      |
| `labelColor`      | `string`  | `"var(--colorGray4)"`  | Label text color.                                      |
| `border`          | `string`  | `"none"`               | Border style for the form container.                   |
| `borderRadius`    | `string`  | `"5px"`                | Rounded corner radius for form sections.               |

### Example Usage

```jsx
import { GenericForm } from "@/components/Form/GenericForm";
import { useRef } from "react";

export default function RegistrationForm() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ overflowY: "auto", maxHeight: "80vh" }}>
      <Form
        config={registrationConfig}
        onSubmit={(data) => console.log("Form submitted:", data)}
        submitLabel="Register"
        settings={{ color: "var(--colorBlue)" }}
        scrollRef={scrollRef}
      />
    </div>
  );
}
```

## 1. Form Structure

A form configuration is a JavaScript object with the following properties:

```javascript
{
  title: "Form Title",
  description: "Form description text",
  mode: "single" | "multi",   // single-step or multi-step form
  fields: [...],  // (for single-step forms)
  steps: [...]    // (for multi-step forms)
}
```

## 2. Settings

- This was pass as the prop to the Form Component

| Setting           | Description                                       | Example                |
| ----------------- | ------------------------------------------------- | ---------------------- |
| `showLabelAlways` | Whether field labels are always visible           | `true`                 |
| `color`           | Primary theme color for inputs and labels         | `"var(--colorCyan)"`   |
| `gap`             | Vertical spacing between fields                   | `"2rem"`               |
| `width`           | Default width for input fields                    | `"100%"`               |
| `height`          | Default height for input fields                   | `"100%"`               |
| `backgroundColor` | Background color for input fields                 | `"var(--colorWhite)"`  |
| `textColor`       | Default text color inside input fields            | `"var(--colorSimple)"` |
| `labelColor`      | Color of field labels                             | `"var(--colorGray4)"`  |
| `border`          | Border style for input fields                     | `"none"`               |
| `borderRadius`    | Border radius for rounded corners on input fields | `"5px"`                |

## 3. Field Definition

Each field is an object with the following base properties:

```javascript
{
  name: "fieldName",                   // unique identifier
  type: FORM_FIELDS_TYPE.TEXT,         // field type
  label: "Field Label",                // label shown to user
  placeholder: "Enter value...",       // (optional) placeholder
  required: true,                      // (optional) validation
  repeatable: false,                   // (optional) allows multiple entries
  moreLabel: "Add Another",            // (optional) for repeatable groups
  conditional: { ... }                 // (optional) show/hide logic
}
```

## 4. Supported Field Types

Imported from `formFieldTypes.js`.

- **Text & Input**: `TEXT`, `TEXT_AREA`, `EMAIL`, `PASSWORD`, `MOBILE`
- **Selectors**: `DROPDOWN`, `MULTI_DROPDOWN`
- **Date & Time**: `DATE`, `TIME`
- **Location**: `ADDRESS`
- **Uploads**: `FILE`

## 5. Repeatable Groups

Fields can be marked as `repeatable: true` to allow multiple entries dynamically.

```javascript
{
  name: "education",
  label: "Education",
  repeatable: true,
  moreLabel: "Add Other Degree",
  fields: [
    { name: "degree", type: FORM_FIELDS_TYPE.TEXT, label: "Degree" },
    { name: "yearOfPassing", type: FORM_FIELDS_TYPE.DATE, label: "Year of Passing" }
  ]
}
```

**Notes:**

- `moreLabel` sets the text for the “Add More” button.
- Conditional fields can exist inside repeatable groups.

## 6. Conditional Rendering

Fields (including repeatable fields) can be displayed conditionally:

```javascript
conditional: {
  dependsOn: "employmentStatus",
  operator: OPERATORS.in,
  value: ["Employed", "Self-Employed"]
}
```

### Operators

Imported from `operators.js`.

- `equals`, `notEquals`
- `in`, `notIn`
- `gt`, `gte`, `lt`, `lte`
- `contains`, `notContains`

**Example:** Conditional inside repeatable:

```javascript
{
  name: "noticePeriod",
  type: FORM_FIELDS_TYPE.TEXT,
  label: "Notice Period",
  placeholder: "Enter notice period",
  conditional: {
    dependsOn: "currentlyWorking",
    operator: OPERATORS.equals,
    value: ["Yes"]
  }
}
```

## 7. Single-Step Repeatable Example

```javascript
import { FORM_FIELDS_TYPE } from "../jsx/formFieldTypes";
import { OPERATORS } from "../jsx/operators";

export const configData06 = {
  title: "Repeatable Fields Example",
  description: "Form to test repeatable groups",
  mode: "single",
  settings: {
    showLabelAlways: true,
    color: "var(--colorPurple)",
    gap: "2rem",
  },
  fields: [
    {
      name: "fullName",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      name: "skills",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Skills",
      placeholder: "Enter a skill",
    },
    {
      name: "education",
      label: "Education",
      repeatable: true,
      moreLabel: "Add Other Degree",
      fields: [
        {
          name: "degree",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Degree",
          placeholder: "Enter your degree",
        },
        {
          name: "yearOfPassing",
          type: FORM_FIELDS_TYPE.DATE,
          label: "Year of Passing",
        },
        {
          name: "institution",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Institution Name",
          placeholder: "Enter institution name",
        },
      ],
    },
    {
      name: "workExperience",
      label: "Work Experience",
      repeatable: true,
      moreLabel: "Add Other Details",
      fields: [
        {
          name: "company",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Company Name",
          placeholder: "Enter company name",
        },
        {
          name: "role",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Role",
          placeholder: "Enter your role",
        },
        {
          name: "duration",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Duration",
          placeholder: "Enter duration (e.g., 2 years)",
        },
        {
          name: "currentlyWorking",
          type: FORM_FIELDS_TYPE.DROPDOWN,
          label: "Currently Working?",
          options: ["Yes", "No"],
        },
        {
          name: "noticePeriod",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Notice Period",
          placeholder: "Enter notice period",
          conditional: {
            dependsOn: "currentlyWorking",
            operator: OPERATORS.equals,
            value: ["Yes"],
          },
        },
      ],
    },
  ],
};
```

## 8. Multi-Step Repeatable Example

Multi-step forms can include repeatable groups in any step. The structure is the same as single-step, but nested under `steps`:

```javascript
steps: [
  {
    title: "Step 1",
    fields: [
      /* repeatable fields allowed here */
    ],
  },
  {
    title: "Step 2",
    fields: [
      /* additional repeatable fields */
    ],
  },
];
```

## 9. Best Practices

1. Unique field names.
2. Logical ordering of dependent fields.
3. Use `moreLabel` for repeatable clarity.
4. Test repeatable + conditional combinations thoroughly.

This documentation now fully covers:

- Single-step forms
- Multi-step forms
- Repeatable groups
- Conditional logic
- Nested repeatable + conditional
