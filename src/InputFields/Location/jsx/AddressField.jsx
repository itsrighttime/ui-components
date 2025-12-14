import { useState, useEffect } from "react";
import { TextField } from "../../TextInput/jsx/TextField.jsx";
import styles from "../css/AddressField.module.css";
import { useMemo } from "react";

/**
 * AddressField Component
 *
 * A dynamic and reusable form component to capture structured address information.
 * It supports multiple address subfields such as house number, street, city, state,
 * postal code, country, landmark, and additional address lines. Each field is validated
 * using patterns, min/max length, and backend error integration.
 *
 * @component
 *
 * @param {Object} props - Configuration props for AddressField
 * @param {function} props.setResult - Callback to receive the full address object
 * @param {string} [props.color] - Custom color for input fields
 * @param {Object} [props.values={}] - Initial values for the address fields (e.g., { house: "123" })
 * @param {boolean} [props.isHouse=false] - Show/enable house number field
 * @param {boolean} [props.isStreet=false] - Show/enable street field
 * @param {boolean} [props.isCity=false] - Show/enable city field
 * @param {boolean} [props.isState=false] - Show/enable state field
 * @param {boolean} [props.isPostal=false] - Show/enable postal code field
 * @param {boolean} [props.isCountry=false] - Show/enable country field
 * @param {boolean} [props.isAddressLine=false] - Show/enable additional address line field
 * @param {boolean} [props.isLandmark=false] - Show/enable landmark field
 * @param {boolean} [props.showLabelAlways=false] - Always display field labels
 * @param {string} [props.width="300px"] - Width of the address field container
 * @param {boolean} [props.isBorder=false] - Whether to show borders around inputs
 * @param {string} [props.gap="10px"] - Gap between input fields
 * @param {function} [props.setIsFieldValid] - Callback to track overall field validity
 * @param {Object} [props.backendErrors={}] - Backend error messages keyed by field
 *
 * @returns {JSX.Element} Rendered AddressField component
 *
 * @example
 * <AddressField
 *   setResult={(address) => console.log(address)}
 *   color="#00bcd4"
 *   values={{ house: "123", city: "New York" }}
 *   isHouse
 *   isStreet
 *   isCity
 *   isState
 *   isPostal
 *   isCountry
 *   showLabelAlways
 *   width="400px"
 *   isBorder
 *   setIsFieldValid={(valid) => console.log(valid)}
 *   backendErrors={{ city: "Invalid city name" }}
 * />
 *
 * @notes
 * - Fields are dynamically rendered based on boolean props.
 * - Each field supports frontend validation and integrates backend error messages.
 * - The component maintains local state for each field and notifies parent on changes.
 */

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
