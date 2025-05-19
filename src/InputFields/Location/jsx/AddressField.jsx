import React, { useEffect, useState } from "react";
import TextField from "../../TextInput/jsx/TextField";
import styles from "../css/AddressField.module.css";

const AddressField = ({
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
}) => {
  const [house, setHouse] = useState(isHouse === true ? "" : null);
  const [street, setStreet] = useState(isStreet === true ? "" : null);
  const [city, setCity] = useState(isCity === true ? "" : null);
  const [state, setState] = useState(isState === true ? "" : null);
  const [postal, setPostal] = useState(isPostal === true ? "" : null);
  const [country, setCountry] = useState(isCountry === true ? "" : null);
  const [addressLine, setAddressLine] = useState(
    isAddressLine === true ? "" : null
  );
  const [landmark, setLandmark] = useState(isLandmark === true ? "" : null);

  useEffect(() => {
    setResult({
      house,
      street,
      city,
      state,
      postal,
      country,
      addressLine,
      landmark,
    });
  }, [
    house,
    street,
    city,
    state,
    postal,
    country,
    addressLine,
    landmark,
    setResult,
  ]);

  return (
    <div className={styles.addressField}>
      {isHouse && (
        <TextField
          label="House No."
          placeholder="House No."
          setResult={setHouse}
          errorMessage="Must be Numbers, letters, space, hyphon and dot"
          minLength={1}
          maxLength={10}
          pattern="^[A-Za-z0-9\s,/.\\-]*$"
          required
          color={color}
          showLabelAlways={showLabelAlways}
        />
      )}
      {isStreet && (
        <TextField
          label="Street No."
          placeholder="Street No."
          setResult={setStreet}
          pattern="^[A-Za-z0-9\s,]*$"
          errorMessage="Must be letters, Numbers, and spaces."
          minLength={3}
          maxLength={100}
          color={color}
          required
          showLabelAlways={showLabelAlways}
        />
      )}
      {isCity && (
        <TextField
          label="City"
          placeholder="City"
          setResult={setCity}
          pattern="^[A-Za-z0-9\s]*$"
          errorMessage="Must be letters, Numbers and spaces."
          minLength={2}
          maxLength={50}
          color={color}
          required
          showLabelAlways={showLabelAlways}
        />
      )}
      {isState && (
        <TextField
          label="State"
          placeholder="State"
          setResult={setState}
          pattern="^[A-Za-z\s]*$"
          errorMessage="Must be letters and spaces."
          minLength={2}
          maxLength={50}
          color={color}
          required
          showLabelAlways={showLabelAlways}
        />
      )}
      {isPostal && (
        <TextField
          label="Postal Code"
          placeholder="Enter postal code"
          setResult={setPostal}
          minLength={4}
          maxLength={8}
          pattern="^[0-9]*$"
          errorMessage="Must be 4 to 8 digits."
          color={color}
          required
          showLabelAlways={showLabelAlways}
        />
      )}
      {isCountry && (
        <TextField
          label="Country"
          placeholder="Country"
          setResult={setCountry}
          pattern="^[A-Za-z\s]*$"
          errorMessage="Must be letters and spaces."
          minLength={2}
          maxLength={50}
          color={color}
          required
          showLabelAlways={showLabelAlways}
        />
      )}
      {isLandmark && (
        <TextField
          label="Landmark"
          placeholder="Landmark"
          setResult={setLandmark}
          pattern="^[A-Za-z0-9\s,]*$"
          errorMessage="Must be letters, numbers, spaces and commas."
          minLength={2}
          maxLength={50}
          color={color}
          showLabelAlways={showLabelAlways}
        />
      )}
      {isAddressLine && (
        <TextField
          label="Address Line (Additional)"
          placeholder="Additional address line"
          setResult={setAddressLine}
          pattern="^[A-Za-z0-9\s,]*$"
          errorMessage="Must be letters, numbers, spaces and commas."
          minLength={2}
          maxLength={50}
          color={color}
          showLabelAlways={showLabelAlways}
        />
      )}
    </div>
  );
};

export default AddressField;
