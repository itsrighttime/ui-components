"use client";

import { TextField } from "../../TextInput/jsx/TextField.jsx";

/**
 * EmailField Component
 *
 * A specialized input field component for email addresses, built on top of the `TextField` component.
 * Includes built-in email validation, optional styling, and error handling.
 *
 * @component
 *
 * @param {Object} props - Props for configuring the EmailField
 *
 * @param {string} [props.label="Email"] - Label text for the email input
 * @param {string} [props.placeholder="Enter your email"] - Placeholder text
 * @param {string} [props.color] - Custom text or border color
 * @param {string} props.value - Controlled value for the input
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {string} [props.autoComplete="email"] - HTML autocomplete attribute
 * @param {boolean} [props.disabled=false] - Disable the input field
 * @param {Function} props.setResult - Callback to update parent state
 * @param {Function} [props.setIsFieldValid] - Callback to indicate validation status
 * @param {boolean} [props.showLabelAlways=false] - Always show the label
 * @param {Object} [props.style={}] - Inline styles
 * @param {string} [props.width="300px"] - Width of the input field
 * @param {boolean} [props.isBorder=false] - Whether to show border
 * @param {string} [props.errorMessage="Please enter a valid email address."] - Validation error message
 * @param {string} [props.backendError=""] - Error message from backend
 *
 * @returns {JSX.Element} Rendered EmailField component
 *
 * @example
 * <EmailField
 *   value={email}
 *   setResult={setEmail}
 *   required
 *   setIsFieldValid={setIsEmailValid}
 * />
 *
 * @notes
 * - Uses `TextField` internally with type="email" and a standard email regex pattern
 * - Supports backend validation errors
 * - Allows custom styling and layout via `style` and `width` props
 * - Label can be shown always or only on focus
 */
export const EmailField = ({
  label = "Email",
  placeholder = "Enter your email",
  color,
  value,
  required = false,
  autoComplete = "email",
  disabled = false,
  setResult,
  setIsFieldValid,
  showLabelAlways = false,
  style = {},
  width = "300px",
  isBorder = false,
  errorMessage = "Please enter a valid email address.",
  backendError = "",
}) => {
  return (
    <TextField
      type="email"
      label={label}
      placeholder={placeholder}
      value={value}
      setResult={setResult}
      required={required}
      autoComplete={autoComplete}
      disabled={disabled}
      color={color}
      pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
      errorMessage={errorMessage}
      style={style}
      setIsFieldValid={setIsFieldValid}
      isApplyStrictPattern={false}
      showLabelAlways={showLabelAlways}
      isBorder={isBorder}
      width={width}
      backendError={backendError}
    />
  );
};
