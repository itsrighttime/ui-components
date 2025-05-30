## Features & Developer Guide

## Importing

```js
import { UIPages } from "@itsrighttime/ui-components";

const { Loading, ErrorPage, IconError, LoadingChat, LockScreen, LoginForm } =
  UIPages;
```

## [Special Pages]

- [`Loading`](#loading-component)
- [`ErrorPage`](#errorpage-component)
- [`IconError`](#iconerror-component)
- [`LoadingChat`](#loadingchat-component)
- [`LockScreen`](#lockscreen)
- [`LoginForm`](#loginform)

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

## `LoginForm`

A complete login UI component with support for ID/password input, fullscreen toggle, and register/forgot options.

### Features:

- ID and password fields with state management.
- Login and Register buttons.
- Option to switch to alternative action buttons if `isRegisterButton` is false.
- Fullscreen toggle via `IconButton`.
- Uses `AuthContext` for handling login logic.
- Styled using `LoginForm.module.css`.

### Props:

| Prop               | Type      | Default | Description                                          |
| ------------------ | --------- | ------- | ---------------------------------------------------- |
| `isRegisterButton` | `boolean` | `true`  | Controls whether to show Register or Forgot options. |
| `toggleFullscreen` | `func`    | `null`  | Enables fullscreen mode toggle.                      |

**Purpose:**
A secure login interface with optional registration and password recovery support.

**Use Case:**
When a user visits your app at `/login`, display the `LoginForm` component. Enable fullscreen toggling and provide a register button for new users.

```jsx
<LoginForm
  isRegisterButton={true}
  toggleFullscreen={() => document.documentElement.requestFullscreen()}
/>
```

## `LockScreen`

A simple lock screen page that uses a custom `OtpField` to unlock the interface.

### Features:

- Accepts magic phrase/OTP input.
- Displays error or guidance message.
- Trigger callback on successful unlock attempt.

### Props:

| Prop       | Type   | Required | Description                           |
| ---------- | ------ | -------- | ------------------------------------- |
| `onUnlock` | `func` | ✅       | Called when user submits correct OTP. |

**Purpose:**
A locked session screen using a custom OTP (magic phrase) for re-authentication.

**Use Case:**
When a session times out or the screen is locked, show `LockScreen` to re-authenticate using a predefined code or phrase.

```jsx
<LockScreen onUnlock={() => console.log("Access granted")} />
```
