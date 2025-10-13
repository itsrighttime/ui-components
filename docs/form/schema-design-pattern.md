# Form Schema Design Architecture

This document describes the schema design patterns and structural rules for defining dynamic forms in a modular, reusable, and validated format. The schema acts as a declarative configuration object from which form UIs, validations, and behaviors can be automatically generated.

## 1. Overview

The form schema system is based on **JSON-driven configuration**.
Each form is defined as a structured object that specifies:

- Meta information (title, description, mode)
- Rendering preferences (settings)
- Field definitions and constraints
- Optional step-based sequencing
- Conditional and repeatable logic

This schema enables the form builder and runtime renderer to generate dynamic UI without additional imperative code.

## 2. Core Schema Layers

The schema is built on three key layers of configuration definitions.

### 2.1 Field Type Definitions

Defined via:

```js
export const FORM_FIELDS_TYPE = {
  TEXT: "text",
  EMAIL: "email",
  NUMBER: "number",
  DROPDOWN: "dropdown",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  DATE: "date",
  FILE: "file",
  TEXT_AREA: "text_area",
  SLIDER: "slider",
  // ...additional field types
};
```

These constants serve as the **canonical list of supported field components**.
Every field in a form configuration must reference a valid `FORM_FIELDS_TYPE`.

### 2.2 Field Property Definitions

All field configurations use a standard set of property identifiers for defining behavior, appearance, and validation rules. These are abstracted as constants for consistency:

```js
export const FPs = {
  NAME: "name",
  LABEL: "label",
  TYPE: "type",
  PLACEHOLDER: "placeholder",
  REQUIRED: "required",
  OPTIONS: "options",
  VALUE: "value",
  CONDITIONAL: "conditional",
  FIELDS: "fields",
  REPEATABLE: "repeatable",
  MORE_LABEL: "moreLabel",
  // ...and others as needed
};
```

These properties define the _allowed structure_ for each field object.

### 2.3 Core Field Property Rules

Each field type has its own **validation contract**, defined through `CORE_FIELDS_PROPS`.
This structure defines which properties are **compulsory** and which are **optional** for that type.

Example:

```js
[FORM_FIELDS_TYPE.SLIDER]: {
  compulsory: [MIN, MAX],
  optional: [STEP, SHOW_RANGE, SHOW_VALUE_SIDE, PRECISION],
}
```

This enables schema-level validation of field configurations before runtime.

## 3. Base Form Schema Structure

Each form schema is a single JSON object containing metadata, configuration settings, and one of the following:

- `fields`: for single-page forms
- `steps`: for multi-step forms

### Example (single-page)

```js
export const formConfig = {
  title: "User Feedback",
  description: "Collects user input on product experience.",
  mode: "single",
  settings: {
    color: "var(--colorBlue)",
    showLabelAlways: true,
    gap: "1.5rem",
  },
  fields: [
    {
      name: "email",
      type: FORM_FIELDS_TYPE.EMAIL,
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "feedback",
      type: FORM_FIELDS_TYPE.TEXT_AREA,
      label: "Feedback",
      placeholder: "Your comments",
      required: true,
    },
  ],
};
```

## 4. Multi-Step Form Schema

### 4.1 Structure

A multi-step form uses a `steps` array instead of a `fields` array.
Each step defines its own title and an independent list of field configurations.

```js
export const formConfig = {
  title: "Multi-Step Conditional Example",
  description: "Testing conditions across steps.",
  mode: "multi",
  settings: {
    showLabelAlways: true,
    color: "var(--colorGreen)",
    gap: "2rem",
  },
  steps: [
    {
      title: "Step 1: Basic Info",
      fields: [ ... ],
    },
    {
      title: "Step 2: Conditional Fields",
      fields: [ ... ],
    },
    {
      title: "Step 3: Communication",
      fields: [ ... ],
    },
    {
      title: "Step 4: Documents",
      fields: [ ... ],
    },
  ],
};
```

### 4.2 Field Dependencies Across Steps

Fields in later steps can depend on values from previous steps using conditional logic.
This allows progressive disclosure and context-aware flow.

Example:

```js
{
  name: "companyName",
  type: FORM_FIELDS_TYPE.TEXT,
  label: "Company Name",
  conditional: {
    dependsOn: "employmentStatus",
    operator: OPERATORS.in,
    value: ["Employed", "Self-Employed"],
  },
}
```

Conditional dependencies are not limited by step boundaries.
If a field’s `dependsOn` refers to a field in a prior step, the condition will still be evaluated during render.

## 5. Conditional Logic

Conditional rendering enables dynamic visibility based on other field values.

### Structure

```js
conditional: {
  dependsOn: "fieldName",
  operator: OPERATORS.equals,   // comparison rule
  value: ["expectedValue"],     // comparison target
}
```

### Supported Operators

Defined in:

```js
export const OPERATORS = {
  equals: "equals",
  notEquals: "notEquals",
  in: "in",
  notIn: "notIn",
  contains: "contains",
  greaterThan: "greaterThan",
  lessThan: "lessThan",
  // extendable
};
```

### Behavior

- The target field listens to value changes in `dependsOn`.
- The condition is re-evaluated each time.
- If true, the dependent field is displayed or activated; if false, it is hidden or disabled.

## 6. Repeatable Sections

Repeatable sections enable dynamically duplicating a set of subfields.

```js
{
  name: "workExperience",
  label: "Work Experience",
  repeatable: true,
  moreLabel: "Add Experience",
  fields: [
    { name: "company", type: FORM_FIELDS_TYPE.TEXT, label: "Company" },
    { name: "years", type: FORM_FIELDS_TYPE.NUMBER, label: "Years Worked" },
  ],
}
```

### Rules

- `repeatable: true` marks the field group as clonable.
- `moreLabel` defines the action label (“Add More”).
- Each nested field is validated independently within its group context.

## 7. Validation Model

Schema validation ensures correctness before runtime rendering.

### Validation checks

| Rule                    | Description                                                                     |
| ----------------------- | ------------------------------------------------------------------------------- |
| Unique field names      | Each field `name` must be globally unique within the form.                      |
| Compulsory fields       | Each type must include all required properties defined in `CORE_FIELDS_PROPS`.  |
| Option structure        | For dropdowns/radios, each `option` must have both label and value.             |
| Conditional integrity   | `dependsOn` must reference an existing field name.                              |
| Repeatable completeness | `moreLabel` is required if `repeatable` is true.                                |
| Cross-step validation   | Dependencies across steps are allowed but must reference a valid earlier field. |

## 8. Design Principles

The schema system follows key architectural principles:

| Principle                  | Description                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| **Declarative UI**         | The entire form structure is expressed as JSON, eliminating imperative logic.             |
| **Single Source of Truth** | `FORM_FIELDS_TYPE` and `CORE_FIELDS_PROPS` centrally define valid schema rules.           |
| **Self-Validation**        | Forms can be validated against contracts before use.                                      |
| **Composable**             | Each form, step, and field can be independently defined and reused.                       |
| **Extendable**             | New field types, operators, and validations can be added without breaking existing forms. |
| **Portable**               | The same schema can drive both web and mobile renderers.                                  |

## 9. Summary

| Concept          | Description                                 |
| ---------------- | ------------------------------------------- |
| `mode: "single"` | All fields rendered in one page.            |
| `mode: "multi"`  | Fields grouped into step-based pages.       |
| `fields`         | Array of form fields for single-page mode.  |
| `steps`          | Array of steps, each with its own `fields`. |
| `conditional`    | Rules to show/hide fields dynamically.      |
| `repeatable`     | Enables multiple entries of a field group.  |
| `settings`       | Visual and behavioral preferences.          |
