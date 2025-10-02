# Developer Guide: `VideoUpload` and `VideoPlayer`

- [`VideoUpload`](#videoupload-component)
- [`VideoPlayer`](#videoplayer-component)

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { VideoUpload, VideoPlayer } = UIInputs.Upload;
```

## `VideoUpload` Component

### Purpose

The `VideoUpload` component enables users to upload, preview, validate, and optionally play a video file with drag-and-drop or input support.

### Usage

```jsx
<VideoUpload
  label="Upload your video"
  color="#00AEEF"
  setResult={(file) => console.log("Video File:", file)}
  setIsFieldValid={(isValid) => console.log("Valid:", isValid)}
  allowedTypes={["video/mp4", "video/webm"]}
  maxSizeMB={50}
  preview={true}
  width="500px"
  height="300px"
/>
```

### Props

| Prop              | Type       | Default                       | Description                                              |
| ----------------- | ---------- | ----------------------------- | -------------------------------------------------------- |
| `label`           | `string`   | `"Upload Video"`              | Label shown on the upload area.                          |
| `color`           | `string`   | `var(--colorCyan)`            | Primary color used for buttons.                          |
| `setResult`       | `function` | **Required**                  | Callback that receives the uploaded video file (`Blob`). |
| `setIsFieldValid` | `function` | `() => {}`                    | Callback for validity status. Useful for forms.          |
| `allowedTypes`    | `string[]` | `["video/mp4", "video/webm"]` | MIME types allowed.                                      |
| `maxSizeMB`       | `number`   | `50`                          | Max video size in megabytes.                             |
| `preview`         | `boolean`  | `false`                       | If `true`, shows `VideoPlayer` component to preview.     |
| `width`           | `string`   | `"400px"`                     | Width of video preview/player.                           |
| `height`          | `string`   | `"200px"`                     | Height of video preview/player.                          |
| `backendError`    | `string`   | `""`                          | bakend error that reaches to the correct field.          |
| `value`           | `-`        | `null`                        | Initial value.                                           |

### Features

- Drag and drop support.
- Validates file type and size.
- Displays custom error messages.
- Shows file name and size.
- Supports re-upload and remove actions.
- Optional preview with `VideoPlayer`.

## `VideoPlayer` Component

### Purpose

`VideoPlayer` is a flexible component to **display a video preview** with optional reupload and remove controls.

### Usage

```jsx
<VideoPlayer
  videoFile={videoBlobOrUrl}
  onRemove={() => console.log("Remove clicked")}
  onReupload={() => console.log("Reupload clicked")}
  color="#00AEEF"
  width="500px"
  height="300px"
/>
```

### Props

| Prop         | Type             | Default       | Description                                               |
| ------------ | ---------------- | ------------- | --------------------------------------------------------- |
| `videoFile`  | `Blob \| string` | **Required**  | The video file to preview. Can be a Blob or a URL string. |
| `onRemove`   | `function`       | `null`        | Callback when the remove icon is clicked.                 |
| `onReupload` | `function`       | `null`        | Callback when the reupload icon is clicked.               |
| `color`      | `string`         | `--colorCyan` | Theme color for buttons.                                  |
| `width`      | `string`         | `"400px"`     | Width of the video player.                                |
| `height`     | `string`         | `"200px"`     | Height of the video player.                               |

### Features

- Autoplay, muted, and no-download playback.
- Custom styling via CSS variables.
- Fallback error icon if video is not found.
- Optional reupload and remove buttons.

## Integration Tips

- Use `VideoUpload` inside forms or input containers where user-generated video uploads are required.
- Use `VideoPlayer` independently when you have an existing video file to preview.
- Combine both to build a rich user experience with upload + preview + validation + action controls.

## Validation Logic

The `VideoUpload` component internally validates:

- Type (via `allowedTypes`)
- Size (via `maxSizeMB`)
- Does **not** check duration or resolution — implement separately if needed.

## Example Use Case

```jsx
const [videoFile, setVideoFile] = useState(null);
const [isValid, setIsValid] = useState(false);

<VideoUpload
  setResult={setVideoFile}
  setIsFieldValid={setIsValid}
  preview={true}
/>;
```
