import { useState } from "react";
import style from "../css/PasswordField.module.css";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { eyeCrossIcon, eyeIcon } from "../../../utils/icons.jsx";

export const PasswordField = ({
  label = "Password",
  value,
  setResult,
  placeholder = "Password",
  color,
  width = "300px",
  setPasswordStrength: setPasswordStrengthProp,
  showLabelAlways = false,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [password, setPassword] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePasswordStrength(value);
  };

  const validatePasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 6;

    if (!isValidLength) {
      setPasswordStrength("Short");
    } else if (
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setPasswordStrength("Weak");
    } else if (password.length >= 6 && password.length < 10) {
      setPasswordStrength("Medium");
    } else if (password.length >= 10) {
      setPasswordStrength("Strong");
    }
  };

  const showPasswordIcon = (
    <IconButton
      icon={eyeIcon}
      onClick={() => setShowPassword(true)}
      label={"Show Password"}
      style={{ border: "none" }}
      size="1.3"
      color={color}
    />
  );
  const hidePasswordIcon = (
    <IconButton
      icon={eyeCrossIcon}
      onClick={() => setShowPassword(false)}
      label={"Hide Password"}
      style={{ border: "none" }}
      size="1.3"
      color={color}
    />
  );

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
    "--width": width,
  };

  return (
    <div className={style.passwordInput} style={cssVariable}>
      <div
        className={style.inputContainer}
        onBlur={() => {
          setResult(password);
          setPasswordStrengthProp && setPasswordStrengthProp(passwordStrength);
        }}
      >
        {(showLabelAlways || (isFocused && password)) && label && (
          <label
            htmlFor={label}
            className={`${style.passwordLabel} ${
              isFocused ? style.focused : ""
            }`}
          >
            {label}
          </label>
        )}
        <input
          type={showPassword ? "text" : "password"}
          id={label}
          name={label}
          value={password}
          onChange={handlePasswordChange}
          className={style.formControl}
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        <div className={style.eyeRequired}>
          {showPassword ? hidePasswordIcon : showPasswordIcon}
          {required && <span className={style.required}>*</span>}
        </div>
      </div>
      {passwordStrength && (
        <p className={`${style.strength} ${style[passwordStrength]}`}>
          {passwordStrength === "Weak"
            ? "Must use A-Z, a-z, 0-9 & symbols."
            : passwordStrength}
        </p>
      )}
    </div>
  );
};
