import { useEffect, useState } from "react";
import { TextField } from "../../TextInput/jsx/TextField.jsx";
import styles from "../css/MobileInput.module.css";

/**
 * MobileField Component
 *
 * A specialized input component for phone numbers, supporting country code and number inputs.
 * Built on top of the `TextField` component for both the country code and the phone number.
 * Includes validation, custom styling, backend error handling, and controlled input behavior.
 *
 * @component
 *
 * @param {Object} props - Props for configuring the MobileField
 *
 * @param {string} [props.value=""] - Phone number value
 * @param {string} [props.placeholder="Enter phone number"] - Placeholder for phone number input
 * @param {boolean} [props.required=false] - Whether the phone number is required
 * @param {string} [props.color] - Custom text or border color
 * @param {string} [props.code="+91"] - Default country code
 * @param {Function} props.setResult - Callback to receive `{ countryCode, phoneNumber }`
 * @param {Function} [props.setIsFieldValid] - Callback for phone number validation status
 * @param {number} [props.noOfDigits=10] - Number of digits for the phone number
 * @param {boolean} [props.showLabelAlways=false] - Always show labels
 * @param {Object} [props.style={}] - Inline styles for the container
 * @param {string} [props.width="300px"] - Width of the component
 * @param {boolean} [props.isBorder=false] - Show border around input fields
 * @param {string} [props.errorMessage="Not a valid Numbers"] - Validation error message for phone number
 * @param {string} [props.backendError=""] - Error message coming from backend
 *
 * @returns {JSX.Element} Rendered MobileField component
 *
 * @example
 * <MobileField
 *   value={mobile}
 *   setResult={({ countryCode, phoneNumber }) => setMobile(`${countryCode}${phoneNumber}`)}
 *   setIsFieldValid={setIsValid}
 *   required
 * />
 *
 * @notes
 * - Country code input allows `+` followed by digits (max 4 digits)
 * - Phone number input allows only numeric digits
 * - Both inputs use `TextField` internally
 * - Supports controlled behavior and syncing with parent state
 * - Displays backend validation errors and custom error messages
 */
export const MobileField = ({
  value = "",
  placeholder = "Enter phone number",
  required = false,
  color,
  code = "+91",
  setResult,
  setIsFieldValid,
  noOfDigits = 10,
  showLabelAlways = false,
  style = {},
  width = "300px",
  isBorder = false,
  errorMessage = "Not a valid Numbers",
  backendError = "",
}) => {
  const [countryCode, setCountryCode] = useState(code);
  const [phoneNumber, setPhoneNumber] = useState(value);

  useEffect(() => {
    if (phoneNumber === "") {
      setPhoneNumber(value);
      setCountryCode(code);
    }
  }, [code, value]);

  const updatePhoneData = (updated = {}) => {
    if (setResult) {
      setResult({
        countryCode: updated.countryCode ?? countryCode,
        phoneNumber: updated.phoneNumber ?? phoneNumber,
      });
    }
  };

  const handleCountryChange = (val) => {
    setCountryCode(val);
    updatePhoneData({ countryCode: val });
  };

  const handlePhoneChange = (val) => {
    setPhoneNumber(val);
    updatePhoneData({ phoneNumber: val });
  };

  return (
    <div className={styles.mobileInput} style={{ width, ...style }}>
      <div className={styles.code}>
        <TextField
          type="text"
          label="Code"
          placeholder="+91"
          minLength={1}
          maxLength={4} // Consider a maximum length constraint for country code (e.g., 4 digits max)
          value={countryCode}
          color={color}
          setResult={handleCountryChange}
          pattern="^\+\d*$"
          errorMessage="Invalid"
          showLabelAlways={showLabelAlways}
          isBorder={isBorder}
          width="100%"
        />
      </div>
      <div className={styles.number}>
        <TextField
          type="tel"
          label="Phone Number"
          placeholder={placeholder}
          value={phoneNumber}
          minLength={noOfDigits}
          maxLength={noOfDigits}
          setResult={handlePhoneChange}
          color={color}
          setIsFieldValid={setIsFieldValid}
          required={required}
          pattern="^\d*$" // Allow numbers only
          errorMessage={errorMessage}
          showLabelAlways={showLabelAlways}
          isBorder={isBorder}
          width="100%"
          backendError={backendError}
        />
      </div>
    </div>
  );
};
