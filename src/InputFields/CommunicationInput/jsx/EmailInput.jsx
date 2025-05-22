import { TextField } from "../../TextInput/jsx/TextField";

export const EmailField = ({
  label = "Email",
  placeholder = "Enter your email",
  color,
  value,
  required = true,
  autoComplete = "email",
  disabled = false,
  setResult,
  setIsFieldValid,
  showLabelAlways = false,
  style = {},
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
      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
      errorMessage="Please enter a valid email address."
      style={style}
      setIsFieldValid={setIsFieldValid}
      isApplyStrictPattern={false}
      showLabelAlways={showLabelAlways}
    />
  );
};
