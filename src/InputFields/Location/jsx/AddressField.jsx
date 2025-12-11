import { useState, useEffect } from "react";
import { TextField } from "../../TextInput/jsx/TextField.jsx";
import styles from "../css/AddressField.module.css";
import { useMemo } from "react";

export const AddressField = ({
  setResult,
  color,
  values = {},
  isHouse = false,
  isStreet = false,
  isCity = false,
  isState = false,
  isPostal = false,
  isCountry = false,
  isAddressLine = false,
  isLandmark = false,
  showLabelAlways = false,
  width = "300px",
  isBorder = false,
  gap = "10px",
  setIsFieldValid = () => {},
  backendErrors = {}, // <-- new prop: { house: "Error message" }
}) => {
  const VALID = "valid",
    INVALID = "invalid";
  // Define all field configs in a DRY way
  const fieldConfigs = useMemo(
    () => [
      {
        key: "house",
        label: "House No.",
        pattern: /^[A-Za-z0-9\s,\/.\-]*$/,
        errorMessage: "Must be numbers, letters, space, hyphen and dot",
        minLength: 1,
        maxLength: 10,
        visible: isHouse,
      },
      {
        key: "street",
        label: "Street No.",
        pattern: /^[A-Za-z0-9\s,]*$/,
        errorMessage: "Must be letters, numbers, and spaces.",
        minLength: 1,
        maxLength: 100,
        visible: isStreet,
      },
      {
        key: "city",
        label: "City",
        pattern: /^[A-Za-z0-9\s]*$/,
        errorMessage: "Must be letters, numbers and spaces.",
        minLength: 2,
        maxLength: 50,
        visible: isCity,
      },
      {
        key: "state",
        label: "State",
        pattern: /^[A-Za-z\s]*$/,
        errorMessage: "Must be letters and spaces.",
        minLength: 2,
        maxLength: 50,
        visible: isState,
      },
      {
        key: "postal",
        label: "Postal Code",
        pattern: /^[0-9]*$/,
        errorMessage: "Must be 4 to 8 digits.",
        minLength: 4,
        maxLength: 8,
        visible: isPostal,
      },
      {
        key: "country",
        label: "Country",
        pattern: /^[A-Za-z\s]*$/,
        errorMessage: "Must be letters and spaces.",
        minLength: 2,
        maxLength: 50,
        visible: isCountry,
      },
      {
        key: "landmark",
        label: "Landmark",
        pattern: /^[A-Za-z0-9\s,]*$/,
        errorMessage: "Must be letters, numbers, spaces and commas.",
        minLength: 2,
        maxLength: 50,
        visible: isLandmark,
      },
      {
        key: "addressLine",
        label: "Address Line (Additional)",
        pattern: /^[A-Za-z0-9\s,]*$/,
        errorMessage: "Must be letters, numbers, spaces and commas.",
        minLength: 2,
        maxLength: 50,
        visible: isAddressLine,
      },
    ],
    [
      isHouse,
      isStreet,
      isCity,
      isState,
      isPostal,
      isCountry,
      isAddressLine,
      isLandmark,
    ]
  );

  // Initialize state dynamically
  const initialStates = useMemo(() => {
    const states = {};
    const errors = {};
    fieldConfigs.forEach((f) => {
      if (f.visible) {
        states[f.key] = values[f.key] || "";
        errors[f.key] = INVALID;
      }
    });
    return { states, errors };
  }, [fieldConfigs, values]);

  const [address, setAddress] = useState(initialStates.states);
  const [error, setError] = useState(initialStates.errors);
  const [fieldMessages, setFieldMessages] = useState({}); // backend error messages
  const [isStarted, setIsStarted] = useState(false);

  // keep local state in sync if `values` changes externally
  useEffect(() => {
    if (!values || !Object.keys(values).length) return;

    const update = {};
    fieldConfigs.forEach((f) => {
      if (f.visible && values[f.key] && !address[f.key]) {
        update[f.key] = values[f.key];
      }
    });

    if (Object.keys(update).length) {
      setAddress((prev) => ({ ...prev, ...update }));
    }
  }, [values]);

  // Merge backend errors into local state
  useEffect(() => {
    if (backendErrors && Object.keys(backendErrors).length) {
      setFieldMessages((prev) => ({ ...prev, ...backendErrors }));
      setError((prev) => {
        const updated = { ...prev };
        Object.keys(backendErrors).forEach((key) => {
          if (updated[key] !== undefined) updated[key] = INVALID;
        });
        return updated;
      });
    }
  }, [backendErrors]);

  const handleChange = (field, value, isError = false) => {
    !isStarted && setIsStarted(true);

    // clear backend error on user input
    setFieldMessages((prev) => ({ ...prev, [field]: undefined }));

    !isError && setAddress((prev) => ({ ...prev, [field]: value }));
    if (isError) {
      setError((prev) => ({ ...prev, [field]: value ? VALID : INVALID }));
    }
  };

  useEffect(() => {
    setResult(address);
  }, [address]);

  useEffect(() => {
    if (!isStarted) return;

    const validity = Object.values(error).find((er) => er === INVALID);
    setIsFieldValid(!validity);
  }, [error]);

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
              value={address[key]}
              required
              color={color}
              isBorder={isBorder}
              showLabelAlways={showLabelAlways}
              width={width}
              setIsFieldValid={(v) => handleChange(key, v, true)}
              backendError={fieldMessages[key]}
            />
          )
      )}
    </div>
  );
};
