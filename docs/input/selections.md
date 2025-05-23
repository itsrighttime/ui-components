# Developer Guide

These two components provide a consistent and accessible way to render single and multiple choice selection inputs with built-in styling, help text, and customizability.

## Components Overview

### **RadioGroup**

Use this when you want the user to select **only one** option from a list.

### **CheckboxGroup**

Use this when you want the user to select **multiple** options from a list.

Both components are powered by a shared internal engine to ensure consistent behavior and styling.

## Common Props

| Prop                                                                             | Type                                                                      | Description                                            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------ |
| `options`                                                                        | `Array<{ label: string, value: any, disabled?: boolean, help?: string }>` | List of items to choose from.                          |
| `initialSelectedValue` (RadioGroup) <br> `initialSelectedValues` (CheckboxGroup) | `any` or `Array<any>`                                                     | The value(s) initially selected.                       |
| `setResult`                                                                      | `(result: any) => void`                                                   | Callback triggered when the selection changes.         |
| `layout`                                                                         | `"vertical"` \| `"horizontal"`                                            | Whether to stack options vertically or horizontally.   |
| `label`                                                                          | `string`                                                                  | Optional label shown above the group.                  |
| `color`                                                                          | `string`                                                                  | Optional color for selected icons (e.g., `"#00aaff"`). |
| `disabled`                                                                       | `boolean`                                                                 | Disable all selections.                                |
| `customStyles`                                                                   | `object`                                                                  | Override internal styles (`{ group, item, label }`).   |

## Usage Examples

### RadioGroup Example

```jsx
import { useState } from "react";
import { RadioGroup } from "@your-package";

export const RadioExample = () => {
  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    {
      label: "Other",
      value: "other",
      disabled: true,
      help: "Currently unavailable",
    },
  ];

  return (
    <>
      <RadioGroup
        options={options}
        initialSelectedValue={selected}
        setResult={setSelected}
        label="Gender"
        layout="horizontal"
        color="#007BFF"
      />
      <p>Selected: {selected}</p>
    </>
  );
};
```

### CheckboxGroup Example

```jsx
import { useState } from "react";
import { CheckboxGroup } from "@your-package";

export const CheckboxExample = () => {
  const [selected, setSelected] = useState(["react"]);

  [
    { label: "React", value: "react", help: "Most used" },
    { label: "Vue", value: "vue", help: "Gaining popularity" },
    {
      label: "Angular",
      value: "angular",
      disabled: true,
      help: "Not preferred",
    },
  ];

  return (
    <>
      <CheckboxGroup
        options={options}
        initialSelectedValues={selected}
        setResult={setSelected}
        label="Frameworks"
        layout="vertical"
        color="#00B894"
      />
      <p>Selected: {selected.join(", ")}</p>
    </>
  );
};
```

## Best Practices

- Use `inlineHelp` to give more context for each option.
- Use `disabled` state for options that are conditionally inactive.
- Use `layout="horizontal"` for inline buttons (especially in toolbars or filters).
- Combine with form libraries like `react-hook-form` for controlled inputs.
