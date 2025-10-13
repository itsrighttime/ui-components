import { useState, useEffect } from "react";
import styles from "../css/TextField.module.css";
import { crossIcon } from "../../../utils/icons";
import { IconButton } from "../../Actions/jsx/IconButton";
import { getCommonCssVariables } from "../../helper/getCommonCssVariables";

const defaultLinkIcon = "https://itsrighttime.group";

export const UrlTextField = ({
  label,
  placeholder = "Link",
  value = "",
  setResult,
  setIsFieldValid = () => {},
  required = false,
  errorMessage = "Invalid URL",
  color,
  autoFocus = false,
  onBlur,
  onFocus,
  onClear,
  width = "300px",
  style = {},
  showLabelAlways = false,
  isBorder = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState(errorMessage);
  const [favicon, setFavicon] = useState(defaultLinkIcon);

  // URL validation helper
  const isValidUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch (err) {
      return false;
    }
  };

  // Fetch favicon dynamically
  const fetchFavicon = (url) => {
    try {
      const domain = new URL(url).origin;
      const iconUrl = `${domain}/favicon.ico`;
      const img = new Image();
      img.onload = () => setFavicon(iconUrl);
      //   img.onerror = () => setFavicon(defaultLinkIcon);
      img.src = iconUrl;
    } catch {
      //   setFavicon(defaultLinkIcon);
    }
  };

  useEffect(() => {
    if (inputValue && isValidUrl(inputValue)) {
      fetchFavicon(inputValue);
    } else {
      setFavicon(defaultLinkIcon);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    setIsValid(true);
    setIsFieldValid(true);
  };

  const handleBlur = () => {
    const trimmedValue = inputValue.trim();

    let valid = true;
    if (required && trimmedValue === "") valid = false;
    else if (trimmedValue && !isValidUrl(trimmedValue)) valid = false;

    setIsValid(valid);
    setIsFieldValid(valid);
    setResult(trimmedValue);
    onBlur?.();
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsValid(true);
    onFocus?.();
  };

  const handleClear = () => {
    setInputValue("");
    setFavicon(defaultLinkIcon);
    onClear?.();
  };

  const cssVariable = { ...getCommonCssVariables(isBorder, color, width) };

  return (
    <div className={styles.textField} style={{ ...style, ...cssVariable }}>
      {(showLabelAlways || (isFocused && inputValue)) && label && (
        <label
          htmlFor={label}
          className={`${styles.textFieldLabel} ${
            isFocused ? styles.focused : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className={styles.textFieldInputWrapper}>
        <img src={favicon} alt="favicon" className={styles.faviconPrefix} />
        <input
          type="url"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder || label}
          required={required}
          autoFocus={autoFocus}
          className={`${styles.textFieldInput} ${
            isValid ? "" : styles.invalid
          }`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {required && <p className={styles.required}>*</p>}
        {onClear && (
          <IconButton icon={crossIcon} onClick={handleClear} color="#FF5969" />
        )}
      </div>
      {!isValid && (
        <div className={styles.textFieldErrorMessage}>{errorMsg}</div>
      )}
    </div>
  );
};
