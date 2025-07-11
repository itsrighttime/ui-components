import { useEffect, useState } from "react";
import { TextField } from "../../TextInput/jsx/TextField";
import styles from "../css/MobileInput.module.css";

export const MobileField = ({
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
}) => {
  const [countryCode, setCountryCode] = useState(code);
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const errorMessage = "Numbers Only";

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
        />
      </div>
    </div>
  );
};
