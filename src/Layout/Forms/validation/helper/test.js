export const FORM_FIELDS_TYPE = {
  DROPDOWN: "dropdown",
  MULTI_DROPDOWN: "multi-dropdown",
  EMAIL: "email",
  PASSWORD: "password",
  MOBILE: "mobile",
  DATE: "date",
  TIME: "time",
  ADDRESS: "address",
  TEXT: "text",
  TEXT_AREA: "textArea",
  JSON: "json",
  FILE: "file",
  AUDIO: "audio",
  VIDEO: "video",
  IMAGE: "image",
  SECURTY_QUESTION: "secrityuQuestion",
  OTP: "otp",
  CHECKBOX: "checkbox",
  COLOR: "color",
  RADIO: "radio",
  SEARCH: "search",
  SWITCH: "switch",
  SLIDER: "slider",
  STEPPER: "stepper",
};

const name = "name";
const label = "label";
const placeholder = "placeholder";
const options = "options";
const multiple = "multiple";
const required = "required";
const code = "code";
const restrictionStartDate = "restrictionStartDate";
const restrictionEndDate = "restrictionEndDate";
const mode = "mode";
const isHouse = "isHouse";
const isStreet = "isStreet";
const isCity = "isCity";
const isState = "isState";
const isPostal = "isPostal";
const isCountry = "isCountry";
const isAddressLine = "isAddressLine";
const isLandmark = "isLandmark";
const minLength = "minLength";
const maxLength = "maxLength";
const maxTextAreaHeight = "maxTextAreaHeight";
const showCharacterCount = "showCharacterCount";
const showWordCount = "showWordCount";
const disabled = "disabled";
const hideOnSave = "hideOnSave";
const isBorder = "isBorder";
const maxFiles = "maxFiles";
const allowedTypes = "allowedTypes";
const height = "height";
const maxSizeMB = "maxSizeMB";
const requireSquare = "requireSquare";
const previewBorderRadius = "previewBorderRadius";
const preview = "preview";
const verifcationEndpoint = "verifcationEndpoint";
const userId = "userId";
const isNumeric = "isNumeric";
const layout = "layout";
const color = "color";
const min = "min";
const max = "max";
const step = "step";
const showRange = "showRange";
const showValueSide = "showValueSide";
const precision = "precision";
const type = "type"
const value = "value";

const FIELDS_PROPS = {
  [FORM_FIELDS_TYPE.DROPDOWN]: {value, type,name, label, placeholder, options, required },
  [FORM_FIELDS_TYPE.MULTI_DROPDOWN]: {value, type,name, label, placeholder, options, required },
  [FORM_FIELDS_TYPE.EMAIL]: {value, type,name, label, required, placeholder},
  [FORM_FIELDS_TYPE.PASSWORD]: {value, type,name, label, placeholder, required},
  [FORM_FIELDS_TYPE.MOBILE]: {value, type,name, label, placeholder, required, code, },
  [FORM_FIELDS_TYPE.DATE]: {value, type,name, label, required, restrictionEndDate, restrictionStartDate, mode},
  [FORM_FIELDS_TYPE.TIME]: {value, type,label, name, required},
  [FORM_FIELDS_TYPE.ADDRESS]: {value, type,name, isAddressLine, isCity, isCountry, isHouse, isLandmark, isPostal, isState, isStreet, required, },
  [FORM_FIELDS_TYPE.TEXT]: {value, type,name, required, label, placeholder },
  [FORM_FIELDS_TYPE.TEXT_AREA]: {value, type,name, require, label, placeholder, minLength, maxLength, maxTextAreaHeight, showCharacterCount, showWordCount, disabled},
  [FORM_FIELDS_TYPE.JSON]: {value, type,name, required, label, placeholder, showCharacterCount, showWordCount, hideOnSave, isBorder},
  [FORM_FIELDS_TYPE.FILE]: {value, type,name, required, label, multiple, maxFiles, maxSizeMB, allowedTypes, height},
  [FORM_FIELDS_TYPE.AUDIO]: {value, type,name, required, height, label, maxSizeMB, allowedTypes, },
  [FORM_FIELDS_TYPE.VIDEO]: {value, type,name, required, label, height, maxSizeMB, allowedTypes, preview},
  [FORM_FIELDS_TYPE.IMAGE]: {value, type,name, required, label, height, maxSizeMB, allowedTypes, requireSquare, previewBorderRadius},
  [FORM_FIELDS_TYPE.SECURTY_QUESTION]: {value, type,name, required, options, placeholder, },
  [FORM_FIELDS_TYPE.OTP]: {value, type,name, required, length, verifcationEndpoint, userId, isNumeric},
  [FORM_FIELDS_TYPE.CHECKBOX]: {value, type,name, required, options, layout, label, disabled},
  [FORM_FIELDS_TYPE.COLOR]: {value, type,color, name, required},
  [FORM_FIELDS_TYPE.RADIO]: {value, type,name, required, options, layout, label, disabled},
  [FORM_FIELDS_TYPE.SEARCH]: {value, type,name, required, placeholder, options},
  [FORM_FIELDS_TYPE.SWITCH]: {value, type,name, required, label, disabled, },
  [FORM_FIELDS_TYPE.SLIDER]: {value, type,name, required, label, min, max, step, showRange, showValueSide, precision},
  [FORM_FIELDS_TYPE.STEPPER]: {value, type,name, required, label, min, max, step},
};

const FIELDS_PROPS_DT = {
  [name]: "string 0:20 A-Za-z",
  [label]: "string 0:20 A-Za-z0-9",
  [placeholder]: "string 0:50 printableChar",
  [options]: "list[string 0:100 printableChar] 0-100",
  [multiple]: "boolean",
  [required]: "boolean",
  [code]: "countryCode",
  [restrictionStartDate]: "DD-MM-YYYY",
  [restrictionEndDate]: "DD-MM-YYYY",
  [mode]: "enum (date, month, month-year, year)",
  [isHouse]: "boolean",
  [isStreet]: "boolean",
  [isCity]: "boolean",
  [isState]: "boolean",
  [isPostal]: "boolean",
  [isCountry]: "boolean",
  [isAddressLine]: "boolean",
  [isLandmark]: "boolean",
  [minLength]: "number",
  [maxLength]: "number",
  [maxTextAreaHeight]: "cssUnit",
  [showCharacterCount]: "boolean",
  [showWordCount]: "boolean",
  [disabled]: "boolean",
  [hideOnSave]: "boolean",
  [isBorder]: "boolean",
  [maxFiles]: "number",
  [allowedTypes]: "list[fileType]",
  [height]: "cssUnit",
  [maxSizeMB]: "number",
  [requireSquare]: "boolean",
  [previewBorderRadius]: "boolean",
  [preview]: "boolean",
  [verifcationEndpoint]: "link",
  [userId]: "string 0:50 printableChar",
  [isNumeric]: "boolean",
  [layout]: "enum(horizontal, vertical)",
  [color]: "cssHexColorCode",
  [min]: "number",
  [max]: "number",
  [step]: "number",
  [showRange]: "boolean",
  [showValueSide]: "boolean",
  [precision]: "number",
  [type]: "enum(FORM_FIELDS_TYPE)",
  [value]: "string 0:50 printableChar",
}

const FIELDS_PROPS_VALIDATOR = {
options, required, restrictionEndDate, restrictionStartDate, 
mode, isAddressLine, isCity, isCountry, isHouse, isLandmark, 
isPostal, isState, isStreet, minLength, maxLength, maxFiles, 
allowedTypes, maxSizeMB, requireSquare, isNumeric, min, max, 
}



const FIELDS_PROPS_validation = {
  [FORM_FIELDS_TYPE.DROPDOWN]: "list[options]",
  [FORM_FIELDS_TYPE.MULTI_DROPDOWN]: "list[options]",
  [FORM_FIELDS_TYPE.EMAIL]: "regex",
  [FORM_FIELDS_TYPE.PASSWORD]: "regex",
  [FORM_FIELDS_TYPE.MOBILE]: "regex",
  [FORM_FIELDS_TYPE.DATE]: "",
  [FORM_FIELDS_TYPE.TIME]: "",
  [FORM_FIELDS_TYPE.ADDRESS]: "",
  [FORM_FIELDS_TYPE.TEXT]: "",
  [FORM_FIELDS_TYPE.TEXT_AREA]: "",
  [FORM_FIELDS_TYPE.JSON]: "",
  [FORM_FIELDS_TYPE.FILE]: "",
  [FORM_FIELDS_TYPE.AUDIO]: "",
  [FORM_FIELDS_TYPE.VIDEO]: "",
  [FORM_FIELDS_TYPE.IMAGE]: "",
  [FORM_FIELDS_TYPE.SECURTY_QUESTION]: "",
  [FORM_FIELDS_TYPE.OTP]: "",
  [FORM_FIELDS_TYPE.CHECKBOX]: "",
  [FORM_FIELDS_TYPE.COLOR]: "",
  [FORM_FIELDS_TYPE.RADIO]: "",
  [FORM_FIELDS_TYPE.SEARCH]: "",
  [FORM_FIELDS_TYPE.SWITCH]: "",
  [FORM_FIELDS_TYPE.SLIDER]: "",
  [FORM_FIELDS_TYPE.STEPPER]: "",
};

/*

------------------

We are designing the dynamic forms, where user can create the form by simply drag & drop and the system will design the config-schema based on the user choice Above are the fields that our form builder supports and also the properties of those fields that can personalize by the user for that that field.  

*/