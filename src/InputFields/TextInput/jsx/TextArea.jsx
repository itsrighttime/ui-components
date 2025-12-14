"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../css/TextArea.module.css";

/**
 * `TextArea` is a React component that renders a resizable textarea input with optional label,
 * character and word counters, validation, and error handling.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} [props.label] - Optional label text displayed above the textarea.
 * @param {string} [props.value] - Initial value for the textarea.
 * @param {function} props.setResult - Callback function to receive the current value on blur.
 * @param {string} [props.color] - Text and border color for the textarea.
 * @param {string} [props.placeholder="Enter text here..."] - Placeholder text for the textarea.
 * @param {number} [props.minLength] - Minimum number of characters required.
 * @param {number} [props.maxLength] - Maximum number of characters allowed.
 * @param {number} [props.maxTextAreaHeight=200] - Maximum height of the textarea before scroll appears.
 * @param {function} [props.setIsFieldValid] - Callback to notify parent component about field validity.
 * @param {boolean} [props.showCharacterCount=false] - Whether to show the character count.
 * @param {boolean} [props.showWordCount=false] - Whether to show the word count.
 * @param {boolean} [props.disabled=false] - Disable user input if true.
 * @param {Object} [props.style={}] - Additional custom CSS styles.
 * @param {string} [props.width="300px"] - Width of the textarea container.
 * @param {boolean} [props.showLabelAlways=false] - Whether to always show the label.
 * @param {string} [props.backendError=""] - Error message from backend to display in the component.
 * @param {boolean} [props.required=false] - Whether this field is required.
 *
 * @example
 * <TextArea
 *   label="Description"
 *   value="Initial text"
 *   setResult={(val) => console.log(val)}
 *   color="#52c9bd"
 *   placeholder="Enter your description"
 *   maxLength={500}
 *   showCharacterCount={true}
 *   showWordCount={true}
 *   required
 * />
 *
 * @returns {JSX.Element} A styled textarea input with label, validation, and optional counters.
 */
export const TextArea = ({
  label,
  value,
  setResult,
  color,
  placeholder = "Enter text here...",
  minLength,
  maxLength,
  maxTextAreaHeight = 200,
  setIsFieldValid = () => {},
  showCharacterCount = false,
  showWordCount = false,
  disabled = false,
  style = {},
  width = "300px",
  showLabelAlways = false,
  backendError = "",
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Handle backend errors
  useEffect(() => {
    if (backendError) {
      setError(backendError);
      setIsValid(false);
      setIsFieldValid(false);
    }
  }, [backendError]);

  // Auto-resize logic
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height to auto
      const currentHeight = textAreaRef.current.scrollHeight;

      if (currentHeight < maxTextAreaHeight) {
        textAreaRef.current.style.height = `${currentHeight + 5}px`; // Set height based on content
      } else {
        textAreaRef.current.style.height = `${maxTextAreaHeight}px`; // Set height to 200px
        textAreaRef.current.style.overflowY = "auto"; // Add scrollbar if needed
      }
    }
  }, [inputValue, maxTextAreaHeight]);

  const handleChange = (e) => {
    const { value } = e.target;

    // Clear backend error on user input
    if (backendError) {
      setError("");
      setIsValid(true);
      setIsFieldValid(true);
    }

    if (minLength && value.length < minLength) {
      setError(`Minimum length is ${minLength} characters.`);
      setInputValue(value);
    } else if (maxLength && value.length > maxLength) {
      setError(`Maximum length is ${maxLength} characters.`);
    } else {
      setError("");
      setInputValue(value);
    }
  };

  const getWordCount = (text) => {
    if (text === "") return 0;
    return text.trim().split(/\s+/).length;
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
    "--width": width,
  };

  const handleOnBlur = () => {
    setIsFocused(false);
    setResult(inputValue);
    if (inputValue.length === maxLength) {
      setError("");
      setIsFieldValid(true);
    } else error === "" ? setIsFieldValid(true) : setIsFieldValid(false);
  };

  return (
    <div
      className={styles.textAreaContainer}
      style={{ ...style, ...cssVariable }}
    >
      {(showLabelAlways || (isFocused && inputValue)) && label && (
        <label htmlFor={label} className={styles.textAreaLabel}>
          {label}
        </label>
      )}
      {required && <p className={styles.required}>*</p>}

      <textarea
        id={label}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.textArea}`}
        ref={textAreaRef}
        onFocus={() => setIsFocused(true)}
        onBlur={handleOnBlur}
      />
      <div className={styles.errorInfo}>
        {error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : (
          <div></div>
        )}

        <div className={styles.information}>
          {showCharacterCount && (
            <span className={styles.count}>
              Char: {inputValue.length} {maxLength ? `/${maxLength}` : ""}
            </span>
          )}

          {showCharacterCount && showWordCount && (
            <span className={styles.count} style={{ fontWeight: "800" }}>
              {" "}
              |{" "}
            </span>
          )}
          {showWordCount && (
            <span className={styles.count}>
              Word: {getWordCount(inputValue)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
