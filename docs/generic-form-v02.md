
# Developer Documentation: **GenericForm** Component

## Overview

The `GenericForm` component dynamically renders forms based on a **configuration object**.
It supports:

* **Single-step or multi-step** forms
* **Conditional rendering** (fields visible only if certain conditions are met)
* **Repeatable groups** (dynamic field sets like education, work experience, etc.)
* **Static & API-driven dropdown options**
* **Field-level validations** (min, max, regex, required, etc.)
* **File uploads with type & size restrictions**
* **Custom React components integration**

This makes it **highly reusable, extensible, and maintainable** across projects.

---

## Installation

```js
import { GenericForm } from "../../Layout/Forms/jsx/GenericForm";
import { FORM_FIELDS_TYPE } from "@itsrighttime/ui-components";
```

---

## Basic Usage

```js
const handleSubmit = async (formData) => {
  console.log("Form submitted with data:", formData);
};

<GenericForm
  config={formConfig}
  onSubmit={handleSubmit}
  submitLabel="Create User"
  settings={{ showLabelAlways: true }}
/>
```

---

## Form Configuration Schema

### **Top-Level Config**

```ts
const formConfig = {
  title: "Create New User",     // Form title
  description: "Please fill in", // Optional description
  mode: "single" | "multi",     // Single-step or Multi-step form

  // For single-step:
  fields: [ /* array of field configs */ ],

  // For multi-step:
  steps: [
    {
      title: "Step 1: Basic Info",
      description: "Enter personal details",
      fields: [ /* field configs */ ],
    },
    {
      title: "Step 2: Education",
      fields: [ /* repeatable group */ ],
    },
  ],

  settings: {
    validationMode: "onSubmit" | "onBlur" | "onChange",
    showStepIndicators: true,
    allowStepBack: true,
    theme: { color: "var(--colorCyan)", gap: "2rem" },
  },
};
```

---

### **Field Configuration**

```ts
{
  name: "fullName",
  type: FORM_FIELDS_TYPE.TEXT,
  label: "Full Name",
  placeholder: "Enter full name",
  defaultValue: "",
  required: true,
  min: 3,
  max: 50,
  disabled: false,
  hidden: false,

  // Conditional rendering
  conditional: {
    dependsOn: "role",
    operator: "in",
    value: ["designer", "developer"],
  },

  // Repeatable group
  repeatable: true,
  fields: [
    { name: "degree", type: "text", label: "Degree" },
    { name: "year", type: "date", label: "Year of Passing" },
  ],

  // Dropdown options
  options: [
    { label: "Graduate", value: "graduate" },
    { label: "Post Graduate", value: "postGraduate" },
  ],
  dataSource: {
    type: "api",                 // static | api
    url: "/api/options/roles",
    valueKey: "id",
    labelKey: "name",
  },

  // File uploads
  multiple: true,
  maxFiles: 5,
  maxSize: 2 * 1024 * 1024,
  allowedTypes: ["application/pdf", "image/jpeg", "image/png"],
}
```

---

## Supported Field Types

```ts
export const FORM_FIELDS_TYPE = {
  DROPDOWN: "dropdown",
  MULTI_DROPDOWN: "multi-dropdown",
  EMAIL: "email",
  PASSWORD: "password",
  MOBILE: "mobile",
  DATE: "date",
  TIME: "time",
  ADDRESS: "address",
  TEXT: "text",
  TEXT_AREA: "textArea",
  FILE: "file",
  GROUP: "group",    // repeatable collection
  CUSTOM: "custom",  // custom React component
};
```

---

## Advanced Example: Multi-Step + Conditional + Repeatable + File Upload

```js
const formConfig = {
  title: "Job Application",
  description: "Fill out your details to apply",
  mode: "multi",

  steps: [
    {
      title: "Step 1: Personal Info",
      fields: [
        {
          name: "fullName",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Full Name",
          required: true,
          min: 3,
          max: 50,
        },
        {
          name: "email",
          type: FORM_FIELDS_TYPE.EMAIL,
          label: "Email",
          required: true,
        },
        {
          name: "portfolio",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Portfolio URL",
          conditional: {
            dependsOn: "role",
            operator: "eq",
            value: "designer",
          },
        },
      ],
    },
    {
      title: "Step 2: Education",
      fields: [
        {
          name: "education",
          type: FORM_FIELDS_TYPE.GROUP,
          label: "Education Details",
          repeatable: true,
          fields: [
            { name: "degree", type: "text", label: "Degree" },
            { name: "institute", type: "text", label: "Institute" },
            { name: "year", type: "date", label: "Year of Passing" },
          ],
        },
      ],
    },
    {
      title: "Step 3: Uploads",
      fields: [
        {
          name: "resume",
          type: FORM_FIELDS_TYPE.FILE,
          label: "Upload Resume",
          required: true,
          allowedTypes: ["application/pdf"],
          maxSize: 2 * 1024 * 1024,
        },
      ],
    },
  ],
};
```

---

## Key Features

* **Multi-Step Navigation**: Supports progress indicators and step validation
* **Conditional Rendering**: Show/hide fields dynamically
* **Repeatable Groups**: Add/remove multiple sets of fields
* **API-driven Dropdowns**: Fetch options dynamically
* **Validation Rules**: Min/max length, regex, required, custom validators
* **File Uploads**: Restrict by type, size, and count
* **Custom Components**: Inject your own React component via `CUSTOM` type

