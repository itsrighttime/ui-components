import React, { useEffect, useState } from "react";
import TextField from "../../TextInput/jsx/TextField";
import styles from "../css/MobileInput.module.css";

const MobileField = ({
  required = false,
  color,
  code = "+91",
  className = "",
  setResult,
  setIsFieldValid,
  noOfDigits = 10,
  showLabelAlways = false,
  style = {},
}) => {
  const [countryCode, setCountryCode] = useState(code);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setResult({ countryCode, phoneNumber });
  }, [countryCode, phoneNumber, setResult]);

  const errorMessage = "Numbers Only";

  return (
    <div className={`${styles.mobileInput} ${styles[className]}`} style={style}>
      <div className={styles.code}>
        <TextField
          type="text"
          label="Code"
          placeholder="+91"
          minLength={1}
          maxLength={4} // Consider a maximum length constraint for country code (e.g., 4 digits max)
          value={countryCode}
          color={color}
          setResult={(value) => setCountryCode(value)}
          pattern="^\+\d*$"
          errorMessage="Invalid"
          showLabelAlways={showLabelAlways}
        />
      </div>
      <div className={styles.number}>
        <TextField
          type="tel"
          label="Phone Number"
          placeholder="Enter phone number"
          value={phoneNumber}
          minLength={noOfDigits}
          maxLength={noOfDigits}
          setResult={(value) => setPhoneNumber(value)}
          color={color}
          setIsFieldValid={setIsFieldValid}
          required={required}
          pattern="^\d*$" // Allow numbers only
          errorMessage={errorMessage}
          showLabelAlways={showLabelAlways}
        />
      </div>
    </div>
  );
};

export default MobileField;
