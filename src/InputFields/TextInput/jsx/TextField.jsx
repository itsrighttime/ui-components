"use client";

import { useState, useEffect } from "react";
import styles from "../css/TextField.module.css";
import { crossIcon } from "../../../utils/icons.jsx";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { getCommonCssVariables } from "../../helper/getCommonCssVariables.js";

/**
 * TextField Component
 *
 * A fully-featured, reusable input field component for React.
 * Supports text, password, and custom input types with validation,
 * character counting, icons, labels, and styling options.
 *
 * Provides controlled input behavior with optional external state syncing.
 * Can handle backend errors, pattern validation, min/max length, and required fields.
 *
 * @component
 *
 * @param {Object} props - Props for configuring the TextField
 *
 * @param {string} [props.type="text"] - Input type (e.g., "text", "password")
 * @param {string} props.label - Label text for the input
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value=""] - Controlled value
 * @param {Function} props.setResult - Callback to update parent state
 * @param {Function} [props.setIsFieldValid] - Callback to indicate validation status
 * @param {string} [props.color] - Custom text or border color
 * @param {boolean} [props.required=false] - Whether input is required
 * @param {number} [props.minLength] - Minimum character length
 * @param {number} [props.maxLength] - Maximum character length
 * @param {string|RegExp} [props.pattern] - Regex pattern for validation
 * @param {string} [props.errorMessage="Invalid Input"] - Validation error message
 * @param {string} [props.autoComplete="off"] - HTML autocomplete attribute
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {ReactNode} [props.prefix] - Prefix element
 * @param {ReactNode} [props.suffix] - Suffix element
 * @param {boolean} [props.showCharacterCount=false] - Show character count
 * @param {boolean} [props.spellCheck=false] - Enable spell check
 * @param {string} [props.ariaLabel] - ARIA label for accessibility
 * @param {boolean} [props.autoFocus=false] - Autofocus input
 * @param {Object} [props.style] - Inline styles
 * @param {boolean} [props.isBorder=false] - Whether to show border
 * @param {boolean} [props.isApplyStrictPattern=true] - Apply strict pattern validation
 * @param {boolean} [props.showLabelAlways=false] - Always show label
 * @param {Function} [props.onBlur] - Callback on blur
 * @param {Function} [props.onFocus] - Callback on focus
 * @param {Function} [props.onClear] - Callback on clear
 * @param {ReactNode} [props.icon] - Icon inside input
 * @param {string} [props.width="300px"] - Width of the input field
 * @param {string} [props.backendError=""] - Error message from backend
 *
 * @returns {JSX.Element} Rendered TextField component
 *
 * @example
 * <TextField
 *   label="Username"
 *   value={username}
 *   setResult={setUsername}
 *   required
 *   minLength={3}
 *   maxLength={20}
 *   errorMessage="Username must be between 3-20 characters"
 *   showCharacterCount
 * />
 *
 * @notes
 * - Validates input on change and blur events
 * - Supports prefix, suffix, and inline icons
 * - Displays error messages and character count
 * - Automatically handles backend validation errors
 * - Compatible with both controlled and semi-controlled usage
 */
export const TextField = ({
  type = "text",
  label,
  placeholder,
  value = "",
  setResult,
  setIsFieldValid = () => {},
  color,
  required = false,
  minLength,
  maxLength,
  pattern,
  errorMessage = "Invalid Input",
  autoComplete = "off",
  disabled = false,
  prefix,
  suffix,
  showCharacterCount = false,
  spellCheck = false,
  ariaLabel,
  autoFocus = false,
  style = {},
  isBorder = false,
  isApplyStrictPattern = true,
  showLabelAlways = false,
  onBlur,
  onFocus,
  onClear,
  icon,
  width = "300px",
  backendError = "",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState(errorMessage);

  // Sync value from external props
  useEffect(() => {
    if (value !== "" && inputValue === "") setInputValue(value); // Sync with external value
  }, [value]);

  // Sync backend errors into component state
  useEffect(() => {
    if (backendError) {
      setErrorMsg(backendError);
      setIsValid(false);
      setIsFieldValid(false);
    }
  }, [backendError]);

  // General error handler
  const handleError = (msg) => {
    const finalMsg = errorMessage === "Invalid" ? "Invalid" : msg;
    setErrorMsg(finalMsg);
    setIsValid(false);
    setIsFieldValid(false);
    return false;
  };

  // Validation helpers
  const validateMinLength = (val) =>
    !minLength ||
    val.length >= minLength ||
    handleError(
      minLength === maxLength
        ? `Length must be ${minLength}.`
        : `Length must be greater than ${minLength}.`
    );

  const validateMaxLength = (val) =>
    !maxLength ||
    val.length <= maxLength ||
    handleError(
      minLength === maxLength
        ? `Length must be ${minLength}.`
        : `Length must be less than ${maxLength}.`
    );

  const validatePattern = (val) =>
    !pattern || new RegExp(pattern).test(val) || handleError(errorMessage);

  // Warn if regex includes length quantifiers
  if (isApplyStrictPattern && pattern && /{(\d+)(,(\d+))?}/.test(pattern)) {
    console.error(
      "Length should be controlled using minLength and maxLength, not regex quantifiers."
    );
    return (
      <p className={styles.textFieldErrorMessage}>Error: Check console log</p>
    );
  }

  const handleChange = (e) => {
    const newVal = e.target.value;

    // Clear backend error on first user edit
    if (backendError) {
      setErrorMsg(errorMessage); // revert to default message
      setIsValid(true);
      setIsFieldValid(true);
    }

    if (isApplyStrictPattern) {
      if (!validatePattern(newVal) || !validateMaxLength(newVal)) return;
    }
    setIsValid(true);
    setInputValue(newVal);
  };

  const handleBlur = () => {
    const trimmedValue = inputValue.trim();

    let isValid = true;

    if (required) {
      // If required, empty is invalid
      if (trimmedValue === "") {
        isValid = false;
      }
    } else {
      // If not required and empty, it's always valid — skip further checks
      if (trimmedValue === "") {
        setIsValid(true);
        setIsFieldValid(true);
        setResult(trimmedValue);
        onBlur?.();
        setIsFocused(false);
        return;
      }
    }

    // Apply validations only if value is non-empty
    const passesLength =
      (!maxLength || validateMaxLength(trimmedValue)) &&
      (!minLength || validateMinLength(trimmedValue));

    const passesPattern = !pattern || new RegExp(pattern).test(trimmedValue);

    isValid = isValid && passesLength && passesPattern;

    // Update state
    setIsValid(isValid);
    setIsFieldValid(isValid);
    setResult(trimmedValue);

    onBlur?.();
    setIsFocused(false);
  };

  // Focus & clear handlers
  const handleFocus = () => {
    setIsValid(true);
    setIsFocused(true);
    onFocus?.();
  };

  const handleClear = () => {
    setInputValue("");
    onClear?.();
  };

  const cssVariable = {
    ...getCommonCssVariables(isBorder, color, width),
  };

  return (
    <div className={styles.textField} style={{ ...style, ...cssVariable }}>
      {(showLabelAlways || (isFocused && inputValue)) && label && (
        <label
          htmlFor={ariaLabel || label}
          className={`${styles.textFieldLabel} ${
            isFocused ? styles.focused : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className={styles.textFieldInputWrapper}>
        {prefix && <span className={styles.textFieldPrefix}>{prefix}</span>}
        <input
          type={type}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder || label}
          required={required}
          pattern={pattern}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
          aria-label={ariaLabel || label}
          autoFocus={autoFocus}
          disabled={disabled}
          className={`${styles.textFieldInput} ${
            isValid ? "" : styles.invalid
          }`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {suffix && <span className={styles.textFieldSuffix}>{suffix}</span>}
        {required && <p className={styles.required}>*</p>}
        {icon && <span className={styles.textFieldIcon}>{icon}</span>}
        {onClear && (
          <IconButton icon={crossIcon} onClick={handleClear} color="#FF5969" />
        )}
      </div>
      <div className={styles.errorNumCount}>
        {!isValid && (
          <div className={styles.textFieldErrorMessage}>{errorMsg}</div>
        )}
        {showCharacterCount && (
          <div
            className={`${styles.textFieldCharacterCount} ${
              isValid ? styles.isValid : ""
            }`}
          >
            {inputValue.length}
            {maxLength ? `/${maxLength}` : ""}
          </div>
        )}
      </div>
    </div>
  );
};
