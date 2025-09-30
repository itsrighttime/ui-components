# [ OLD ] Developer Documentation: **GenericForm** Component

## Overview

The `GenericForm` component is designed to dynamically render a flexible and reusable form based on the configuration provided. This form can handle a variety of input fields, including text inputs, dropdowns, multi-select dropdowns, date pickers, time pickers, email fields, mobile fields, password fields, and custom address fields.

This component leverages a **config object** passed as a prop to define the form's structure and behavior. The `GenericForm` is highly customizable, allowing you to easily add, modify, or remove form fields based on your needs.

## Installation

1. Import the `GenericForm` component into your application.

```js
import { UILayout } from "@itsrighttime/ui-components";

const {
  Form,
  KEYS: { FORM_FIELDS_TYPE },
} = UILayout;
```

2. Use the form component by passing a `config` object that defines the form fields and structure.

```js
const formConfig = {
  title: "Create New User",
  description: "Please fill in the details below to create a new user.",
  fields: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter your full name",
    },
    // Add other fields here
  ],
};
```

### **Example of a Full Configuration:**

```js
const formConfig = {
  title: "Create New User", // Title of the form
  description: "Please fill in the details below to create a new user.",

  fields: [
    {
      name: "name", // Field name (key in the formData)
      label: "Full Name", // Field label displayed next to the input
      type: FORM_FIELDS_TYPE.TEXT, // Input type (text, email, etc.)
      required: true, // Make this field mandatory
      placeholder: "Enter your full name", // Placeholder text for the input
    },
    {
      name: "aboutYou",
      label: "About You",
      type: FORM_FIELDS_TYPE.TEXT_AREA,
      placeholder: "Enter something about you...",
      showCharacterCount = false
    },

    {
      name: "email",
      label: "Email Address",
      type: FORM_FIELDS_TYPE.EMAIL,
      required: true,
      placeholder: "Enter your email address",
    },

    {
      name: "password",
      label: "Password",
      type: FORM_FIELDS_TYPE.PASSWORD, // Password field
      required: true,
      placeholder: "Enter a secure password",
    },

    {
      name: "role",
      label: "User Role",
      type: FORM_FIELDS_TYPE.MULTI_DROPDOWN, // Single selection dropdown
      required: true,
      options: ["Admin", "Phase Head", "Operator"],
    },

    {
      name: "phases",
      label: "Assigned Phases",
      type: FORM_FIELDS_TYPE.DROPDOWN, // Multiple selection dropdown
      options: ["Phase 1", "Phase 2", "Phase 3"],
      defaultValue: ["Phase 1"], // Default value pre-selected
    },

    {
      name: "birthdate",
      label: "Date of Birth",
      type: FORM_FIELDS_TYPE.DATE, // Date picker input
      required: true,
      placeholder: "Select your birthdate",
      initialDate: "2000-01-01", // Initial default date
      restrictionStartDate: "1900-01-01", // Restrict start date
      restrictionEndDate: "2025-12-31", // Restrict end date
    },

    {
      name: "appointmentTime",
      label: "Appointment Time",
      type: FORM_FIELDS_TYPE.TIME, // Time picker input
      required: true,
    },

    {
      name: "phone",
      label: "Phone Number",
      type: FORM_FIELDS_TYPE.MOBILE, // Mobile number field
      required: true,
      placeholder: "Enter your phone number",
    },

    {
      name: "address",
      label: "Home Address",
      type: FORM_FIELDS_TYPE.ADDRESS, // Custom Address input component
      isHouse: true,
      isStreet: true,
      isCity: true,
      isState: true,
      isPostal: true,
      isCountry: true,
      isAddressLine: true,
      isLandmark: false,
    },
  ],
};
```

```js
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
};

const settings = {
  showLabelAlways: true,
  gap: "2rem",
  color: "var(--colorCyan)",
};
```

## Usage Example

Here’s how to integrate the `GenericForm` into your application:

### **1. Importing the Form Component:**

```js
import { GenericForm } from "../../Layout/Forms/jsx/GenericForm";
```

### **2. Using the Form in Your Component:**

```js
const handleSubmit = async (formData) => {
  // Handle form submission logic here
  console.log("Form submitted with data:", formData);
};

export const UseFormExample = () => {
  return (
    <div className="App">
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <GenericForm
          config={formConfig} // Pass the form configuration
          onSubmit={handleSubmit} // Handle form submission
          submitLabel="Create User" // Optional: Override default submit button label
          settings = {}
        />
      </div>
    </div>
  );
};
```

## Form Configuration

### **Text, Email, Password, and Mobile Fields:**

| **Prop Name** | **Type**   | **Description**                                                           | **Default Value** |
| ------------- | ---------- | ------------------------------------------------------------------------- | ----------------- |
| `name`        | `string`   | The field name used for form state.                                       | N/A               |
| `label`       | `string`   | The label for the input field.                                            | N/A               |
| `type`        | `string`   | Type of input field (e.g., `"text"`, `"email"`, `"password"`, `"mobile"`) | N/A               |
| `required`    | `boolean`  | Indicates whether the field is required.                                  | `false`           |
| `placeholder` | `string`   | Placeholder text for the input field.                                     | N/A               |
| `value`       | `string`   | The current value of the input field.                                     | N/A               |
| `setResult`   | `function` | Function to update the form state when the input value changes.           | N/A               |

### **Dropdown (Single Selection):**

| **Prop Name** | **Type**   | **Description**                                                                 | **Default Value** |
| ------------- | ---------- | ------------------------------------------------------------------------------- | ----------------- |
| `name`        | `string`   | The field name used for form state.                                             | N/A               |
| `label`       | `string`   | The label for the dropdown.                                                     | N/A               |
| `type`        | `string`   | Type of input field, always `"dropdown"`.                                       | `"dropdown"`      |
| `required`    | `boolean`  | Indicates whether the field is required.                                        | `false`           |
| `options`     | `array`    | Options for dropdown, provided as an array of objects with `label` and `value`. | N/A               |
| `placeholder` | `string`   | Placeholder text for the dropdown.                                              | N/A               |
| `value`       | `string`   | The current selected value of the dropdown.                                     | N/A               |
| `setResult`   | `function` | Function to update the form state when the dropdown value changes.              | N/A               |

### **Multi-Dropdown (Multiple Selections):**

| **Prop Name**  | **Type**   | **Description**                                                                       | **Default Value**  |
| -------------- | ---------- | ------------------------------------------------------------------------------------- | ------------------ |
| `name`         | `string`   | The field name used for form state.                                                   | N/A                |
| `label`        | `string`   | The label for the multi-dropdown.                                                     | N/A                |
| `type`         | `string`   | Type of input field, always `"multi-dropdown"`.                                       | `"multi-dropdown"` |
| `required`     | `boolean`  | Indicates whether the field is required.                                              | `false`            |
| `options`      | `array`    | Options for multi-dropdown, provided as an array of objects with `label` and `value`. | N/A                |
| `placeholder`  | `string`   | Placeholder text for the multi-dropdown.                                              | N/A                |
| `defaultValue` | `array`    | The default selected values for multi-dropdown.                                       | `[]`               |
| `value`        | `array`    | The current selected values of the multi-dropdown.                                    | N/A                |
| `setResult`    | `function` | Function to update the form state when the multi-dropdown value changes.              | N/A                |

### **Date Field:**

| **Prop Name**          | **Type**   | **Description**                                                           | **Default Value** |
| ---------------------- | ---------- | ------------------------------------------------------------------------- | ----------------- |
| `name`                 | `string`   | The field name used for form state.                                       | N/A               |
| `label`                | `string`   | The label for the date picker.                                            | N/A               |
| `type`                 | `string`   | Type of input field, always `"date"`.                                     | `"date"`          |
| `required`             | `boolean`  | Indicates whether the field is required.                                  | `false`           |
| `initialDate`          | `string`   | Initial default date value.                                               | N/A               |
| `restrictionStartDate` | `string`   | The earliest valid date in the date picker.                               | N/A               |
| `restrictionEndDate`   | `string`   | The latest valid date in the date picker.                                 | N/A               |
| `isSmall`              | `boolean`  | Specifies if the date picker should be smaller (useful for inline forms). | `true`            |
| `value`                | `string`   | The current selected date value.                                          | N/A               |
| `setResult`            | `function` | Function to update the form state when the date picker value changes.     | N/A               |

### **Time Field:**

| **Prop Name** | **Type**   | **Description**                                                       | **Default Value** |
| ------------- | ---------- | --------------------------------------------------------------------- | ----------------- |
| `name`        | `string`   | The field name used for form state.                                   | N/A               |
| `label`       | `string`   | The label for the time picker.                                        | N/A               |
| `type`        | `string`   | Type of input field, always `"time"`.                                 | `"time"`          |
| `required`    | `boolean`  | Indicates whether the field is required.                              | `false`           |
| `value`       | `string`   | The current selected time value.                                      | N/A               |
| `setResult`   | `function` | Function to update the form state when the time picker value changes. | N/A               |

### **Address Field:**

| **Prop Name**   | **Type**   | **Description**                                                         | **Default Value** |
| --------------- | ---------- | ----------------------------------------------------------------------- | ----------------- |
| `name`          | `string`   | The field name used for form state.                                     | N/A               |
| `label`         | `string`   | The label for the address field.                                        | N/A               |
| `type`          | `string`   | Type of input field, always `"address"`.                                | `"address"`       |
| `required`      | `boolean`  | Indicates whether the field is required.                                | `false`           |
| `isHouse`       | `boolean`  | Includes a "House Number" input in the address field.                   | `false`           |
| `isStreet`      | `boolean`  | Includes a "Street" input in the address field.                         | `false`           |
| `isCity`        | `boolean`  | Includes a "City" input in the address field.                           | `false`           |
| `isState`       | `boolean`  | Includes a "State" input in the address field.                          | `false`           |
| `isPostal`      | `boolean`  | Includes a "Postal Code" input in the address field.                    | `false`           |
| `isCountry`     | `boolean`  | Includes a "Country" input in the address field.                        | `false`           |
| `isAddressLine` | `boolean`  | Includes a "Address Line" input in the address field.                   | `false`           |
| `isLandmark`    | `boolean`  | Includes a "Landmark" input in the address field.                       | `false`           |
| `value`         | `object`   | An object representing the current value of the address fields.         | N/A               |
| `setResult`     | `function` | Function to update the form state when the address field value changes. | N/A               |

### **TextArea Field:**

| **Prop Name**        | **Type** | **Default Value**    | **Description**                                                                             |
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
| `showCharacterCount` | boolean  | false                | Show character count below the textarea.                                                    |

### **General Properties for all Fields:**

| **Prop Name**     | **Type**  | **Description**                                                                                      | **Default Value**    |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------- | -------------------- |
| `width`           | `string`  | The width of the input element (can be `"100%"` or any other CSS value).                             | `"100%"`             |
| `color`           | `string`  | The color theme for the input fields (use CSS variable like `var(--colorCyan)` or any custom color). | `"var(--colorCyan)"` |
| `showLabelAlways` | `boolean` | If `true`, the label will always be displayed even if the field has a value.                         | `false`              |

Here is a table summarizing each **input type** with its corresponding **config fields** that can be used when configuring the form. Each row describes the input type and the configuration options you can specify for that input.

---

### **Table of Input Types with Config Fields**

| **Input Type**     | **Config Fields**                                                                                                                                                                                                                                                                                                            | **Description**                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Text**           | - `name` (required) <br> - `label` (required) <br> - `type` (default: "text") <br> - `placeholder` <br> - `required` <br> - `defaultValue`                                                                                                                                                                                   | Standard text input for short, single-line text (e.g., names, titles).                                        |
| **Email**          | - `name` (required) <br> - `label` (required) <br> - `type` (default: "email") <br> - `placeholder` <br> - `required` <br> - `defaultValue`                                                                                                                                                                                  | Input field specifically for emails, which validates the email format.                                        |
| **Password**       | - `name` (required) <br> - `label` (required) <br> - `type` (default: "password") <br> - `placeholder` <br> - `required` <br> - `defaultValue`                                                                                                                                                                               | Input for passwords. The text entered is obscured for security.                                               |
| **Mobile**         | - `name` (required) <br> - `label` (required) <br> - `type` (default: "mobile") <br> - `placeholder` <br> - `required` <br> - `defaultValue` <br> - `countryCode` <br> - `validationPattern`                                                                                                                                 | For mobile phone numbers with optional country code and validation.                                           |
| **Dropdown**       | - `name` (required) <br> - `label` (required) <br> - `type` (default: "dropdown") <br> - `options` (required) <br> - `placeholder` <br> - `required` <br> - `defaultValue` <br> - `multiple` (optional)                                                                                                                      | Dropdown field for selecting a single option from a predefined list.                                          |
| **Multi-Dropdown** | - `name` (required) <br> - `label` (required) <br> - `type` (default: "multi-dropdown") <br> - `options` (required) <br> - `placeholder` <br> - `required` <br> - `defaultValue` <br> - `multiple`                                                                                                                           | Dropdown with multiple selection support, allowing the user to select more than one option.                   |
| **Date**           | - `name` (required) <br> - `label` (required) <br> - `type` (default: "date") <br> - `placeholder` <br> - `required` <br> - `initialDate` <br> - `restrictionStartDate` <br> - `restrictionEndDate`                                                                                                                          | A date picker for selecting a specific date, with optional start and end date restrictions.                   |
| **Time**           | - `name` (required) <br> - `label` (required) <br> - `type` (default: "time") <br> - `required` <br> - `defaultValue`                                                                                                                                                                                                        | A time picker for selecting a specific time (e.g., appointment time).                                         |
| **Address**        | - `name` (required) <br> - `label` (required) <br> - `type` (default: "address") <br> - `isHouse` (optional) <br> - `isStreet` (optional) <br> - `isCity` (optional) <br> - `isState` (optional) <br> - `isPostal` (optional) <br> - `isCountry` (optional) <br> - `isAddressLine` (optional) <br> - `isLandmark` (optional) | Custom address input for multi-field address (house number, street, city, state, postal code, country, etc.). |

---

### **Description of Config Fields**

1. **Text**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "text").
   - **placeholder**: Placeholder text shown in the input.
   - **required**: Boolean value that determines if the field is required.
   - **defaultValue**: Default value for the field.

2. **Email**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "email").
   - **placeholder**: Placeholder text shown in the input.
   - **required**: Boolean value that determines if the field is required.
   - **defaultValue**: Default value for the field.

3. **Password**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "password").
   - **placeholder**: Placeholder text shown in the input.
   - **required**: Boolean value that determines if the field is required.
   - **defaultValue**: Default value for the field.

4. **Mobile**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "mobile").
   - **placeholder**: Placeholder text shown in the input.
   - **required**: Boolean value that determines if the field is required.
   - **defaultValue**: Default value for the field.
   - **countryCode**: The optional country code for mobile numbers.
   - **validationPattern**: Custom pattern for validating mobile numbers.

5. **Dropdown**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "dropdown").
   - **options**: Array of options for the dropdown.
   - **placeholder**: Placeholder text shown in the input.
   - **required**: Boolean value that determines if the field is required.
   - **defaultValue**: Default selected value for the dropdown.
   - **multiple**: (Optional) Boolean to enable multiple selections.

6. **Multi-Dropdown**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "multi-dropdown").
   - **options**: Array of options for the multi-dropdown.
   - **placeholder**: Placeholder text shown in the input.
   - **required**: Boolean value that determines if the field is required.
   - **defaultValue**: Default selected values for the multi-dropdown.
   - **multiple**: (Optional) Boolean to enable multiple selections.

7. **Date**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "date").
   - **placeholder**: Placeholder text shown in the input.
   - **required**: Boolean value that determines if the field is required.
   - **initialDate**: The initial default date for the date picker.
   - **restrictionStartDate**: The earliest allowed date.
   - **restrictionEndDate**: The latest allowed date.

8. **Time**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "time").
   - **required**: Boolean value that determines if the field is required.
   - **defaultValue**: Default value for the time picker.

9. **Address**:

   - **name**: The field identifier.
   - **label**: The label displayed next to the input.
   - **type**: Type of input (default: "address").
   - **isHouse**: Boolean to indicate if house number field is enabled.
   - **isStreet**: Boolean to indicate if street field is enabled.
   - **isCity**: Boolean to indicate if city field is enabled.
   - **isState**: Boolean to indicate if state field is enabled.
   - **isPostal**: Boolean to indicate if postal code field is enabled.
   - **isCountry**: Boolean to indicate if country field is enabled.
   - **isAddressLine**: Boolean to indicate if address line field is enabled.
   - **isLandmark**: Boolean to indicate if landmark field is enabled.
