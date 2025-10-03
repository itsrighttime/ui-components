import { FORM_FIELDS_TYPE } from "../jsx/formFieldTypes";

const checkboxOptions = [
  { label: "React", value: "react", help: "Most used" },
  { label: "Vue", value: "vue", help: "Gaining popularity" },
  { label: "Angular", value: "angular", disabled: true, help: "Not preferred" },
];

const radioOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other", disabled: true, help: "Currently unavailable" },
];

export const configData07 = {
  title: "All Fields Test Form",
  description: "Test form including all field types for quick validation",
  mode: "single",
  fields: [
    { name: "textField", type: FORM_FIELDS_TYPE.TEXT, label: "Text Field", placeholder: "Enter text", required: true, minLength: 2, maxLength: 20 },
    { name: "textArea", type: FORM_FIELDS_TYPE.TEXT_AREA, label: "Text Area", placeholder: "Enter more text", required: false, minLength: 5, maxLength: 200  },
    { name: "email", type: FORM_FIELDS_TYPE.EMAIL, label: "Email Address", placeholder: "Enter email", required: true },
    { name: "mobile", type: FORM_FIELDS_TYPE.MOBILE, label: "Mobile Number", code: "+91", required: true },
    { name: "password", type: FORM_FIELDS_TYPE.PASSWORD, label: "Password", required: true, minLength: 6 },
    { name: "date", type: FORM_FIELDS_TYPE.DATE, label: "Date Picker", mode: "month-year", required: true, restrictionStartDate: "01-01-2020", restrictionEndDate: "31-12-2030" },
    { name: "time", type: FORM_FIELDS_TYPE.TIME, label: "Time Picker", required: true },
    { name: "address", type: FORM_FIELDS_TYPE.ADDRESS, label: "Address", required: true, isHouse: true, isStreet: true, isCity: true, isState: true, isPostal: true, isCountry: true, isLandmark: true },
    { name: "dropdown", type: FORM_FIELDS_TYPE.DROPDOWN, label: "Dropdown", required: true, options: ["Option 1", "Option 2"] },
    { name: "multiDropdown", type: FORM_FIELDS_TYPE.MULTI_DROPDOWN, label: "Multi Dropdown", options: ["A", "B", "C"]},
    { name: "checkbox", type: FORM_FIELDS_TYPE.CHECKBOX, label: "Checkbox Group", options: checkboxOptions, required: false },
    { name: "radio", type: FORM_FIELDS_TYPE.RADIO, label: "Radio Group", options: radioOptions, required: true },
    { name: "switch", type: FORM_FIELDS_TYPE.SWITCH, label: "Switch Field", required: false},
    { name: "color", type: FORM_FIELDS_TYPE.COLOR, label: "Color Picker", required: false },
    { name: "slider", type: FORM_FIELDS_TYPE.SLIDER, label: "Slider", min: 0, max: 100, step: 5, required: true},
    { name: "stepper", type: FORM_FIELDS_TYPE.STEPPER, label: "Stepper", min: 0, max: 10, step: 1, required: true},
    { name: "search", type: FORM_FIELDS_TYPE.SEARCH, label: "Search Box", options: ["Apple", "Banana", "Orange"], required: false },
    { name: "json", type: FORM_FIELDS_TYPE.JSON, label: "JSON Field", required: false  },
    { name: "file", type: FORM_FIELDS_TYPE.FILE, label: "File Upload", multiple: true, maxFiles: 3, maxSizeMB: 20, allowedTypes: ["application/pdf"], required: false },
    { name: "audio", type: FORM_FIELDS_TYPE.AUDIO, label: "Audio Upload", maxSizeMB: 50, required: false },
    { name: "image", type: FORM_FIELDS_TYPE.IMAGE, label: "Image Upload", maxSizeMB: 5, requireSquare: false, required: false },
    { name: "video", type: FORM_FIELDS_TYPE.VIDEO, label: "Video Upload", maxSizeMB: 100, preview: true, required: false },
    { name: "otp", type: FORM_FIELDS_TYPE.OTP, label: "OTP Field", length: 6, isNumeric: true, required: true },
    { name: "securityQuestion", type: FORM_FIELDS_TYPE.SECURTY_QUESTION, label: "Security Question", options: ["Que1", "Que2", "Que3"], required: true },
    { name: "repeatableGroup", label: "Repeatable Example", repeatable: true, fields: [{ name: "field1", type: FORM_FIELDS_TYPE.TEXT, label: "Inner Field" }] }
  ],
};
