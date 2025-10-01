// FieldRenderer.jsx
import { TextField } from "../../../InputFields/TextInput/jsx/TextField";
import { TextArea } from "../../../InputFields/TextInput/jsx/TextArea";
import { EmailField } from "../../../InputFields/CommunicationInput/jsx/EmailInput";
import { MobileField } from "../../../InputFields/CommunicationInput/jsx/MobileInput";
import { PasswordField } from "../../../InputFields/Security/jsx/PasswordField";
import { DatePicker } from "../../../InputFields/DateTimeInput/jsx/DatePicker";
import { TimePicker } from "../../../InputFields/DateTimeInput/jsx/TimePicker";
import { AddressField } from "../../../InputFields/Location/jsx/AddressField";
import { Dropdown } from "../../../InputFields/Selectors/jsx/Dropdown";
import { FORM_FIELDS_TYPE } from "./formFieldTypes";
import { RepeatableGroup } from "./RepeatableGroup";
import { FileUpload } from "../../../InputFields/Uploads/jsx/FileUpload";
import { isConditional } from "./conditional";

export function FieldRenderer({ field, value, onChange, settings }) {
  // Conditional rendering
  if (field.conditional) {
    const isMatch = isConditional(field, value);
    if (!isMatch) return null;
  }

  const color = settings.color;
  const width = "100%";

  // Repeatable group
  if (field.repeatable) {
    return (
      <RepeatableGroup
        field={field}
        values={value[field.name]}
        onChange={(val) => onChange(field.name, val)}
        settings={settings}
      />
    );
  }

  const fieldMap = {
    [FORM_FIELDS_TYPE.DROPDOWN]: (
      <Dropdown
        width={width}
        color={color}
        key={field.name}
        label={field.label}
        placeholder={field.placeholder || field.label}
        showLabelAlways={settings.showLabelAlways}
        options={field.options || []}
        value={value[field.name]}
        multiple={false}
        setResult={(v) => onChange(field.name, v)} // Update state on change
      />
    ),
    [FORM_FIELDS_TYPE.MULTI_DROPDOWN]: (
      <Dropdown
        width={width}
        color={color}
        key={field.name}
        label={field.label}
        placeholder={field.placeholder || field.label}
        showLabelAlways={settings.showLabelAlways}
        options={field.options || []}
        value={value[field.name]}
        multiple={true}
        setResult={(v) => onChange(field.name, v)} // Update state on change
      />
    ),
    [FORM_FIELDS_TYPE.EMAIL]: (
      <EmailField
        width={width}
        color={color}
        key={field.name}
        label={field.label}
        required={field?.required || false}
        placeholder={field.placeholder || field.label}
        value={value[field.name]}
        setResult={(v) => onChange(field.name, v)} // Update state on change
        setIsFieldValid={(v) => onChange(field.name, v, true)}
        showLabelAlways={settings.showLabelAlways}
      />
    ),
    [FORM_FIELDS_TYPE.PASSWORD]: (
      <PasswordField
        width={width}
        color={color}
        key={field.name}
        label={field.label}
        placeholder={field.placeholder || field.label}
        value={value[field.name]}
        setResult={(v) => onChange(field.name, v)} // Update state on change
        showLabelAlways={settings.showLabelAlways}
      />
    ),
    [FORM_FIELDS_TYPE.MOBILE]: (
      <MobileField
        width={width}
        color={color}
        key={field.name}
        label={field.label}
        required={field?.required || false}
        placeholder={field.placeholder || field.label}
        value={value[field.name]}
        setResult={(v) => {
          const val = { code: v.countryCode, number: v.phoneNumber };
          onChange(field.name, val);
        }} // Update state on change
        showLabelAlways={settings.showLabelAlways}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.DATE]: (
      <DatePicker
        width={width}
        color={color}
        key={field.name}
        label={field.label}
        required={field?.required || false}
        isSmall={field?.isSmall || true}
        value={value[field.name]}
        initialDate={field.initialDate}
        restrictionStartDate={field.restrictionStartDate}
        restrictionEndDate={field.restrictionEndDate}
        setResult={(v) => onChange(field.name, v)} // Update state on change
        showLabelAlways={settings.showLabelAlways}
      />
    ),
    [FORM_FIELDS_TYPE.TIME]: (
      <TimePicker
        key={field.name}
        color={color}
        label={field.label}
        value={value[field.name]}
        setResult={(v) => onChange(field.name, v)} // Update state on change
      />
    ),
    [FORM_FIELDS_TYPE.ADDRESS]: (
      <AddressField
        width={width}
        color={color}
        key={field.name}
        setResult={(v) => onChange(field.name, v)}
        isHouse={field.isHouse}
        isStreet={field.isStreet}
        isCity={field.isCity}
        isState={field.isState}
        isPostal={field.isPostal}
        isCountry={field.isCountry}
        isAddressLine={field.isAddressLine}
        isLandmark={field.isLandmark}
        showLabelAlways={settings.showLabelAlways}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
        gap="2rem"
      />
    ),
    [FORM_FIELDS_TYPE.TEXT]: (
      <TextField
        key={field.name}
        label={field.label}
        type={field.type || FORM_FIELDS_TYPE.TEXT}
        name={field.name}
        value={value[field.name]}
        setResult={(value) => onChange(field.name, value)} // Update state on change
        width={width}
        color={color}
        showLabelAlways={settings.showLabelAlways}
        required={field?.required || false}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.TEXT_AREA]: (
      <TextArea
        width={width}
        key={field.name}
        showLabelAlways={settings.showLabelAlways}
        value={value[field.name]}
        label={field.label}
        setResult={(v) => onChange(field.name, v)} // Update state on change
        color={color}
        placeholder={field.placeholder || field.label}
        minLength={field.minLength}
        maxLength={field.maxLength}
        maxTextAreaHeight={field.maxTextAreaHeight}
        showCharacterCount={field.showCharacterCount}
        showWordCount={field.showWordCount}
        disabled={field.disabled}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.FILE]: (
      <FileUpload
        value={value[field.name]}
        label={field.label}
        width={width}
        multiple={field.multiple}
        maxFiles={field.maxFiles}
        maxSize={field.maxSize}
        allowedTypes={field.allowedTypes}
        height={field.height || "200px"}
        setResult={(files) => onChange(field.name, files)}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
      />
    ),
  };

  return fieldMap[field.type] || null;
}
