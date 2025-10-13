# `UrlTextField` Developer Guide

The `UrlTextField` component is a **specialized URL input field** built on top of `TextField`.
It provides **URL validation**, **dynamic favicon fetching**, **required field support**, and a **clear button** in a single reusable component.

## Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { UrlTextField } = UIInputs.Text;
```

## Props Reference

| Prop              | Type       | Default         | Description                                                       |
| ----------------- | ---------- | --------------- | ----------------------------------------------------------------- |
| `label`           | `string`   | —               | Label text shown above input (when focused or `showLabelAlways`). |
| `placeholder`     | `string`   | `"Link"`        | Placeholder inside input.                                         |
| `value`           | `string`   | `""`            | Controlled input value.                                           |
| `setResult`       | `function` | —               | Callback to receive trimmed final value after `onBlur`.           |
| `setIsFieldValid` | `function` | `() => {}`      | Callback to return input validity status.                         |
| `required`        | `boolean`  | `true`          | Marks input as required.                                          |
| `errorMessage`    | `string`   | `"Invalid URL"` | Custom error message for invalid URLs.                            |
| `autoFocus`       | `boolean`  | `false`         | Focuses input on component mount.                                 |
| `onBlur`          | `function` | —               | Callback executed on blur.                                        |
| `onFocus`         | `function` | —               | Callback executed on focus.                                       |
| `onClear`         | `function` | —               | Renders a clear (X) button and resets input.                      |
| `width`           | `string`   | `"300px"`       | Width of the input field.                                         |
| `style`           | `object`   | `{}`            | Custom style object for the container.                            |
| `showLabelAlways` | `boolean`  | `false`         | Always display the label above input.                             |
| `isBorder`        | `boolean`  | `false`         | Applies full border instead of bottom border only.                |

> The component automatically fetches a favicon from the URL domain and displays it as a prefix.
> If favicon cannot be loaded, it falls back to `defaultLinkIcon`.

## Features

### URL Validation

- Supports HTTP/HTTPS URLs using the `URL()` constructor.
- Automatically trims whitespace.
- Required field validation (`required` prop).

### Dynamic Favicon

- Fetches `/favicon.ico` from the domain of the URL.
- Shows `defaultLinkIcon` if favicon cannot be fetched.
- Favicon is rendered as a prefix to the input.

### Clear Button

- When `onClear` is provided, a clickable clear button appears to reset the input and restore the default favicon.

### Error Messaging

- Displays custom error messages if the URL is invalid or required field is empty.
- Updates immediately on blur.

### Styling

- Fully compatible with existing `TextField` styling conventions (`width`, `style`, `isBorder`).
- Uses `styles.faviconPrefix` for the favicon prefix.

## Usage Examples

### Basic URL Input

```jsx
<UrlTextField
  label="Website"
  placeholder="https://example.com"
  setResult={(val) => console.log("URL:", val)}
/>
```

### Required URL Input

```jsx
<UrlTextField
  label="Company Website"
  required
  errorMessage="Please enter a valid URL"
  setResult={(val) => setCompanyWebsite(val)}
  setIsFieldValid={(valid) => setCompanyWebsiteValid(valid)}
/>
```

### URL Input with Clear Button

```jsx
<UrlTextField
  label="Portfolio"
  value={portfolio}
  onClear={() => setPortfolio("")}
  setResult={(val) => setPortfolio(val)}
/>
```

### Disabled or Read-Only URL Input

```jsx
<UrlTextField label="Read-only URL" value="https://readonly.com" disabled />
```

## Edge Cases & Handling

| Case                          | Behavior                                                 |
| ----------------------------- | -------------------------------------------------------- |
| Invalid URL                   | Displays `errorMessage` and sets validity to false.      |
| Favicon not found             | Falls back to `defaultLinkIcon`.                         |
| Empty value + `required=true` | Shows error message on blur.                             |
| External `value` updates      | Synchronizes local state with prop on mount and updates. |

## Best Practices

- Provide `label` and `placeholder` for clarity.
- Always handle `setResult` and `setIsFieldValid` for robust form handling.
- Use `ariaLabel` if label is not visible for accessibility.
- Keep prefix simple; the favicon should remain lightweight and small.
- Combine `required` and URL validation to ensure valid submissions.
