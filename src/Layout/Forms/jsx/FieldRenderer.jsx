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
import { FORM_FIELDS_TYPE } from "../validation/helper/fields.js";
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
import { FIELDS_PROPS as FPs } from "../validation/helper/fields";

export function FieldRenderer({ field, value, onChange, settings }) {
  // Conditional rendering
  if (field.conditional) {
    const isMatch = isConditional(field, value);
    if (!isMatch) return null;
  }

  const color = settings.color;
  const width = "100%";

  // Repeatable group
  if (field[FPs.REPEATABLE]) {
    return (
      <RepeatableGroup
        field={field}
        values={value[field[FPs.NAME]]}
        onChange={(v) => onChange(field[FPs.NAME], v)}
        settings={settings}
      />
    );
  }

  const fieldMap = {
    [FORM_FIELDS_TYPE.DROPDOWN]: (
      <Dropdown
        width={width}
        color={color}
        key={field[FPs.NAME]}
        label={field[FPs.LABEL]}
        placeholder={field[FPs.PLACEHOLDER] || field[FPs.LABEL]}
        showLabelAlways={settings.showLabelAlways}
        options={field[FPs.OPTIONS] || []}
        value={value[field[FPs.NAME]]}
        multiple={false}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }} // Update state on change
      />
    ),
    [FORM_FIELDS_TYPE.MULTI_DROPDOWN]: (
      <Dropdown
        width={width}
        color={color}
        key={field[FPs.NAME]}
        label={field[FPs.LABEL]}
        placeholder={field[FPs.PLACEHOLDER] || field[FPs.LABEL]}
        showLabelAlways={settings.showLabelAlways}
        options={field[FPs.OPTIONS] || []}
        value={value[field[FPs.NAME]]}
        multiple={true}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }} // Update state on change
      />
    ),
    [FORM_FIELDS_TYPE.EMAIL]: (
      <EmailField
        width={width}
        color={color}
        key={field[FPs.NAME]}
        label={field[FPs.LABEL]}
        required={field?.[FPs.REQUIRED] || false}
        placeholder={field[FPs.PLACEHOLDER] || field[FPs.LABEL]}
        value={value[field[FPs.NAME]]}
        setResult={(v) => onChange(field[FPs.NAME], v)} // Update state on change
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
        showLabelAlways={settings.showLabelAlways}
      />
    ),
    [FORM_FIELDS_TYPE.PASSWORD]: (
      <PasswordField
        width={width}
        color={color}
        key={field[FPs.NAME]}
        label={field[FPs.LABEL]}
        placeholder={field[FPs.PLACEHOLDER] || field[FPs.LABEL]}
        value={value[field[FPs.NAME]]}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }} // Update state on change
        showLabelAlways={settings.showLabelAlways}
      />
    ),
    [FORM_FIELDS_TYPE.MOBILE]: (
      <MobileField
        width={width}
        color={color}
        key={field[FPs.NAME]}
        label={field[FPs.LABEL]}
        required={field?.[FPs.REQUIRED] || false}
        placeholder={field[FPs.PLACEHOLDER] || field[FPs.LABEL]}
        value={value[field[FPs.NAME]]?.[FPs.NUMBER]}
        code={value[field[FPs.NAME]]?.[FPs.CODE]}
        setResult={(v) => {
          const val = {
            [FPs.CODE]: v.countryCode,
            [FPs.NUMBER]: v.phoneNumber,
          };
          onChange(field[FPs.NAME], val);
        }} // Update state on change
        showLabelAlways={settings.showLabelAlways}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.DATE]: (
      <DatePicker
        width={width}
        color={color}
        key={field[FPs.NAME]}
        label={field[FPs.LABEL]}
        required={field?.[FPs.REQUIRED] || false}
        initialDate={value[field[FPs.NAME]] || field[FPs.VALUE]}
        restrictionStartDate={field[FPs.RESTRICTION_START_DATE]}
        restrictionEndDate={field[FPs.RESTRICTION_END_DATE]}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }} // Update state on change
        mode={field[FPs.MODE]}
      />
    ),
    [FORM_FIELDS_TYPE.TIME]: (
      <TimePicker
        key={field[FPs.NAME]}
        color={color}
        label={field[FPs.LABEL]}
        value={value[field[FPs.NAME]]}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }} // Update state on change
      />
    ),
    [FORM_FIELDS_TYPE.ADDRESS]: (
      <AddressField
        width={width}
        color={color}
        key={field[FPs.NAME]}
        setResult={(v) => onChange(field[FPs.NAME], v)}
        isHouse={field[FPs.IS_HOUSE]}
        isStreet={field[FPs.IS_STREET]}
        isCity={field[FPs.IS_CITY]}
        isState={field[FPs.IS_STATE]}
        isPostal={field[FPs.IS_POSTAL]}
        isCountry={field[FPs.IS_COUNTRY]}
        isAddressLine={field[FPs.IS_ADDRESS_LINE]}
        isLandmark={field[FPs.IS_LANDMARK]}
        values={value[field[FPs.NAME]]}
        showLabelAlways={settings.showLabelAlways}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
        gap={settings.gap}
      />
    ),
    [FORM_FIELDS_TYPE.TEXT]: (
      <TextField
        key={field[FPs.NAME]}
        label={field[FPs.LABEL]}
        placeholder={field[FPs.PLACEHOLDER] || field[FPs.LABEL]}
        name={field[FPs.NAME]}
        value={value[field[FPs.NAME]]}
        setResult={(v) => onChange(field[FPs.NAME], v)} // Update state on change
        width={width}
        color={color}
        showLabelAlways={settings.showLabelAlways}
        required={field?.[FPs.REQUIRED] || false}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.URL]: (
      <TextField
        key={field[FPs.NAME]}
        label={field[FPs.LABEL]}
        placeholder={field[FPs.PLACEHOLDER] || field[FPs.LABEL]}
        name={field[FPs.NAME]}
        value={value[field[FPs.NAME]]}
        setResult={(v) => onChange(field[FPs.NAME], v)} // Update state on change
        width={width}
        color={color}
        showLabelAlways={settings.showLabelAlways}
        required={field?.[FPs.REQUIRED] || false}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.TEXT_AREA]: (
      <TextArea
        width={width}
        key={field[FPs.NAME]}
        showLabelAlways={settings.showLabelAlways}
        value={value[field[FPs.NAME]]}
        label={field[FPs.LABEL]}
        setResult={(v) => onChange(field[FPs.NAME], v)} // Update state on change
        color={color}
        placeholder={field[FPs.PLACEHOLDER] || field[FPs.LABEL]}
        minLength={field[FPs.MIN_LENGTH]}
        maxLength={field[FPs.MAX_LENGTH]}
        maxTextAreaHeight={field[FPs.MAX_TEXTAREA_HEIGHT]}
        showCharacterCount={field[FPs.SHOW_CHARACTER_COUNT]}
        showWordCount={field[FPs.SHOW_WORD_COUNT]}
        disabled={field[FPs.DISABLED]}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.JSON]: (
      <JsonField
        width={width}
        color={color}
        label={field[FPs.LABEL]}
        setResult={(v) => onChange(field[FPs.NAME], v)} // Update state on change
        showCharacterCount={field[FPs.SHOW_CHARACTER_COUNT]}
        showWordCount={field[FPs.SHOW_WORD_COUNT]}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
        hideOnSave={field[FPs.HIDE_ON_SAVE]}
        isBorder={field[FPs.IS_BORDER]}
        value={value[field[FPs.NAME]]}
      />
    ),
    [FORM_FIELDS_TYPE.FILE]: (
      <FileUpload
        value={value[field[FPs.NAME]] || []}
        label={field[FPs.LABEL]}
        width={width}
        multiple={field[FPs.MULTIPLE]}
        maxFiles={field[FPs.MAX_FILES]}
        color={color}
        maxSize={field[FPs.MAX_SIZE_MB]}
        allowedTypes={field[FPs.ALLOWED_TYPES]}
        height={field[FPs.HEIGHT] || "200px"}
        setResult={(v) => onChange(field[FPs.NAME], v)}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.AUDIO]: (
      <AudioUpload
        label={field[FPs.LABEL]}
        width={width}
        height={field[FPs.HEIGHT] || "100px"}
        maxSize={field[FPs.MAX_SIZE_MB]}
        allowedTypes={field[FPs.ALLOWED_TYPES]}
        setResult={(v) => onChange(field[FPs.NAME], v)}
        value={value[field[FPs.NAME]]}
        color={color}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.IMAGE]: (
      <ImageUpload
        label={field[FPs.LABEL]}
        width={width}
        height={field[FPs.HEIGHT] || "100px"}
        value={value[field[FPs.NAME]]}
        maxSize={field[FPs.MAX_SIZE_MB]}
        allowedTypes={field[FPs.ALLOWED_TYPES]}
        requireSquare={field[FPs.REQUIRE_SQUARE]}
        previewBorderRadius={field[FPs.PREVIEW_BORDER_RADIUS]}
        setResult={(v) => onChange(field[FPs.NAME], v)}
        color={color}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.VIDEO]: (
      <VideoUpload
        label={field[FPs.LABEL]}
        width={width}
        height={field[FPs.HEIGHT] || "100px"}
        maxSize={field[FPs.MAX_SIZE_MB]}
        allowedTypes={field[FPs.ALLOWED_TYPES]}
        preview={field[FPs.PREVIEW]}
        value={value[field[FPs.NAME]]}
        setResult={(v) => onChange(field[FPs.NAME], v)}
        color={color}
        setIsFieldValid={(v) => onChange(field[FPs.NAME], v, true)}
      />
    ),
    [FORM_FIELDS_TYPE.SECURTY_QUESTION]: (
      <SecurityQuestion
        questions={field[FPs.OPTIONS]}
        placeholder={field[FPs.LABEL] || field[FPs.PLACEHOLDER]}
        width={width}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }}
        color={color}
        value={value[field[FPs.NAME]]}
      />
    ),
    [FORM_FIELDS_TYPE.OTP]: (
      <OtpField
        width={width}
        setResult={(v) => onChange(field[FPs.NAME], v)}
        color={color}
        length={field[FPs.LENGTH]}
        verifcationEndpoint={field[FPs.VERIFICATION_ENDPOINT]}
        userId={field[FPs.USER_ID]}
        // setError={() => {}}
        isNumeric={field[FPs.IS_NUMERIC]}
      />
    ),
    [FORM_FIELDS_TYPE.CHECKBOX]: (
      <CheckboxGroup
        width={width}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }}
        color={color}
        options={field[FPs.OPTIONS]}
        initialSelectedValues={value[field[FPs.NAME]]}
        layout={field[FPs.LAYOUT]}
        label={field[FPs.LABEL]}
        disabled={field[FPs.DISABLED]}
      />
    ),
    [FORM_FIELDS_TYPE.COLOR]: (
      <ColorPicker
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }}
        color={value[field[FPs.NAME]] || field[FPs.COLOR] || "#ff5969"}
      />
    ),
    [FORM_FIELDS_TYPE.RADIO]: (
      <RadioGroup
        width={width}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }}
        color={color}
        options={field[FPs.OPTIONS]}
        initialSelectedValue={value[field[FPs.NAME]]}
        layout={field[FPs.LAYOUT]}
        label={field[FPs.LABEL]}
        disabled={field[FPs.DISABLED]}
      />
    ),
    [FORM_FIELDS_TYPE.SEARCH]: (
      <SearchBox
        placeholder={field[FPs.LABEL] || field[FPs.PLACEHOLDER]}
        width={width}
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }}
        color={color}
        suggestions={field[FPs.OPTIONS]}
      />
    ),
    [FORM_FIELDS_TYPE.SWITCH]: (
      <Switch
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }}
        color={color}
        initialValue={value[field[FPs.NAME]]}
        label={field[FPs.LABEL]}
        disabled={field[FPs.DISABLED]}
      />
    ),
    [FORM_FIELDS_TYPE.SLIDER]: (
      <Slider
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }}
        color={color}
        label={field[FPs.LABEL]}
        value={value[field[FPs.NAME]]}
        min={field[FPs.MIN]}
        max={field[FPs.MAX]}
        step={field[FPs.STEP]}
        showRange={field[FPs.SHOW_RANGE]}
        showValueSide={field[FPs.SHOW_VALUE_SIDE]}
        precision={field[FPs.PRECISION]}
        width={width}
      />
    ),
    [FORM_FIELDS_TYPE.STEPPER]: (
      <Stepper
        setResult={(v) => {
          onChange(field[FPs.NAME], v);
          onChange(field[FPs.NAME], true, true); // to update Error State as valid
        }}
        color={color}
        width={width}
        label={field[FPs.LABEL]}
        value={value[field[FPs.NAME]]}
        min={field[FPs.MIN]}
        max={field[FPs.MAX]}
        step={field[FPs.STEP]}
      />
    ),
  };

  return fieldMap[field[FPs.TYPE]] || null;
}
