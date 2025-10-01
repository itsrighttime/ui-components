import { useState, useEffect } from "react";
import { TextField } from "../../TextInput/jsx/TextField";
import styles from "../css/AddressField.module.css";

export const AddressField = ({
  setResult,
  color,
  isHouse = true,
  isStreet = true,
  isCity = true,
  isState = true,
  isPostal = true,
  isCountry = true,
  isAddressLine = true,
  isLandmark = true,
  showLabelAlways = false,
  width = "300px",
  isBorder = false,
  gap = "10px",
  setIsFieldValid = () => {},
  backendErrors = {}, // <-- new prop: { house: "Error message" }
}) => {
  const initialStates = {};
  const initialError = {};
  const VALID = "valid",
    INVALID = "invalid";

  if (isHouse) {
    initialStates["house"] = "";
    initialError["house"] = INVALID;
  }
  if (isStreet) {
    initialStates["street"] = "";
    initialError["street"] = INVALID;
  }
  if (isCity) {
    initialStates["city"] = "";
    initialError["city"] = INVALID;
  }
  if (isState) {
    initialStates["state"] = "";
    initialError["state"] = INVALID;
  }
  if (isPostal) {
    initialStates["postal"] = "";
    initialError["postal"] = INVALID;
  }
  if (isCountry) {
    initialStates["country"] = "";
    initialError["country"] = INVALID;
  }
  if (isAddressLine) {
    initialStates["addressLine"] = "";
    initialError["addressLine"] = INVALID;
  }
  if (isLandmark) {
    initialStates["landmark"] = "";
    initialError["landmark"] = INVALID;
  }

  const [address, setAddress] = useState(initialStates);
  const [error, setError] = useState(initialError);
  const [fieldMessages, setFieldMessages] = useState({}); // backend error messages
  const [isStarted, setIsStarted] = useState(false);

  // Merge backend errors into field messages
  useEffect(() => {
    if (backendErrors && Object.keys(backendErrors).length) {
      setFieldMessages((prev) => ({ ...prev, ...backendErrors }));
      // mark fields with backend errors as invalid
      const updatedError = { ...error };
      Object.keys(backendErrors).forEach((key) => {
        if (updatedError[key] !== undefined) {
          updatedError[key] = INVALID;
        }
      });
      setError(updatedError);
    }
  }, [backendErrors]);

  const handleChange = (field, value, isError = false) => {
    !isStarted && setIsStarted(true);

    // clear backend error on user input
    setFieldMessages((prev) => ({ ...prev, [field]: undefined }));

    setAddress((prev) => ({ ...prev, [field]: value }));
    if (isError) {
      setError((prev) => ({ ...prev, [field]: value ? VALID : INVALID }));
    }
  };

  const handleBlur = () => {
    setResult(address);
  };

  useEffect(() => {
    if (!isStarted) return;

    const validity = Object.values(error).find((er) => er === INVALID);
    setIsFieldValid(!validity);
  }, [error]);

  const fieldConfigs = [
    {
      key: "house",
      label: "House No.",
      placeholder: "House No.",
      visible: isHouse,
      pattern: /^[A-Za-z0-9\s,\/.\-]*$/,
      errorMessage: "Must be numbers, letters, space, hyphen and dot",
      minLength: 1,
      maxLength: 10,
    },
    {
      key: "street",
      label: "Street No.",
      placeholder: "Street No.",
      visible: isStreet,
      pattern: /^[A-Za-z0-9\s,]*$/,
      errorMessage: "Must be letters, numbers, and spaces.",
      minLength: 1,
      maxLength: 100,
    },
    {
      key: "city",
      label: "City",
      placeholder: "City",
      visible: isCity,
      pattern: /^[A-Za-z0-9\s]*$/,
      errorMessage: "Must be letters, numbers and spaces.",
      minLength: 2,
      maxLength: 50,
    },
    {
      key: "state",
      label: "State",
      placeholder: "State",
      visible: isState,
      pattern: /^[A-Za-z\s]*$/,
      errorMessage: "Must be letters and spaces.",
      minLength: 2,
      maxLength: 50,
    },
    {
      key: "postal",
      label: "Postal Code",
      placeholder: "Enter postal code",
      visible: isPostal,
      pattern: /^[0-9]*$/,
      errorMessage: "Must be 4 to 8 digits.",
      minLength: 4,
      maxLength: 8,
    },
    {
      key: "country",
      label: "Country",
      placeholder: "Country",
      visible: isCountry,
      pattern: /^[A-Za-z\s]*$/,
      errorMessage: "Must be letters and spaces.",
      minLength: 2,
      maxLength: 50,
    },
    {
      key: "landmark",
      label: "Landmark",
      placeholder: "Landmark",
      visible: isLandmark,
      pattern: /^[A-Za-z0-9\s,]*$/,
      errorMessage: "Must be letters, numbers, spaces and commas.",
      minLength: 2,
      maxLength: 50,
    },
    {
      key: "addressLine",
      label: "Address Line (Additional)",
      placeholder: "Additional address line",
      visible: isAddressLine,
      pattern: /^[A-Za-z0-9\s,]*$/,
      errorMessage: "Must be letters, numbers, spaces and commas.",
      minLength: 2,
      maxLength: 50,
    },
  ];

  return (
    <div className={styles.addressField} style={{ width, gap }}>
      {fieldConfigs.map(
        ({
          key,
          label,
          placeholder,
          visible,
          pattern,
          errorMessage,
          minLength,
          maxLength,
        }) =>
          visible && (
            <TextField
              type="text"
              key={key}
              label={label}
              placeholder={placeholder}
              setResult={(val) => handleChange(key, val)}
              pattern={pattern}
              errorMessage={errorMessage} // show backend error if exists
              minLength={minLength}
              maxLength={maxLength}
              required
              color={color}
              isBorder={isBorder}
              showLabelAlways={showLabelAlways}
              onBlur={handleBlur}
              width={width}
              setIsFieldValid={(v) => handleChange(key, v, true)}
              backendError={fieldMessages[key]}
            />
          )
      )}
    </div>
  );
};
