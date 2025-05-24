## Features & Developer Guide

## Importing

```js
import { UIPages } from "@itsrighttime/ui-components";

const { Loading, ErrorPage, IconError, LoadingChat } = UIPages;
```

### `ErrorPage` Component

#### Features:

- Dynamic `statusCode`, `ErrorMsg`, `statusDetail`, and `responseCode`.
- Styled and responsive.
- Easy navigation back to home using `react-router-dom`.
- SVG icon built-in for error context.

#### Usage:

```jsx
<ErrorPage
  statusCode="500"
  ErrorMsg="Internal Server Error"
  statusDetail="Database connection failed"
  responseCode="DB_CONN_TIMEOUT"
/>
```

#### Props:

| Prop           | Type     | Default       | Description                       |
| -------------- | -------- | ------------- | --------------------------------- |
| `statusCode`   | `string` | `"404"`       | HTTP error/status code.           |
| `ErrorMsg`     | `string` | `"not found"` | Short error message.              |
| `statusDetail` | `string` | `null`        | Additional details on the error.  |
| `responseCode` | `string` | `null`        | Custom application response code. |

#### Use Cases:

- 404 Not Found Page
- 500 Internal Server Error Page
- Maintenance Mode Display
- Custom app-level error with API error details

### `IconError` Component

#### Features:

- Display any custom icon with a message.
- Fully customizable dimensions via CSS variables.
- Lightweight and flexible for minor UI blocks.

#### Usage:

```jsx
<IconError
  icon={<YourIconComponent />}
  messgae="Something went wrong"
  height="200px"
  width="200px"
  size={2}
/>
```

#### Props:

| Prop      | Type     | Default  | Description                   |
| --------- | -------- | -------- | ----------------------------- |
| `icon`    | `JSX`    | `null`   | JSX of the icon to show.      |
| `messgae` | `string` | `""`     | Error message below the icon. |
| `height`  | `string` | `"100%"` | Container height.             |
| `width`   | `string` | `"100%"` | Container width.              |
| `size`    | `number` | `2`      | Icon size (in rem).           |

#### Use Cases:

- Icon-based 404 UI block
- Empty state or “No data found”
- Temporary errors like network failures

### `Loading` Component

#### Features:

- Supports 5 loader types: `CubesLoader`, `FoldingLoader`, `BounceLoader`, `PulseLoader`, `LoadingChat`.
- Dynamic dimensions, color, text, and layout.
- Built-in dot animation on text (e.g., “Loading...”).
- Lazy-loaded loaders for performance.
- Reusable with `Suspense`.

#### Usage:

```jsx
<Loading
  type="PulseLoader"
  display="top"
  color="#0088ff"
  showText={true}
  text="Fetching Data"
/>
```

#### Props:

| Prop           | Type     | Default         | Description                                         |
| -------------- | -------- | --------------- | --------------------------------------------------- |
| `type`         | `string` | `"CubesLoader"` | Choose loader animation.                            |
| `display`      | `string` | `"top"`         | `"top"` = fixed top layer; `"block"` = inline block |
| `position`     | `string` | `"relative"`    | For `"top"` display, set to `"absolute"` if needed  |
| `windowHeight` | `string` | `"100%"`        | Loader container height.                            |
| `windowWidth`  | `string` | `"100%"`        | Loader container width.                             |
| `color`        | `string` | `--colorCyan`   | Loader color via CSS var or hex.                    |
| `showText`     | `bool`   | `false`         | Show animated loading text.                         |
| `text`         | `string` | `"Loading"`     | Text to animate.                                    |

#### Use Cases:

- Global loading overlay on route/page switch
- Section loader when fetching API data
- ChatBot "thinking" animation
- Minimal loaders inside cards or modals

### `LoadingChat` Component

#### Features:

- Visual "typing" animation like a chatbot.
- Custom color, width, height.
- Gooey SVG filter for effect.
- Used as one of the `type` options in `Loading`.

#### Usage:

```jsx
<LoadingChat color="#ff6600" height="150px" width="300px" />
```

#### Props:

| Prop     | Type     | Default       | Description              |
| -------- | -------- | ------------- | ------------------------ |
| `color`  | `string` | `--colorCyan` | Loader blob color.       |
| `height` | `string` | `"100%"`      | Height of the blob area. |
| `width`  | `string` | `"100%"`      | Width of the blob area.  |

#### Use Cases:

- Chatbot waiting screen
- Message sending animation
- Typing feedback UI in customer support apps

## Recommendations for Enhancements

1. **Accessibility:**

   - Add `role="alert"` for `ErrorPage` messages.
   - Use `aria-busy="true"` for loaders.

2. **Customization Hooks:**

   - Allow `onRetry()` in `ErrorPage` for optional retry logic.
   - Expose a `className` prop in each component to allow external styling.

3. **Animations & Transitions:**

   - Add fade/slide animations to error & loader mount/unmount.

4. **Theming Support:**

   - Expose more variables via CSS like `--textColor`, `--fontSize`, etc.

5. **Global Context Integration:**

   - Create a `useGlobalLoading()` hook to toggle loaders globally across routes/pages.
