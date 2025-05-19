import React, { useState } from "react";
import styles from "../css/TextField.module.css";
import { crossIcon } from "../../../utils/index.js";
import IconButton from "../../Actions/jsx/IconButton";

/**
 * TextField Component
 *
 * Features:
 * - **Customizable Input Type**: Supports various input types like `text`, `password`, `email`, etc.
 * - **Label and Placeholder**: Allows optional `label` and `placeholder` for better UX.
 * - **Dynamic Pattern Support**: Allows users to choose between strict and lenient validation modes for Regex-based `pattern` validation.
 *      - **Lenient mode**: Lets users type freely and validates the input against the pattern, including length restrictions on loosing the focus.
 *      - **Strict mode**: Prevents users from typing characters that don't match the pattern. Length restrictions must be explicitly defined using the minLength and maxLength props.
 * - **Dynamic Error Messaging**: Displays custom error messages using the errorMessage prop. If the value "Invalid" is provided, it is treated as a special case, and "Invalid" will always be shown as the error message, regardless of the actual validation issue.
 * - **Real-Time Input Handling**: Sends input value and validity to the parent via `setResult` and `setIsFieldValid`.
 * - **Character Count Display**: Optionally shows current character count with `showCharacterCount`.
 * - **Styling Options**: Fully customizable styles via `color`, `isBorder`, `style`, and `className` props.
 * - **Prefix and Suffix**: Adds prefix/suffix elements inside the input box for advanced input styling.
 * - **Accessibility Features**: Includes `aria-label` for screen readers and supports `autoFocus`.
 * - **Event Handling**: Provides `onBlur`, `onFocus`, and `onClear` callbacks for custom behaviors.
 * - **Clear Input**: Offers a clear button with `onClear` prop for quick reset.
 * - **Error State Management**: Highlights invalid inputs with visual cues and error messages.
 * - **Spell Check**: Includes optional spell-checking via the `spellCheck` prop.
 * - **Disabled and Read-Only States**: Supports `disabled` and `required` attributes for flexibility.
 * - **Icon Support**: Allows integration of custom icons via `icon` prop.
 * - **Validation Guidance**: Logs errors in development for patterns with length restrictions, guiding proper use.
 */

const TextField = ({
  type = "text",
  label,
  placeholder,
  value = "",
  setResult,
  color,
  required = false,
  minLength,
  maxLength,
  pattern,
  setIsFieldValid = () => {},
  errorMessage = "Invalid Input",
  autoComplete = "off",
  disabled = false,
  prefix,
  suffix,
  showCharacterCount = false,
  spellCheck = false,
  ariaLabel,
  autoFocus = false,
  className = "",
  style = {},
  isBorder = false,
  isApplyStrictPattern = true,
  showLabelAlways = false,
  onBlur,
  onFocus,
  onClear,
  icon,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState(errorMessage);

  // Check for exact length, range, or minimum length quantifiers in the regex pattern
  const hasLengthRestriction = (pattern) => {
    const lengthPattern = /{(\d+)(,(\d+))?}/;
    return lengthPattern.test(pattern);
  };

  const handleErrorMsgSetter = (msg) => {
    setErrorMsg(errorMessage === "Invalid" ? "Invalid" : msg);
  };

  const validateMaxLenRestriction = (value) => {
    if (maxLength && value.length > maxLength) {
      if (minLength === maxLength)
        handleErrorMsgSetter(`Length must be ${minLength}.`);
      else handleErrorMsgSetter(`Length must be less than ${maxLength}.`);
      setIsValid(false);
      setInputValue(inputValue);
      return false;
    }
    return true;
  };

  const validateRegExWithOutLenRestriction = (value) => {
    const regex = new RegExp(pattern);

    if (!regex.test(value)) {
      setIsValid(false);
      setInputValue(inputValue);
      handleErrorMsgSetter(errorMessage || "Invalid Input");
      return false;
    }
    return true;
  };

  // Handle input value change
  const handleChange = (e) => {
    const newValue = e.target.value;

    if (isApplyStrictPattern) {
      if (pattern && !validateRegExWithOutLenRestriction(newValue)) return;
      if (!validateMaxLenRestriction(newValue)) return;

      // If the input is valid, update the value
      setIsValid(true);
      setInputValue(newValue);
    } else {
      setInputValue(newValue);
    }
  };

  // Clear the input value
  const handleClear = () => {
    setInputValue("");
    onClear && onClear();
  };

  // Handle blur event to validate the input pattern and set validity
  const handleBlur = () => {
    if (isApplyStrictPattern) {
      if (minLength && inputValue.length < minLength) {
        if (minLength === maxLength)
          handleErrorMsgSetter(`Length must be ${minLength}.`);
        else handleErrorMsgSetter(`Length must be greater than ${minLength}`);

        setIsValid(false);
        setIsFieldValid(false); // Pass the validity to parent component
      } else {
        // Final Check to make sure the validity
        if (
          !validateMaxLenRestriction(inputValue) ||
          !validateRegExWithOutLenRestriction(inputValue)
        ) {
          setIsFieldValid(false);
        } else {
          setIsValid(true)
          setIsFieldValid(true);
          setResult(inputValue);
        }
      }
    } else {
      if (pattern) {
        const regex = new RegExp(pattern);
        const isInputValid = regex.test(inputValue);
        setIsValid(isInputValid);
        setIsFieldValid(isInputValid);
      }

      setResult(inputValue);
    }

    setIsFocused(false);
    onBlur && onBlur(); // Call onBlur if it exists
  };

  // Handle focus event, reset validation state
  const handleFocus = () => {
    setIsValid(true); // Reset validity on focus
    setIsFocused(true);
    onFocus && onFocus();
  };

  // Define CSS for the border and other style variables
  const cssBorder = `1px solid ${color || `var(--colorCyan)`}`;
  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--borderRadius": style?.borderRadius || "initial",
    "--borderTop": isBorder ? cssBorder : "none",
    "--borderLeft": isBorder ? cssBorder : "none",
    "--borderRight": isBorder ? cssBorder : "none",
    "--borderBottom": isBorder
      ? cssBorder
      : `2px solid ${color || "var(--colorCyan"}`,
  };

  // If the pattern contains a length restriction, log an error
  if (isApplyStrictPattern && hasLengthRestriction(pattern)) {
    console.error(
      `Your pattern should not include length restrictions. If length restrictions are necessary, please use the 'minLength' and 'maxLength' props instead.`
    );
    return (
      <p className={styles.textFieldErrorMessage}>Error: Check console log</p>
    );
  }

  return (
    <div
      className={`${styles.textField} ${className}`}
      style={{ ...style, ...cssVariable }}
    >
      {(showLabelAlways || (isFocused && inputValue !== "")) && label && (
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
          title=""
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

      {/* Error message and character count */}
      <div className={styles.errorNumCount}>
        {!isValid && (
          <div className={styles.textFieldErrorMessage}>{`${errorMsg}`}</div>
        )}
        {showCharacterCount && maxLength && (
          <div
            className={`${styles.textFieldCharacterCount} ${
              isValid ? styles.isValid : ""
            }`}
          >
            {inputValue.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextField;
