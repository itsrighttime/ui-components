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
import { AudioUpload } from "../../../InputFields/Uploads/jsx/AudioUpload";
import { ImageUpload } from "../../../InputFields/Uploads/jsx/ImageUpload";
import { VideoUpload } from "../../../InputFields/Uploads/jsx/VideoUpload";
import { SecurityQuestion } from "../../../InputFields/Security/jsx/SecurityQuestion";
import { OtpField } from "../../../InputFields/Security/jsx/OtpField";
import { CheckboxGroup } from "../../../InputFields/Selectors/jsx/CheckboxGroup";
import { ColorPicker } from "../../../InputFields/Selectors/jsx/ColorPicker";
import { RadioGroup } from "../../../InputFields/Selectors/jsx/RadioGroup";
import { SearchBox } from "../../../InputFields/Selectors/jsx/SearchBox";
import { Switch } from "../../../InputFields/Selectors/jsx/Switch";
import { Slider } from "../../../InputFields/NumericInput.jsx/jsx/Slider";
import { JsonField } from "../../../InputFields/TextInput/jsx/JsonField";
import { Stepper } from "../../../InputFields/NumericInput.jsx/jsx/Stepper";

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
    [FORM_FIELDS_TYPE.JSON]: (
      <JsonField
        width={width}
        color={color}
        label={field.label}
        setResult={(v) => onChange(field.name, v)} // Update state on change
        showCharacterCount={field.showCharacterCount}
        showWordCount={field.showWordCount}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
        hideOnSave={field.hideOnSave}
        isBorder={field.isBorder}
        backendError={field.backendError}
      />
    ),
    [FORM_FIELDS_TYPE.FILE]: (
      <FileUpload
        value={value[field.name]}
        label={field.label}
        width={width}
        multiple={field.multiple}
        maxFiles={field.maxFiles}
        color={color}
        maxSize={field.maxSize}
        allowedTypes={field.allowedTypes}
        height={field.height || "200px"}
        setResult={(files) => onChange(field.name, files)}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.AUDIO]: (
      <AudioUpload
        label={field.label}
        width={width}
        height={field.height || "100px"}
        maxSizeMB={field.maxSizeMB}
        allowedTypes={field.allowedTypes}
        setResult={(files) => onChange(field.name, files)}
        color={color}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.IMAGE]: (
      <ImageUpload
        label={field.label}
        width={width}
        height={field.height || "100px"}
        maxSizeMB={field.maxSizeMB}
        allowedTypes={field.allowedTypes}
        requireSquare={field.requireSquare}
        previewBorderRadius={field.previewBorderRadius}
        setResult={(files) => onChange(field.name, files)}
        color={color}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.VIDEO]: (
      <VideoUpload
        label={field.label}
        width={width}
        height={field.height || "100px"}
        maxSizeMB={field.maxSizeMB}
        allowedTypes={field.allowedTypes}
        preview={field.preview}
        setResult={(files) => onChange(field.name, files)}
        color={color}
        setIsFieldValid={(v) => onChange(field.name, v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.SECURTY_QUESTION]: (
      <SecurityQuestion
        placeholder={field.label || field.placeholder}
        width={width}
        setResult={(files) => onChange(field.name, files)}
        color={color}
      />
    ),
    [FORM_FIELDS_TYPE.OTP]: (
      <OtpField
        width={width}
        setResult={(files) => onChange(field.name, files)}
        color={color}
        length={field.length}
        verifcationEndpoint={field.verifcationEndpoint}
        userId={field.userId}
        setError={field.setError}
        isNumeric={field.isNumeric}
      />
    ),
    [FORM_FIELDS_TYPE.CHECKBOX]: (
      <CheckboxGroup
        width={width}
        setResult={(files) => onChange(field.name, files)}
        color={color}
        options={field.options}
        initialSelectedValues={field.initialSelectedValues}
        layout={field.layout}
        label={field.label}
        disabled={field.disabled}
        customStyles={field.customStyles}
      />
    ),
    [FORM_FIELDS_TYPE.COLOR]: (
      <ColorPicker
        setResult={(files) => onChange(field.name, files)}
        color={field.color || "#ff5969"}
      />
    ),
    [FORM_FIELDS_TYPE.RADIO]: (
      <RadioGroup
        width={width}
        setResult={(files) => onChange(field.name, files)}
        color={color}
        options={field.options}
        initialSelectedValues={field.initialSelectedValues}
        layout={field.layout}
        label={field.label}
        disabled={field.disabled}
        customStyles={field.customStyles}
        initialSelectedValue={field.initialSelectedValue}
      />
    ),
    [FORM_FIELDS_TYPE.SEARCH]: (
      <SearchBox
        placeholder={field.label || field.placeholder}
        width={width}
        setResult={(files) => onChange(field.name, files)}
        color={color}
        suggestions={field.suggestions}
      />
    ),
    [FORM_FIELDS_TYPE.SWITCH]: (
      <Switch
        setResult={(files) => onChange(field.name, files)}
        color={color}
        initialValue={field.initialValue}
        label={field.label}
        disabled={field.disabled}
        customStyles={field.customStyles}
      />
    ),
    [FORM_FIELDS_TYPE.SLIDER]: (
      <Slider
        setResult={(files) => onChange(field.name, files)}
        color={color}
        label={field.label}
        value={field.value}
        min={field.min}
        max={field.max}
        step={field.step}
        showRange={field.showRange}
        showValueSide={field.showValueSide}
        precision={field.precision}
        width={width}
      />
    ),
    [FORM_FIELDS_TYPE.STEPPER]: (
      <Stepper
        setResult={(files) => onChange(field.name, files)}
        color={color}
        width={width}
        label={field.label}
        value={field.value}
        min={field.min}
        max={field.max}
        step={field.step}
      />
    ),
  };

  return fieldMap[field.type] || null;
}
