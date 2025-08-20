import { useState } from "react";
import styles from "../css/GenericForm.module.css";
import { Dropdown } from "../../../InputFields/Selectors/jsx/Dropdown";
import { TextField } from "../../../InputFields/TextInput/jsx/TextField";
import { Button } from "../../../InputFields/Actions/jsx/Button";
import { EmailField } from "../../../InputFields/CommunicationInput/jsx/EmailInput";
import { MobileField } from "../../../InputFields/CommunicationInput/jsx/MobileInput";
import { DatePicker } from "../../../InputFields/DateTimeInput/jsx/DatePicker";
import { TimePicker } from "../../../InputFields/DateTimeInput/jsx/TimePicker";
import { AddressField } from "../../../InputFields/Location/jsx/AddressField";
import { PasswordField } from "../../../InputFields/Security/jsx/PasswordField";

export function GenericForm({
  config,
  onSubmit,
  submitLabel = "Submit",
  style,
  color = "var(--colorCyan)",
}) {
  const initialState = {};
  config.fields.forEach((f) => {
    if (f.type === "multi-dropdown") {
      initialState[f.name] = f.defaultValue || [];
    } else {
      initialState[f.name] = f.defaultValue || "";
    }
  });

  const [formData, setFormData] = useState(initialState);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err) {
      if (err?.response?.data?.errors) {
      } else {
        console.error(err);
      }
    }
  };

  return (
    <form className={styles.form} style={style} onSubmit={handleSubmit}>
      <div className={styles.meta}>
        <h2 className={styles.title} style={{ color: color }}>
          {config.title}
        </h2>
        <p className={styles.description}>{config.description}</p>
      </div>

      {config.fields.map((field) => {
        // Render Dropdown field (single selection)
        if (field.type === "dropdown") {
          return (
            <Dropdown
              width={"100%"}
              color={color}
              key={field.name}
              label={field.label}
              placeholder={field.placeholder || field.label}
              options={field.options}
              value={formData[field.name]}
              setResult={(value) => handleChange(field.name, value)} // Update state on change
            />
          );
        }

        // Render Multi-dropdown field (multiple selection)
        if (field.type === "multi-dropdown") {
          return (
            <Dropdown
              width={"100%"}
              color={color}
              key={field.name}
              label={field.label}
              multiple
              placeholder={field.placeholder || field.label}
              options={field.options}
              value={formData[field.name]}
              setResult={(value) => handleChange(field.name, value)} // Update state on change
            />
          );
        }

        // Render Email field
        if (field.type === "email") {
          return (
            <EmailField
              width={"100%"}
              color={color}
              key={field.name}
              label={field.label}
              required={field?.required || false}
              placeholder={field.placeholder || field.label}
              value={formData[field.name]}
              setResult={(value) => handleChange(field.name, value)} // Update state on change
              showLabelAlways
            />
          );
        }
        // Render Email field
        if (field.type === "password") {
          return (
            <PasswordField
              width={"100%"}
              color={color}
              key={field.name}
              label={field.label}
              placeholder={field.placeholder || field.label}
              value={formData[field.name]}
              setResult={(value) => handleChange(field.name, value)} // Update state on change
              showLabelAlways
            />
          );
        }

        // Render Mobile field
        if (field.type === "mobile") {
          return (
            <MobileField
              width={"100%"}
              color={color}
              key={field.name}
              label={field.label}
              required={field?.required || false}
              placeholder={field.placeholder || field.label}
              value={formData[field.name]}
              setResult={(value) => handleChange(field.name, value)} // Update state on change
              showLabelAlways
            />
          );
        }

        // Render Date Picker field
        if (field.type === "date") {
          return (
            <DatePicker
              width={"100%"}
              color={color}
              key={field.name}
              label={field.label}
              required={field?.required || false}
              isSmall={field?.isSmall || true}
              value={formData[field.name]}
              initialDate={field.initialDate}
              restrictionStartDate={field.restrictionStartDate}
              restrictionEndDate={field.restrictionEndDate}
              setResult={(value) => handleChange(field.name, value)} // Update state on change
              showLabelAlways
            />
          );
        }

        // Render Time Picker field
        if (field.type === "time") {
          return (
            <TimePicker
              key={field.name}
              color={color}
              label={field.label}
              value={formData[field.name]}
              setResult={(value) => handleChange(field.name, value)} // Update state on change
            />
          );
        }

        if (field.type === "address") {
          return (
            <AddressField
              width={"100%"}
              color={color}
              key={field.name}
              setResult={(value) => handleChange(field.name, value)}
              isHouse={field.isHouse}
              isStreet={field.isStreet}
              isCity={field.isCity}
              isState={field.isState}
              isPostal={field.isPostal}
              isCountry={field.isCountry}
              isAddressLine={field.isAddressLine}
              isLandmark={field.isLandmark}
              showLabelAlways
              gap="2rem"
            />
          );
        }

        // Render TextField for all other types (text, password, etc.)
        return (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            name={field.name}
            value={formData[field.name]}
            setResult={(value) => handleChange(field.name, value)} // Update state on change
            width="100%"
            color={color}
            showLabelAlways
          />
        );
      })}

      <Button color={color} text={submitLabel} onClick={handleSubmit} />
    </form>
  );
}
