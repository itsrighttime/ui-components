import { useEffect, useState } from "react";
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
}) => {
  const initialStates = {
    house: isHouse ? "" : null,
    street: isStreet ? "" : null,
    city: isCity ? "" : null,
    state: isState ? "" : null,
    postal: isPostal ? "" : null,
    country: isCountry ? "" : null,
    addressLine: isAddressLine ? "" : null,
    landmark: isLandmark ? "" : null,
  };

  const [address, setAddress] = useState(initialStates);

  useEffect(() => {
    setResult(address);
  }, [address, setResult]);

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const fieldConfigs = [
    {
      key: "house",
      label: "House No.",
      placeholder: "House No.",
      visible: isHouse,
      pattern: "^[A-Za-z0-9\\s,/.\\-]*$",
      errorMessage: "Must be numbers, letters, space, hyphen and dot",
      minLength: 1,
      maxLength: 10,
    },
    {
      key: "street",
      label: "Street No.",
      placeholder: "Street No.",
      visible: isStreet,
      pattern: "^[A-Za-z0-9\\s,]*$",
      errorMessage: "Must be letters, numbers, and spaces.",
      minLength: 3,
      maxLength: 100,
    },
    {
      key: "city",
      label: "City",
      placeholder: "City",
      visible: isCity,
      pattern: "^[A-Za-z0-9\\s]*$",
      errorMessage: "Must be letters, numbers and spaces.",
      minLength: 2,
      maxLength: 50,
    },
    {
      key: "state",
      label: "State",
      placeholder: "State",
      visible: isState,
      pattern: "^[A-Za-z\\s]*$",
      errorMessage: "Must be letters and spaces.",
      minLength: 2,
      maxLength: 50,
    },
    {
      key: "postal",
      label: "Postal Code",
      placeholder: "Enter postal code",
      visible: isPostal,
      pattern: "^[0-9]*$",
      errorMessage: "Must be 4 to 8 digits.",
      minLength: 4,
      maxLength: 8,
    },
    {
      key: "country",
      label: "Country",
      placeholder: "Country",
      visible: isCountry,
      pattern: "^[A-Za-z\\s]*$",
      errorMessage: "Must be letters and spaces.",
      minLength: 2,
      maxLength: 50,
    },
    {
      key: "landmark",
      label: "Landmark",
      placeholder: "Landmark",
      visible: isLandmark,
      pattern: "^[A-Za-z0-9\\s,]*$",
      errorMessage: "Must be letters, numbers, spaces and commas.",
      minLength: 2,
      maxLength: 50,
    },
    {
      key: "addressLine",
      label: "Address Line (Additional)",
      placeholder: "Additional address line",
      visible: isAddressLine,
      pattern: "^[A-Za-z0-9\\s,]*$",
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
              key={key}
              label={label}
              placeholder={placeholder}
              setResult={(val) => handleChange(key, val)}
              pattern={pattern}
              errorMessage={errorMessage}
              minLength={minLength}
              maxLength={maxLength}
              required
              color={color}
              isBorder={isBorder}
              showLabelAlways={showLabelAlways}
            />
          )
      )}
    </div>
  );
};
