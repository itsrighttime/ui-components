# Developer Guide

These two components provide a consistent and accessible way to render single and multiple choice selection inputs with built-in styling, help text, and customizability.

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const {
  Dropdown,
  DropdownSimple,
  SearchBox,
  ColorPicker,
  RadioGroup,
  Switch,
  CheckboxGroup,
} = UIInputs.Selectors;
```

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

## ColorPicker

### Purpose:

A simple color input element that allows users to select a color value. Returns the selected hex color.

### Props:

| Prop        | Type     | Required | Description                              |
| ----------- | -------- | -------- | ---------------------------------------- |
| `color`     | `string` | No       | Initial color value (hex format).        |
| `setResult` | `func`   | Yes      | Callback to return selected color value. |

### Usage:

```jsx
<ColorPicker color="#ff0000" setResult={(color) => console.log(color)} />
```

### Styling:

- Uses `ColorPicker.module.css`.
- Includes a wrapper div and a color input styled with class `.input`.

## SearchBox

### Purpose:

A live-search input that shows matching suggestions based on user input. Returns a selected item's `code`.

### Props:

| Prop          | Type     | Required | Description                                                            |
| ------------- | -------- | -------- | ---------------------------------------------------------------------- |
| `suggestions` | `array`  | Yes      | Array of objects `{ name, code }` used for search.                     |
| `setResult`   | `func`   | Yes      | Callback to return the `code` of the selected suggestion.              |
| `color`       | `string` | No       | Optional color for accenting the input and suggestions (CSS variable). |
| `placeholder` | `string` | No       | Placeholder text (default: `"Search..."`).                             |
| `width`       | `string` | No       | Width of the input box (default: `"300px"`).                           |

### Suggestion Logic:

- Input must be **at least 3 characters** long.
- Uses helper `filterSuggestions` to find matches.
- Keyboard support: Up/Down arrow navigation + Enter to select.

### Usage:

```jsx
const suggestions = [
  { name: "Apple", code: "APL" },
  { name: "Banana", code: "BNN" },
];

<SearchBox
  suggestions={suggestions}
  setResult={(code) => console.log(code)}
  placeholder="Search fruits..."
  color="#52c9bd"
  width="400px"
/>;
```

### Keyboard Support:

- `↑` / `↓`: Navigate suggestions.
- `Enter`: Select current suggestion.
- `Esc`: Dismiss suggestions (handled via click outside).

### Styling:

- Controlled via `SearchBox.module.css`.
- Accessible with `aria-*` tags and focus management.
- Includes `IconButton` with a search icon.

## Switch

### Purpose:

A toggle component (like a checkbox) that switches between `true`/`false`.

### Props:

| Prop           | Type     | Required | Description                                          |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `initialValue` | `bool`   | Yes      | The default switch state (`true` or `false`).        |
| `setResult`    | `func`   | Yes      | Callback that returns the new switch state.          |
| `color`        | `string` | No       | Custom color (CSS variable, default: `--colorCyan`). |
| `label`        | `string` | No       | Optional label shown before the switch.              |
| `disabled`     | `bool`   | No       | Disables interaction if set to `true`.               |
| `customStyles` | `object` | No       | Custom styles for `.container` and `.label`.         |

### Usage:

```jsx
<Switch
  initialValue={false}
  setResult={(state) => console.log("Switch is", state)}
  label="Enable dark mode"
  color="#222"
  customStyles={{
    container: { marginBottom: "1rem" },
    label: { fontWeight: "bold" },
  }}
/>
```

### Interaction:

- Click or press `Enter` / `Space` toggles the state.
- Accessible using `role="switch"` and `aria-checked`.

## **DropdownSimple Component **

### Overview

`DropdownSimple` is a smart and responsive dropdown component that:

- Renders a list of selectable items.
- Automatically detects and avoids **viewport overflow**.
- Adjusts **vertical** (top/bottom) and **horizontal** (left/right) placement dynamically.
- Provides optional **description text** for each item.
- Closes automatically when clicking outside.

### **Usage**

#### **Define Dropdown Items**

Each item should have the following structure:

```js
const dropdownItems = [
  {
    key: "editProject",
    value: "Edit Project",
    description: "Ctrl + E",
  },
  {
    key: "deleteProject",
    value: "Delete Project",
    description: "Del",
  },
  {
    key: "duplicateProject",
    value: "Duplicate",
  },
];

const dropdownItems = [
  { key: "1", value: "Option A" },
  { key: "2", value: "Option B", description: "This is option B" },
];

const dropdownItems = [
  {
    key: "dev",
    value: "Developer",
    box: ["Remote", "Full-time"],
    description: "Work with modern web stacks.",
  },
  {
    key: "designer",
    value: "Designer",
    box: ["Onsite"],
  },
];
```

#### **Render the Dropdown**

Wrap it in a container (`relative`) and render when needed:

```jsx
<div className="tabWithDropdown">
  <button onClick={() => setShowDropdown(!showDropdown)}>Options</button>

  {showDropdown && (
    <DropdownSimple
      items={dropdownItems}
      onSelect={(key) => {
        console.log("Selected:", key);
        setShowDropdown(false);
      }}
    />
  )}
</div>
```

### **Features & Behaviors**

#### 1. **Viewport-Aware Positioning**

- **Vertical:** If there’s not enough space below the trigger element, it renders **above**.
- **Horizontal:** If the dropdown would overflow on the right, it shifts **left**.

#### 2. **Click Outside to Close**

- The dropdown automatically closes when the user clicks outside its area.

#### 3. **Custom Descriptions**

- Items can include a `description` (e.g., keyboard shortcuts) displayed on the right side.

### Example with `useRef` + `useClickOutside`

Use it in a complex tab system or icon button, e.g.:

```jsx
<Tab
  mykey="settings"
  value="Settings"
  icon={<GearIcon />}
  dropdown={dropdownItems}
/>
```

# **`Dropdown` Component**

## **Component Overview**

The `Dropdown` is a reusable and customizable React component that supports:

- Single or multiple selection
- Searchable options
- Dynamic option addition (optional)
- Customizable color and width

## **Usage Example**

```jsx
const MyComponent = () => {
  const [selected, setSelected] = useState([]);

  return (
    <Dropdown
      label="Choose Option(s)"
      options={["Apple", "Banana", "Orange"]}
      multiple={true}
      placeholder="Select fruits"
      value={selected}
      setResult={setSelected}
      addNew={true}
      setAddedOptions={(newOptions) =>
        console.log("Updated Options:", newOptions)
      }
      color="#3498db"
      width="350px"
    />
  );
};
```

## **Props Reference**

| Prop              | Type            | Default            | Description                                                      |
| ----------------- | --------------- | ------------------ | ---------------------------------------------------------------- |
| `options`         | `Array<string>` | `[]`               | List of dropdown options.                                        |
| `multiple`        | `boolean`       | `false`            | Enables multiple selection if true.                              |
| `placeholder`     | `string`        | `"Select..."`      | Placeholder text for the dropdown header.                        |
| `label`           | `string`        | `undefined`        | Optional label above the dropdown.                               |
| `value`           | `Array<string>` | `[]`               | Initial selected value(s).                                       |
| `setResult`       | `Function`      | **Required**       | Callback for sending selected values to the parent.              |
| `addNew`          | `boolean`       | `false`            | Allows the user to add new options.                              |
| `setAddedOptions` | `Function`      | `undefined`        | Callback triggered when a new option is added.                   |
| `color`           | `string`        | `var(--colorCyan)` | Sets the primary color of the dropdown (CSS variable `--color`). |
| `width`           | `string`        | `"300px"`          | Sets the width of the dropdown (CSS variable `--width`).         |

## **Features**

### Single & Multiple Selection

- Use `multiple={true}` for check-box-like multi-select functionality.
- Selected items display as a comma-separated list.

### Searchable

- A search input filters the list of options based on the entered text.

### Add New Option (Optional)

- If `addNew={true}`, users can add a new option using the input field.
- Prevents adding duplicates.

### Clear Selection

- Only visible if `multiple` is enabled and selections exist.
- Resets selection to an empty array.

## **Customization**

### Color and Width

CSS variables are used to allow easy customization:

```css
--color: #00bcd4;
--width: 300px;
```

You can override these via props (`color`, `width`).

## **Considerations**

- **Uniqueness**: Ensure all option strings are unique for reliable behavior.
- **Controlled Component**: `Dropdown` doesn't manage external state; always use `value` + `setResult`.
- **Accessibility**: Basic keyboard accessibility via `tabIndex`, but you can enhance ARIA support if needed.

## Integration Notes:

- All components follow **controlled state** patterns using `setResult`.
- Designed to work seamlessly with custom themes via CSS variables.
- Ensure to import appropriate CSS modules per component.
- Components are reusable, modular, and accessibility-friendly.

## Best Practices

- Use `inlineHelp` to give more context for each option.
- Use `disabled` state for options that are conditionally inactive.
- Use `layout="horizontal"` for inline buttons (especially in toolbars or filters).
- Combine with form libraries like `react-hook-form` for controlled inputs.
