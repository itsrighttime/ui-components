import { FORM_FIELDS_TYPE } from "../jsx/formFieldTypes";

const checkboxOptions = [
    { label: "React", value: "react", help: "Most used" },
    { label: "Vue", value: "vue", help: "Gaining popularity" },
    {
      label: "Angular",
      value: "angular",
      disabled: true,
      help: "Not preferred",
    },
  ];

   const radioOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    {
      label: "Other",
      value: "other",
      disabled: true,
      help: "Currently unavailable",
    },
  ];

export const configData07 = {
  title: "All Fields Test Form",
  description: "Test form including all field types for quick validation",
  mode: "single",
  fields: [
    { name: "textField", type: FORM_FIELDS_TYPE.TEXT, label: "Text Field", placeholder: "Enter text" },
    { name: "textArea", type: FORM_FIELDS_TYPE.TEXT_AREA, label: "Text Area", placeholder: "Enter more text" },
    { name: "email", type: FORM_FIELDS_TYPE.EMAIL, label: "Email Address", placeholder: "Enter email" },
    { name: "mobile", type: FORM_FIELDS_TYPE.MOBILE, label: "Mobile Number" },
    { name: "password", type: FORM_FIELDS_TYPE.PASSWORD, label: "Password" },
    { name: "date", type: FORM_FIELDS_TYPE.DATE, label: "Date Picker" },
    { name: "time", type: FORM_FIELDS_TYPE.TIME, label: "Time Picker" },
    { name: "address", type: FORM_FIELDS_TYPE.ADDRESS, label: "Address", isHouse: true, isStreet: true, isCity: true, isState: true, isPostal: true, isCountry: true, isLandmark: true },
    { name: "dropdown", type: FORM_FIELDS_TYPE.DROPDOWN, label: "Dropdown", options: ["Option 1", "Option 2"] },
    { name: "multiDropdown", type: FORM_FIELDS_TYPE.MULTI_DROPDOWN, label: "Multi Dropdown", options: ["A", "B", "C"] },
    { name: "checkbox", type: FORM_FIELDS_TYPE.CHECKBOX, label: "Checkbox Group", options: checkboxOptions },
    { name: "radio", type: FORM_FIELDS_TYPE.RADIO, label: "Radio Group", options: radioOptions },
    { name: "switch", type: FORM_FIELDS_TYPE.SWITCH, label: "Switch Field", initialValue: true },
    { name: "color", type: FORM_FIELDS_TYPE.COLOR, label: "Color Picker" },
    { name: "slider", type: FORM_FIELDS_TYPE.SLIDER, label: "Slider", min: 0, max: 100, step: 5 },
    { name: "search", type: FORM_FIELDS_TYPE.SEARCH, label: "Search Box", suggestions: ["Apple", "Banana", "Orange"] },
    { name: "json", type: FORM_FIELDS_TYPE.JSON, label: "JSON Field" },
    { name: "file", type: FORM_FIELDS_TYPE.FILE, label: "File Upload", multiple: true, maxFiles: 3, maxSize: 2 * 1024 * 1024, allowedTypes: ["application/pdf"] },
    { name: "audio", type: FORM_FIELDS_TYPE.AUDIO, label: "Audio Upload", maxSizeMB: 50 },
    { name: "image", type: FORM_FIELDS_TYPE.IMAGE, label: "Image Upload", maxSizeMB: 5, requireSquare: false },
    { name: "video", type: FORM_FIELDS_TYPE.VIDEO, label: "Video Upload", maxSizeMB: 100, preview: true },
    { name: "otp", type: FORM_FIELDS_TYPE.OTP, label: "OTP Field", length: 6 },
    { name: "securityQuestion", type: FORM_FIELDS_TYPE.SECURTY_QUESTION, label: "Security Question" },
    { name: "repeatableGroup", type: FORM_FIELDS_TYPE.TEXT_AREA, label: "Repeatable Example", repeatable: true, fields: [{ name: "field1", type: FORM_FIELDS_TYPE.TEXT, label: "Inner Field" }] }
  ],
};
