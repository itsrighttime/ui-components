# `LoginForm` Component

The `LoginForm` component provides a flexible, reusable login interface. It supports login, registration, password recovery, and ID recovery actions while remaining stylistically customizable.

## Features:

- ID and Password input fields.
- Optional Register button.
- Optional Forgot ID and Forgot Password buttons.
- Optional fullscreen toggle icon button.
- Configurable form title and form icon.
- Minimal CSS dependency (`LoginForm.module.css`).
- Callback-based interaction handling.

## Usage Example:

```jsx
import { LoginForm } from "../components/Auth/LoginForm";

const handleLogin = (id, password) => {
  console.log("Logging in with:", id, password);
};

const handleForgotId = () => {
  alert("Forgot ID clicked");
};

const handleForgotPassword = () => {
  alert("Forgot Password clicked");
};

const handleRegister = () => {
  alert("Register clicked");
};

const handleToggleFullscreen = () => {
  console.log("Toggling fullscreen");
};

const LoginPage = () => {
  return (
    <LoginForm
      handleLogin={handleLogin}
      handleForgotId={handleForgotId}
      handleForgotPassword={handleForgotPassword}
      handleRegister={handleRegister}
      handleToggleFullscreen={handleToggleFullscreen}
      formTitle="Login to Dashboard"
      formIcon="/images/login-icon.png"
    />
  );
};
```

## Props:

| Prop                     | Type        | Default          | Description                                                                       |
| ------------------------ | ----------- | ---------------- | --------------------------------------------------------------------------------- |
| `handleLogin`            | `function`  | Required\*       | Called when the Login button is clicked. Receives `id` and `password`.            |
| `handleForgotId`         | `function?` | `null`           | If provided, displays "Forgot ID" button and triggers when clicked.               |
| `handleForgotPassword`   | `function?` | `null`           | If provided, displays "Forgot Password" button and triggers when clicked.         |
| `handleRegister`         | `function?` | `null`           | If provided, displays a "Register" button. Otherwise, shows the recovery buttons. |
| `handleToggleFullscreen` | `function?` | `null`           | If provided, displays a fullscreen toggle icon button.                            |
| `formTitle`              | `string`    | `"Welcome Back"` | Title text displayed above the form.                                              |
| `formIcon`               | `string?`   | `null`           | Optional image URL displayed as a form icon.                                      |
| `errorMsg`               | `string?`   | `""`             | For any Error that can happens during login                                       |

> **Note:** If `handleLogin` is not supplied, a console warning will be shown when the login button is clicked.


## Behavior Overview:

- **ID Input:** Uses `TextField` with label `"Any Valid Id"`.
- **Password Input:** Uses `PasswordField` for entering passwords securely.
- **Login Button:** Calls `handleLogin(id, password)` with the current input values.
- **Register Button:** Rendered if `handleRegister` prop is supplied.
- **Forgot Buttons:** Rendered if `handleRegister` is not supplied.
- **Extra Buttons:** `Forgot ID` and/or `Forgot Password` buttons appear depending on their respective props.
- **Fullscreen Toggle:** An icon button appears if `handleToggleFullscreen` is provided.
