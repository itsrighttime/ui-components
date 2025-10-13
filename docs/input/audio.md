## **itsRIGHTtime AudioPlayer Component – Developer Guide**

### Components Covered

1. **AudioPlayer** – Plays the uploaded audio with custom controls
2. **AudioUpload** (you may have this as a custom uploader)

- [`AudioPlayer`](#audioplayer-component)
- [`AudioUpload`](#audioupload-component)

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { AudioPlayer, AudioUpload } = UIInputs.Upload;
```

## `AudioPlayer` Component

### Purpose:

Provides a customizable audio player with:

- Play/Pause
- Seek
- Volume control
- Mute/Unmute
- Duration display
- Optional: Reupload & Remove buttons

---

### Props

| Prop           | Type       | Description                                                                       |
| -------------- | ---------- | --------------------------------------------------------------------------------- |
| `audioSrc`     | `string`   | Required. The URL or path to the audio file.                                      |
| `onRemove`     | `function` | Optional. Callback for remove button.                                             |
| `onReupload`   | `function` | Optional. Callback for re-upload button.                                          |
| `color`        | `string`   | Optional. Custom color for accent buttons and slider (e.g., `#52C9BD`).           |
| `width`        | `string`   | Optional. Width of the audio player container (e.g., `"500px"`).                  |
| `backendError` | `string`   | To make sure if eny error occurs at the bakend that reaches to the correct field. |
| `required`     | `boolean`  | If true, marks input as required                                                  |

### Usage

```jsx
// Example audio URL or object URL from uploaded file
<AudioPlayer
  audioSrc="https://example.com/audio/my-audio.mp3"
  onRemove={() => console.log("Audio removed")}
  onReupload={() => console.log("Reupload triggered")}
  color="#52C9BD"
  width="600px"
/>
```

### Features

| Feature         | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| Play/Pause      | Toggle playback with visual icon indication.                         |
| Time Display    | Shows current time and total duration of the track.                  |
| Seek Bar        | Clickable progress bar to jump to any part of the audio (fixed bug). |
| Volume Control  | Slider to adjust volume (0–100%).                                    |
| Mute Button     | Toggle mute/unmute instantly.                                        |
| Reupload Button | Optional. Triggers a callback to replace the current audio.          |
| Remove Button   | Optional. Triggers a callback to remove the current audio.           |
| Hover Preview   | Shows the time at the mouse pointer on hover.                        |
| Custom Styling  | Fully customizable using `color` and `width` props.                  |

### Best Practices

- For audio from local file uploads, convert `File` to URL:

```js
const handleFileChange = (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  setAudioSrc(url);
};
```

## AudioUpload Component

### Purpose

The `AudioUpload` component provides a **file upload interface** for audio files with support for:

- Drag-and-drop upload
- File validation (type & size)
- Visual error handling
- Seamless integration with an `AudioPlayer` preview
- Reupload & remove functionality

## How to Use

### Import

### Example Usage

```jsx
<AudioUpload
  label="Upload your voice note"
  setResult={(file) => console.log("Selected file:", file)}
  color="#52C9BD"
  setIsFieldValid={(valid) => console.log("Valid:", valid)}
  allowedTypes={["audio/mpeg", "audio/wav"]}
  maxSizeMB={10}
  width="600px"
  height="120px"
/>
```

## Props

| Prop              | Type       | Default                       | Description                                                                       |
| ----------------- | ---------- | ----------------------------- | --------------------------------------------------------------------------------- |
| `label`           | `string`   | —                             | Label shown in the upload UI.                                                     |
| `setResult`       | `function` | —                             | Callback that receives the selected `File` object.                                |
| `color`           | `string`   | `var(--colorCyan)`            | Theme color for styling accents.                                                  |
| `setIsFieldValid` | `function` | `() => {}`                    | Callback triggered with a `true/false` value indicating input validity.           |
| `allowedTypes`    | `string[]` | `["audio/mpeg", "audio/wav"]` | Allowed MIME types for uploaded audio files.                                      |
| `maxSizeMB`       | `number`   | `10`                          | Maximum audio file size in megabytes.                                             |
| `width`           | `string`   | `"500px"`                     | Width of the audio upload/player block.                                           |
| `height`          | `string`   | `"100px"`                     | Height of the upload area (ignored after audio is uploaded).                      |
| `backendError`    | `string`   | `""`                          | To make sure if eny error occurs at the bakend that reaches to the correct field. |
| `value`           | `-`        | `null`                        | Initial value.                                                                    |

## Features

| Feature                    | Description                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| **Drag-and-Drop Upload**   | Intuitive drag & drop interface for uploading audio.                      |
| **File Validation**        | Validates MIME type and size before accepting the audio.                  |
| **State Syncing**          | Provides `setResult` and `setIsFieldValid` callbacks to sync with parent. |
| **Audio Preview Player**   | Integrates `AudioPlayer` for playback once a file is uploaded.            |
| **Reupload Functionality** | Opens file picker again to choose a different file.                       |
| **Remove Functionality**   | Removes the uploaded audio and resets the component.                      |
| **Error Feedback**         | Shows validation errors (wrong file type or large file).                  |
| **Customizable Styles**    | Controlled via `color`, `width`, and `height` props.                      |

## UX States

1. **Initial State**

   - Displays upload area with label
   - Accepts drag-and-drop or click-to-upload

2. **Audio Selected**

   - Shows `<AudioPlayer />` with playback controls, reupload, and remove

3. **Invalid Upload**

   - Displays error message (type/size)

## Styling (via CSS Variables)

| Variable   | Usage                      |
| ---------- | -------------------------- |
| `--color`  | Accent color for UI        |
| `--width`  | Width of the upload/player |
| `--height` | Height of the upload zone  |

> These variables are applied to the outer container and are respected by both the uploader and the player.

## Best Practices

- Always provide `setResult` to receive the selected `File` object.
- Use `setIsFieldValid` to perform form validation.
- Customize `allowedTypes` if you want to accept other formats like `ogg`.
- Handle `URL.revokeObjectURL()` outside the component if persisting audio URL.
