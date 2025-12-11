## Developer Guide – `FileUpload` Component

### Purpose

`FileUpload` is a fully customizable React component for uploading and managing files via:

- drag & drop
- manual file selection
- preview & removal
- re-uploading individual files

It supports:

- validation (type, size, max count)
- controlled component pattern (`setResult`)
- rich UI feedback
- keyboard accessibility

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { FileUpload } = UIInputs.Upload;
```

### Props & Configuration

| Prop              | Type       | Default         | Description                                                                       |
| ----------------- | ---------- | --------------- | --------------------------------------------------------------------------------- |
| `value`           | `object[]` | `[]`            | Value that it current hold.                                                       |
| `label`           | `string`   | `"Upload File"` | Label shown inside upload box.                                                    |
| `setResult`       | `function` | _required_      | Function to receive uploaded file list.                                           |
| `setIsFieldValid` | `function` | `() => {}`      | Called with `true`/`false` to validate form state.                                |
| `allowedTypes`    | `string[]` | `[]`            | Accepted MIME types (e.g. `["image/png", "application/pdf"]`).                    |
| `maxSize`         | `number`   | `Infinity`      | Maximum file size in **bytes**.                                                   |
| `multiple`        | `boolean`  | `false`         | Allow multiple files.                                                             |
| `maxFiles`        | `number`   | `Infinity`      | Max number of files allowed.                                                      |
| `color`           | `string`   | `"#52C9BD"`     | Base accent color (for buttons & borders).                                        |
| `width`           | `string`   | `"500px"`       | Width of the component.                                                           |
| `height`          | `string`   | `"100px"`       | Height of the component.                                                          |
| `backendError`    | `string`   | `""`            | To make sure if eny error occurs at the bakend that reaches to the correct field. |
| `value`           | `-`        | `null`          | Initial value.                                                                    |
| `required`        | `boolean`  | `false`         | If true, marks input as required                                                  |

### Example Usage

```jsx
import { useState } from "react";
import { FileUpload } from "./components/FileUpload/jsx/FileUpload.jsx";

const UploadForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isValid, setIsValid] = useState(false);

  return (
    <div>
      <h2>Upload Your Documents</h2>
      <FileUpload
        label="Drop or Select Documents"
        setResult={setUploadedFiles}
        setIsFieldValid={setIsValid}
        allowedTypes={["application/pdf", "image/jpeg", "image/png"]}
        maxSize={5 * 1024 * 1024} // 5MB
        multiple
        maxFiles={3}
        color="#007bff"
        width="600px"
        height="120px"
      />
      <button disabled={!isValid}>Submit</button>
    </div>
  );
};
```

### Features

#### Drag & Drop Support

- Files can be dropped anywhere in the designated box.
- Drop effect is visually highlighted (`.dragging` class).

#### File Validation

- Enforces file type (`allowedTypes`)
- Limits file size (`maxSize`)
- Rejects duplicate files
- Caps total files (`maxFiles`)

#### File Actions

- **Preview:** Opens file in a new tab.
- **Re-upload:** Click to replace a single file.
- **Remove:** Delete file from current list.
- **Reset All:** Clears everything.
- **Add More:** Dynamically add files if `multiple` is true.

#### Accessibility

- Keyboard-friendly (file preview on Enter).
- Uses `aria-label` and `role="button"` where needed.

### Tips for Developers

- Ensure you call `setResult(files)` to capture uploaded files in your state/form.
- Use `setIsFieldValid` for form validation control.
- Always pass `multiple={true}` if expecting batch upload.
- Use MIME types (not extensions) for `allowedTypes`, e.g., `image/png`, `application/pdf`.

### FAQ

**Q: How to allow only images?**

```jsx
allowedTypes={["image/png", "image/jpeg"]}
```

**Q: How to allow only PDFs and DOCs?**

```jsx
allowedTypes={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]}
```

**Q: What happens if someone selects the same file again?**
It will be ignored unless it’s re-uploaded through the “Replace” option.
