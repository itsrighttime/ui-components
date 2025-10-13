# Developer Guide: `ImageUpload` and `ImagePreview`

This guide explains the features, props, and usage examples of the `ImageUpload` and `ImagePreview` components. These components are designed to work together for a smooth image input and preview experience in React applications.

- [`ImagePreview`](#imagepreview-component)
- [`ImageUpload`](#imageupload-component)

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { ImageUpload, ImagePreview } = UIInputs.Upload;
```

## `ImageUpload` Component

### Purpose

`ImageUpload` is an interactive image uploader that supports:

- Drag & drop
- File size/type validation
- Optional square image enforcement
- Image preview with options to reset or remove

### Props

| Prop                  | Type       | Default                                    | Description                                     |
| --------------------- | ---------- | ------------------------------------------ | ----------------------------------------------- |
| `label`               | `string`   | `"Upload Image"`                           | Text label for the uploader                     |
| `setResult`           | `function` | —                                          | Callback to receive the selected File object    |
| `color`               | `string`   | `var(--colorCyan)`                         | Theme color for border and buttons              |
| `setIsFieldValid`     | `function` | `() => {}`                                 | Callback to update field validity               |
| `allowedTypes`        | `string[]` | `["image/jpeg", "image/png", "image/gif"]` | Allowed image MIME types                        |
| `maxSizeMB`           | `number`   | `5`                                        | Maximum allowed size in MB                      |
| `requireSquare`       | `boolean`  | `true`                                     | Whether the image must be square                |
| `width`               | `string`   | `"200px"`                                  | Display width                                   |
| `height`              | `string`   | `"200px"`                                  | Display height                                  |
| `previewBorderRadius` | `string`   | `"0%"`                                     | Border Radius of the preview image              |
| `backendError`        | `string`   | `""`                                       | bakend error that reaches to the correct field. |
| `value`               | `-`        | `null`                                     | Initial value.                                  |
| `required`            | `boolean`  | `false`                                    | If true, marks input as required                |

### Features

- Drag & Drop area
- File input with preview
- Dynamic image validation
- Conditional square-checking logic
- Interactive icon buttons (reupload, delete)
- Custom styling with CSS variables

### Use Case Example

```jsx
<ImageUpload
  label="Profile Picture"
  color="#FFB400"
  setResult={(file) => setFormData({ ...formData, profilePic: file })}
  setIsFieldValid={(valid) =>
    setFieldStatus({ ...fieldStatus, profilePic: valid })
  }
  allowedTypes={["image/png", "image/jpeg"]}
  maxSizeMB={3}
  requireSquare={true}
/>
```

## `ImagePreview` Component

### Purpose

`ImagePreview` displays an image preview from:

- A `File` object
- A base64 or direct image URL

It handles memory cleanup for local files using `URL.createObjectURL`.

### Props

| Prop     | Type               | Default     | Description                                      |
| -------- | ------------------ | ----------- | ------------------------------------------------ |
| `image`  | `File` \| `string` | —           | The image to preview (File object or URL string) |
| `radius` | `string`           | `"8px"`     | Border radius for the image container            |
| `width`  | `string`           | `"200px"`   | Width of the preview box                         |
| `height` | `string`           | `"200px"`   | Height of the preview box                        |
| `alt`    | `string`           | `"Preview"` | Alternative text for the image                   |

### Features

- Displays image preview safely
- Auto memory cleanup for `File` blobs
- Graceful fallback with error message & icon when invalid
- Style customization for shape and size

### Use Case Example

```jsx
<ImagePreview
  image={formData.profilePic}
  radius="50%"
  width="150px"
  height="150px"
  alt="Profile Preview"
/>
```

### Combined Use Case

You can use both components together for full upload-preview flow:

```jsx
const [selectedFile, setSelectedFile] = useState(null);

<ImageUpload
  label="Upload Avatar"
  setResult={setSelectedFile}
/>

<ImagePreview
  image={selectedFile}
  width="120px"
  height="120px"
  radius="50%"
/>
```
