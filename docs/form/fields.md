### **Form Field Index**

| **Field Type**    | **Component**      | **Reference / Description**                |
| ----------------- | ------------------ | ------------------------------------------ |
| Text              | `TextField`        | Standard single-line text input.           |
| Text Area         | `TextArea`         | Multi-line text input.                     |
| Email             | `EmailField`       | Input specifically for email addresses.    |
| Mobile            | `MobileField`      | Input for phone numbers with country code. |
| Password          | `PasswordField`    | Input for passwords with masking.          |
| Date              | `DatePicker`       | Calendar date selection.                   |
| Time              | `TimePicker`       | Time selection input.                      |
| Address           | `AddressField`     | Input for structured addresses.            |
| Dropdown          | `Dropdown`         | Single-select dropdown.                    |
| Multi Dropdown    | `Dropdown`         | Multi-select dropdown.                     |
| File              | `FileUpload`       | File upload input.                         |
| Audio             | `AudioUpload`      | Audio file upload.                         |
| Image             | `ImageUpload`      | Image file upload with preview.            |
| Video             | `VideoUpload`      | Video file upload with optional preview.   |
| JSON              | `JsonField`        | JSON text input field.                     |
| Security Question | `SecurityQuestion` | Predefined security question input.        |
| OTP               | `OtpField`         | One-time password input field.             |
| Checkbox Group    | `CheckboxGroup`    | Group of checkboxes.                       |
| Color Picker      | `ColorPicker`      | Color selection input.                     |
| Radio Group       | `RadioGroup`       | Group of radio buttons.                    |
| Search Box        | `SearchBox`        | Autocomplete search input.                 |
| Switch            | `Switch`           | Toggle switch input.                       |
| Slider / Stepper  | `Slider`           | Numeric slider input (can act as stepper). |

### **Form Field Props Reference**

| **Field Type**                                | **Props**                                                                                                                                                                                |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Text](#text-field)                           | `name, type, label, value, placeholder, required, width, color, showLabelAlways, setResult, setIsFieldValid`                                                                             |
| [Text Area](#textarea)                        | `name, type, label, value, placeholder, minLength, maxLength, maxTextAreaHeight, showCharacterCount, showWordCount, disabled, width, color, showLabelAlways, setResult, setIsFieldValid` |
| [Email](#email-field)                         | `name, type, label, value, placeholder, required, width, color, showLabelAlways, setResult, setIsFieldValid`                                                                             |
| [Mobile](#mobile-field)                       | `name, type, label, value, placeholder, required, width, color, showLabelAlways, setResult, setIsFieldValid`                                                                             |
| [Password](#password-field)                   | `name, type, label, value, placeholder, width, color, showLabelAlways, setResult, setIsFieldValid`                                                                                       |
| [Date](#date-field)                           | `name, type, label, value, required, initialDate, restrictionStartDate, restrictionEndDate, isSmall, width, color, mode, showLabelAlways, setResult`                                           |
| [Time](#time-field)                           | `name, type, label, value, width, color, setResult`                                                                                                                                      |
| [Address](#address-field)                     | `name, type, isHouse, isStreet, isCity, isState, isPostal, isCountry, isAddressLine, isLandmark, width, color, gap, showLabelAlways, setResult, setIsFieldValid`                         |
| [Dropdown](#dropdown-field)                   | `name, type, label, placeholder, value, multiple, options, width, color, showLabelAlways, setResult`                                                                                     |
| [File](#file-upload-field)                    | `name, type, label, value, multiple, maxFiles, allowedTypes, maxSize, width, height, color, setResult, setIsFieldValid`                                                                  |
| [Audio](#audio-upload-field)                  | `name, type, label, value, allowedTypes, maxSizeMB, width, height, color, setResult, setIsFieldValid`                                                                                    |
| [Image](#image-upload-field)                  | `name, type, label, value, allowedTypes, maxSizeMB, requireSquare, width, height, previewBorderRadius, color, setResult, setIsFieldValid`                                                |
| [Video](#video-upload-field)                  | `name, type, label, value, allowedTypes, maxSizeMB, preview, width, height, color, setResult, setIsFieldValid`                                                                           |
| [JSON](#json-field)                           | `name, type, label, value, width, color, showCharacterCount, showWordCount, hideOnSave, isBorder, backendError, setResult, setIsFieldValid`                                              |
| [Security Question](#security-question-field) | `name, type, label, placeholder, value, width, color, setResult`                                                                                                                         |
| [OTP](#otp-field)                             | `name, type, value, length, verifcationEndpoint, userId, isNumeric, setResult, setError, width, color`                                                                                   |
| [Checkbox Group](#checkbox-group-field)       | `name, type, label, options, initialSelectedValues, layout, disabled, width, color, customStyles, setResult`                                                                             |
| [Color Picker](#color-picker-field)           | `name, type, value, width, color, setResult`                                                                                                                                             |
| [ Radio Group](#radio-group-field)            | `name, type, label, options, initialSelectedValues, initialSelectedValue, layout, disabled, width, color, customStyles, setResult`                                                       |
| [Search Box ](#search-box-field)              | `name, type, label, placeholder, suggestions, width, color, setResult`                                                                                                                   |
| [Switch ](#switch-field)                      | `name, type, label, initialValue, disabled, width, color, customStyles, setResult`                                                                                                       |
| [Slider ](#slider-field)                      | `name, type, label, value, min, max, step, precision, showRange, showValueSide, width, color, setResult`                                                                                 |
| [ Stepper](#stepper-field)                    | `name, type, label, value, min, max, step, width, color, setResult`                                                                                                                      |

### **Text Field**

| **Prop Name**     | **Type**   | **Description**                     | **Default Value**    |
| ----------------- | ---------- | ----------------------------------- | -------------------- |
| `name`            | `string`   | Field name used for form state.     | N/A                  |
| `type`            | `string`   | Type of field, always mention this  | N/A                  |
| `label`           | `string`   | Field label.                        | N/A                  |
| `required`        | `boolean`  | Whether the field is required.      | `false`              |
| `value`           | `string`   | Current field value.                | N/A                  |
| `placeholder`     | `string`   | Placeholder text.                   | N/A                  |
| `setResult`       | `function` | Updates form state on value change. | N/A                  |
| `setIsFieldValid` | `function` | Updates field validation state.     | N/A                  |
| `width`           | `string`   | Width of input.                     | `"100%"`             |
| `color`           | `string`   | Accent color.                       | `"var(--colorCyan)"` |

### **TextArea**

| **Prop Name**        | **Type**   | **Description**                       | **Default Value**    |
| -------------------- | ---------- | ------------------------------------- | -------------------- |
| `name`               | `string`   | Field name used for form state.       | N/A                  |
| `type`               | `string`   | Type of field, always mention this    | N/A                  |
| `label`              | `string`   | Field label.                          | N/A                  |
| `value`              | `string`   | Current text value.                   | N/A                  |
| `placeholder`        | `string`   | Placeholder text.                     | N/A                  |
| `minLength`          | `number`   | Minimum characters allowed.           | N/A                  |
| `maxLength`          | `number`   | Maximum characters allowed.           | N/A                  |
| `maxTextAreaHeight`  | `string`   | Maximum height for the textarea.      | N/A                  |
| `showCharacterCount` | `boolean`  | Show character count below the field. | false                |
| `showWordCount`      | `boolean`  | Show word count below the field.      | false                |
| `disabled`           | `boolean`  | Disable field input.                  | false                |
| `setResult`          | `function` | Updates form state.                   | N/A                  |
| `setIsFieldValid`    | `function` | Updates validation state.             | N/A                  |
| `width`              | `string`   | Field width.                          | `"100%"`             |
| `color`              | `string`   | Accent color.                         | `"var(--colorCyan)"` |

### **Email Field**

| **Prop Name**     | **Type**   | **Description**                    | **Default Value**    |
| ----------------- | ---------- | ---------------------------------- | -------------------- |
| `name`            | `string`   | Field name for state.              | N/A                  |
| `type`            | `string`   | Type of field, always mention this | N/A                  |
| `label`           | `string`   | Field label.                       | N/A                  |
| `value`           | `string`   | Current email value.               | N/A                  |
| `required`        | `boolean`  | Whether email is required.         | false                |
| `placeholder`     | `string`   | Placeholder text.                  | N/A                  |
| `setResult`       | `function` | Updates state with email.          | N/A                  |
| `setIsFieldValid` | `function` | Updates validation state.          | N/A                  |
| `width`           | `string`   | Input width.                       | `"100%"`             |
| `color`           | `string`   | Accent color.                      | `"var(--colorCyan)"` |

### **Password Field**

| **Prop Name** | **Type**   | **Description**                    | **Default Value**    |
| ------------- | ---------- | ---------------------------------- | -------------------- |
| `name`        | `string`   | Field name for state.              | N/A                  |
| `type`        | `string`   | Type of field, always mention this | N/A                  |
| `label`       | `string`   | Field label.                       | N/A                  |
| `value`       | `string`   | Current password value.            | N/A                  |
| `placeholder` | `string`   | Placeholder text.                  | N/A                  |
| `setResult`   | `function` | Updates state with password.       | N/A                  |
| `width`       | `string`   | Input width.                       | `"100%"`             |
| `color`       | `string`   | Accent color.                      | `"var(--colorCyan)"` |

### **Mobile Field**

| **Prop Name**     | **Type**   | **Description**                              | **Default Value**    |
| ----------------- | ---------- | -------------------------------------------- | -------------------- |
| `name`            | `string`   | Field name for state.                        | N/A                  |
| `type`            | `string`   | Type of field, always mention this           | N/A                  |
| `label`           | `string`   | Field label.                                 | N/A                  |
| `value`           | `object`   | `{ code: countryCode, number: phoneNumber }` | N/A                  |
| `required`        | `boolean`  | Whether mobile is required.                  | false                |
| `placeholder`     | `string`   | Placeholder text.                            | N/A                  |
| `setResult`       | `function` | Updates state with phone object.             | N/A                  |
| `setIsFieldValid` | `function` | Updates validation state.                    | N/A                  |
| `width`           | `string`   | Input width.                                 | `"100%"`             |
| `color`           | `string`   | Accent color.                                | `"var(--colorCyan)"` |

### **Date Field**

| **Prop Name**          | **Type**   | **Description**                    | **Default Value**                           |
| ---------------------- | ---------- | ---------------------------------- | ------------------------------------------- |
| `name`                 | `string`   | Field name for state.              | N/A                                         |
| `type`                 | `string`   | Type of field, always mention this | N/A                                         |
| `label`                | `string`   | Field label.                       | N/A                                         |
| `required`             | `boolean`  | Whether date is required.          | false                                       |
| `initialDate`          | `string`   | Default date.                      | N/A                                         |
| `restrictionStartDate` | `string`   | Earliest selectable date.          | N/A                                         |
| `restrictionEndDate`   | `string`   | Latest selectable date.            | N/A                                         |
| `isSmall`              | `boolean`  | Small picker option.               | true                                        |
| `value`                | `string`   | Current date.                      | N/A                                         |
| `setResult`            | `function` | Updates state.                     | N/A                                         |
| `width`                | `string`   | Input width.                       | `"100%"`                                    |
| `color`                | `string`   | Accent color.                      | `"var(--colorCyan)"`                        |
| `mode`                 | `enum`     | CSS width for layout flexibility   | `month-year` \| `year` \| `month` \| `date` |

### **Time Field**

| **Prop Name** | **Type**   | **Description**                    | **Default Value**    |
| ------------- | ---------- | ---------------------------------- | -------------------- |
| `name`        | `string`   | Field name for state.              | N/A                  |
| `type`        | `string`   | Type of field, always mention this | N/A                  |
| `label`       | `string`   | Field label.                       | N/A                  |
| `value`       | `string`   | Current time value.                | N/A                  |
| `setResult`   | `function` | Updates state on value change.     | N/A                  |
| `color`       | `string`   | Accent color.                      | `"var(--colorCyan)"` |

### **Address Field**

| **Prop Name**     | **Type**   | **Description**                    | **Default Value**    |
| ----------------- | ---------- | ---------------------------------- | -------------------- |
| `name`            | `string`   | Field name for state.              | N/A                  |
| `type`            | `string`   | Type of field, always mention this | N/A                  |
| `setResult`       | `function` | Updates state on address change.   | N/A                  |
| `isHouse`         | `boolean`  | Show house field.                  | false                |
| `isStreet`        | `boolean`  | Show street field.                 | false                |
| `isCity`          | `boolean`  | Show city field.                   | false                |
| `isState`         | `boolean`  | Show state field.                  | false                |
| `isPostal`        | `boolean`  | Show postal code field.            | false                |
| `isCountry`       | `boolean`  | Show country field.                | false                |
| `isAddressLine`   | `boolean`  | Show address line field.           | false                |
| `isLandmark`      | `boolean`  | Show landmark field.               | false                |
| `setIsFieldValid` | `function` | Updates validation state.          | N/A                  |
| `showLabelAlways` | `boolean`  | Always show field label.           | false                |
| `width`           | `string`   | Input width.                       | `"100%"`             |
| `color`           | `string`   | Accent color.                      | `"var(--colorCyan)"` |

### **Dropdown Field**

| **Prop Name**     | **Type**   | **Description**                          | **Default Value**    |
| ----------------- | ---------- | ---------------------------------------- | -------------------- |
| `name`            | `string`   | Field name for form state.               | N/A                  |
| `type`            | `string`   | Type of field, always mention this       | N/A                  |
| `label`           | `string`   | Field label.                             | N/A                  |
| `placeholder`     | `string`   | Placeholder text if nothing is selected. | `label`              |
| `options`         | `array`    | List of selectable options.              | []                   |
| `value`           | `any`      | Selected value.                          | N/A                  |
| `multiple`        | `boolean`  | Allow multiple selections.               | false                |
| `setResult`       | `function` | Updates form state on selection change.  | N/A                  |
| `width`           | `string`   | Dropdown width.                          | `"100%"`             |
| `color`           | `string`   | Accent color.                            | `"var(--colorCyan)"` |
| `showLabelAlways` | `boolean`  | Always display label above field.        | false                |

### **Multi-Dropdown Field**

| **Prop Name**            | **Type**  | **Description**               | **Default Value** |
| ------------------------ | --------- | ----------------------------- | ----------------- |
| Same as Dropdown except: |           |                               |                   |
| `multiple`               | `boolean` | Always true for multi-select. | true              |
| `value`                  | `array`   | Array of selected values.     | []                |

### **File Upload Field**

| **Prop Name**     | **Type**   | **Description**                    | **Default Value**    |
| ----------------- | ---------- | ---------------------------------- | -------------------- |
| `name`            | `string`   | Field name for state.              | N/A                  |
| `type`            | `string`   | Type of field, always mention this | N/A                  |
| `label`           | `string`   | Field label.                       | N/A                  |
| `value`           | `array`    | Array of uploaded files.           | []                   |
| `multiple`        | `boolean`  | Allow multiple files.              | false                |
| `maxFiles`        | `number`   | Maximum allowed files.             | N/A                  |
| `allowedTypes`    | `array`    | Allowed MIME types.                | []                   |
| `maxSize`         | `number`   | Maximum file size in bytes.        | N/A                  |
| `width`           | `string`   | Input width.                       | `"100%"`             |
| `height`          | `string`   | Preview area height.               | `"200px"`            |
| `color`           | `string`   | Accent color.                      | `"var(--colorCyan)"` |
| `setResult`       | `function` | Updates state on file change.      | N/A                  |
| `setIsFieldValid` | `function` | Updates validation state.          | N/A                  |

### **Audio Upload Field**

| **Prop Name**     | **Type**   | **Description**                    | **Default Value**    |
| ----------------- | ---------- | ---------------------------------- | -------------------- |
| `name`            | `string`   | Field name for state.              | N/A                  |
| `type`            | `string`   | Type of field, always mention this | N/A                  |
| `label`           | `string`   | Field label.                       | N/A                  |
| `value`           | `array`    | Array of uploaded audio files.     | []                   |
| `allowedTypes`    | `array`    | Allowed audio MIME types.          | []                   |
| `maxSizeMB`       | `number`   | Maximum file size in MB.           | 5                    |
| `width`           | `string`   | Input width.                       | `"100%"`             |
| `height`          | `string`   | Preview area height.               | `"100px"`            |
| `color`           | `string`   | Accent color.                      | `"var(--colorCyan)"` |
| `setResult`       | `function` | Updates state when files change.   | N/A                  |
| `setIsFieldValid` | `function` | Updates validation state.          | N/A                  |

### **Image Upload Field**

| **Prop Name**         | **Type**   | **Description**                    | **Default Value**                          |
| --------------------- | ---------- | ---------------------------------- | ------------------------------------------ |
| `name`                | `string`   | Field name for state.              | N/A                                        |
| `type`                | `string`   | Type of field, always mention this | N/A                                        |
| `label`               | `string`   | Field label.                       | N/A                                        |
| `value`               | `File`     | Selected image file.               | N/A                                        |
| `allowedTypes`        | `array`    | Allowed image MIME types.          | `["image/jpeg", "image/png", "image/gif"]` |
| `maxSizeMB`           | `number`   | Maximum image size in MB.          | 5                                          |
| `requireSquare`       | `boolean`  | Whether the image must be square.  | true                                       |
| `previewBorderRadius` | `string`   | Border radius for preview.         | `"0%"`                                     |
| `width`               | `string`   | Preview width.                     | `"200px"`                                  |
| `height`              | `string`   | Preview height.                    | `"200px"`                                  |
| `color`               | `string`   | Accent color.                      | `"var(--colorCyan)"`                       |
| `setResult`           | `function` | Updates state on file change.      | N/A                                        |
| `setIsFieldValid`     | `function` | Updates validation state.          | N/A                                        |

### **Video Upload Field**

| **Prop Name**     | **Type**   | **Description**                       | **Default Value**             |
| ----------------- | ---------- | ------------------------------------- | ----------------------------- |
| `name`            | `string`   | Field name for state.                 | N/A                           |
| `type`            | `string`   | Type of field, always mention this    | N/A                           |
| `label`           | `string`   | Field label.                          | N/A                           |
| `value`           | `File`     | Selected video file.                  | N/A                           |
| `allowedTypes`    | `array`    | Allowed video MIME types.             | `["video/mp4", "video/webm"]` |
| `maxSizeMB`       | `number`   | Maximum video size in MB.             | 50                            |
| `preview`         | `boolean`  | Whether to show video preview player. | false                         |
| `width`           | `string`   | Preview/player width.                 | `"400px"`                     |
| `height`          | `string`   | Preview/player height.                | `"200px"`                     |
| `color`           | `string`   | Accent color.                         | `"var(--colorCyan)"`          |
| `setResult`       | `function` | Updates state on file change.         | N/A                           |
| `setIsFieldValid` | `function` | Updates validation state.             | N/A                           |

### **JSON Field**

| **Prop Name**        | **Type**   | **Description**                            | **Default Value**    |
| -------------------- | ---------- | ------------------------------------------ | -------------------- |
| `name`               | `string`   | Field name for state.                      | N/A                  |
| `type`               | `string`   | Type of field, always mention this         | N/A                  |
| `label`              | `string`   | Field label.                               | N/A                  |
| `value`              | `object`   | JSON object value.                         | N/A                  |
| `showCharacterCount` | `boolean`  | Display character count.                   | false                |
| `showWordCount`      | `boolean`  | Display word count.                        | false                |
| `isBorder`           | `boolean`  | Whether to show a border around the field. | false                |
| `hideOnSave`         | `boolean`  | Hide field when saving.                    | false                |
| `backendError`       | `string`   | Display error from backend.                | N/A                  |
| `width`              | `string`   | Field width.                               | `"100%"`             |
| `color`              | `string`   | Accent color.                              | `"var(--colorCyan)"` |
| `setResult`          | `function` | Updates state on value change.             | N/A                  |
| `setIsFieldValid`    | `function` | Updates validation state.                  | N/A                  |

### **Security Question Field**

| **Prop Name** | **Type**   | **Description**                    | **Default Value**    |
| ------------- | ---------- | ---------------------------------- | -------------------- |
| `name`        | `string`   | Field name for state.              | N/A                  |
| `type`        | `string`   | Type of field, always mention this | N/A                  |
| `label`       | `string`   | Field label or placeholder.        | N/A                  |
| `width`       | `string`   | Input width.                       | `"100%"`             |
| `color`       | `string`   | Accent color.                      | `"var(--colorCyan)"` |
| `setResult`   | `function` | Updates state on selection/change. | N/A                  |

### **OTP Field**

| **Prop Name**         | **Type**   | **Description**                               | **Default Value**    |
| --------------------- | ---------- | --------------------------------------------- | -------------------- |
| `name`                | `string`   | Field name for state.                         | N/A                  |
| `type`                | `string`   | Type of field, always mention this            | N/A                  |
| `length`              | `number`   | Number of digits in OTP.                      | N/A                  |
| `isNumeric`           | `boolean`  | Restrict input to numbers only.               | true                 |
| `verifcationEndpoint` | `string`   | Backend endpoint for OTP verification.        | N/A                  |
| `userId`              | `string`   | User identifier for OTP request/verification. | N/A                  |
| `setError`            | `function` | Sets field-specific error.                    | N/A                  |
| `width`               | `string`   | Field width.                                  | `"100%"`             |
| `color`               | `string`   | Accent color.                                 | `"var(--colorCyan)"` |
| `setResult`           | `function` | Updates state on OTP input.                   | N/A                  |

### **Checkbox Group Field**

| **Prop Name**           | **Type**   | **Description**                           | **Default Value**    |
| ----------------------- | ---------- | ----------------------------------------- | -------------------- |
| `name`                  | `string`   | Field name for state.                     | N/A                  |
| `type`                  | `string`   | Type of field, always mention this        | N/A                  |
| `label`                 | `string`   | Field label.                              | N/A                  |
| `options`               | `array`    | List of checkbox options.                 | []                   |
| `initialSelectedValues` | `array`    | Array of initially selected values.       | []                   |
| `layout`                | `string`   | Layout style (`horizontal` / `vertical`). | N/A                  |
| `disabled`              | `boolean`  | Disable the entire group.                 | false                |
| `customStyles`          | `object`   | Custom CSS styles for checkboxes.         | N/A                  |
| `width`                 | `string`   | Field width.                              | `"100%"`             |
| `color`                 | `string`   | Accent color.                             | `"var(--colorCyan)"` |
| `setResult`             | `function` | Updates state on change.                  | N/A                  |

### **Color Picker Field**

| **Prop Name** | **Type**   | **Description**                    | **Default Value**    |
| ------------- | ---------- | ---------------------------------- | -------------------- |
| `name`        | `string`   | Field name for state.              | N/A                  |
| `type`        | `string`   | Type of field, always mention this | N/A                  |
| `setResult`   | `function` | Updates state on color selection.  | N/A                  |
| `color`       | `string`   | Initial or accent color.           | `"var(--colorCyan)"` |

### **Radio Group Field**

| **Prop Name**           | **Type**   | **Description**                                     | **Default Value**    |
| ----------------------- | ---------- | --------------------------------------------------- | -------------------- |
| `name`                  | `string`   | Field name for state.                               | N/A                  |
| `type`                  | `string`   | Type of field, always mention this                  | N/A                  |
| `label`                 | `string`   | Field label.                                        | N/A                  |
| `options`               | `array`    | List of radio button options.                       | []                   |
| `initialSelectedValue`  | `string`   | Default selected option.                            | N/A                  |
| `initialSelectedValues` | `array`    | Alternate way for multiple defaults (if supported). | []                   |
| `layout`                | `string`   | Layout style (`horizontal` / `vertical`).           | N/A                  |
| `disabled`              | `boolean`  | Disable the entire group.                           | false                |
| `customStyles`          | `object`   | Custom CSS styles for radios.                       | N/A                  |
| `width`                 | `string`   | Field width.                                        | `"100%"`             |
| `color`                 | `string`   | Accent color.                                       | `"var(--colorCyan)"` |
| `setResult`             | `function` | Updates state on selection change.                  | N/A                  |

### **Search Box Field**

| **Prop Name** | **Type**   | **Description**                       | **Default Value**    |
| ------------- | ---------- | ------------------------------------- | -------------------- |
| `name`        | `string`   | Field name for state.                 | N/A                  |
| `type`        | `string`   | Type of field, always mention this    | N/A                  |
| `placeholder` | `string`   | Placeholder text.                     | N/A                  |
| `suggestions` | `array`    | List of suggestions for autocomplete. | []                   |
| `width`       | `string`   | Input width.                          | `"100%"`             |
| `color`       | `string`   | Accent color.                         | `"var(--colorCyan)"` |
| `setResult`   | `function` | Updates state on value change.        | N/A                  |

### **Switch Field**

| **Prop Name**  | **Type**   | **Description**                    | **Default Value**    |
| -------------- | ---------- | ---------------------------------- | -------------------- |
| `name`         | `string`   | Field name for state.              | N/A                  |
| `type`         | `string`   | Type of field, always mention this | N/A                  |
| `label`        | `string`   | Field label.                       | N/A                  |
| `initialValue` | `boolean`  | Default switch state.              | false                |
| `disabled`     | `boolean`  | Disable the switch.                | false                |
| `customStyles` | `object`   | Custom CSS for switch.             | N/A                  |
| `color`        | `string`   | Accent color.                      | `"var(--colorCyan)"` |
| `setResult`    | `function` | Updates state on toggle.           | N/A                  |

### **Slider Field**

| **Prop Name**   | **Type**   | **Description**                    | **Default Value**    |
| --------------- | ---------- | ---------------------------------- | -------------------- |
| `name`          | `string`   | Field name for state.              | N/A                  |
| `type`          | `string`   | Type of field, always mention this | N/A                  |
| `label`         | `string`   | Field label.                       | N/A                  |
| `value`         | `number`   | Current slider value.              | 0                    |
| `min`           | `number`   | Minimum value.                     | 0                    |
| `max`           | `number`   | Maximum value.                     | 100                  |
| `step`          | `number`   | Step increment.                    | 1                    |
| `precision`     | `number`   | Decimal precision for value.       | 0                    |
| `showRange`     | `boolean`  | Show min/max range.                | false                |
| `showValueSide` | `boolean`  | Show current value next to slider. | false                |
| `width`         | `string`   | Slider width.                      | `"100%"`             |
| `color`         | `string`   | Accent color.                      | `"var(--colorCyan)"` |
| `setResult`     | `function` | Updates state on value change.     | N/A                  |

### **Stepper Field**

| **Prop Name** | **Type**   | **Description**                    | **Default Value**    |
| ------------- | ---------- | ---------------------------------- | -------------------- |
| `name`        | `string`   | Field name for state.              | N/A                  |
| `type`        | `string`   | Type of field, always mention this | N/A                  |
| `label`       | `string`   | Field label.                       | N/A                  |
| `value`       | `number`   | Current slider value.              | 0                    |
| `min`         | `number`   | Minimum value.                     | 0                    |
| `max`         | `number`   | Maximum value.                     | 100                  |
| `step`        | `number`   | Step increment.                    | 1                    |
| `width`       | `string`   | Slider width.                      | `"100%"`             |
| `color`       | `string`   | Accent color.                      | `"var(--colorCyan)"` |
| `setResult`   | `function` | Updates state on value change.     | N/A                  |
