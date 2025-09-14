import { useState, useEffect, useRef } from "react";
import styles from "../css/TextArea.module.css";

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
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

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
