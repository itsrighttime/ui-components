import {
  validateFormConfig,
  validateFormResponse,
} from "../validation/formValidation";

export const validateFormData = (formData, config) => {
  const errors = {};
  let isValid = true;

  console.log(formData, config);

  const configRe1 = validateFormConfig(config);
  const configRe2 = validateFormResponse(config, formData);

  console.log(configRe1, configRe2);

  // for (const [field, rules] of Object.entries(schema)) {
  //   console.log("DDDD ", field, rules);
  //   const result = rules.validator(formData[field]);
  //   if (result !== true) {
  //     isValid = false;
  //     errors[field] = result;
  //   }
  // }

  return { isValid, errors };
};

const formData = {
  textField: "dfdfs",
  textArea: "dfsdf",
  email: "fsdfsd",
  mobile: {
    code: "+91",
    number: "2636843",
  },
  password: "vdfbdfgf",
  date: "10-2025",
  time: "",
  address: {
    house: "dfgfg",
    street: "dfgdfg",
    city: "fgfdg",
    state: "fhfg",
    postal: "26532",
    country: "fgbfdbb",
    landmark: "fbfgbfgb",
    addressLine: "gbfbfgb",
  },
  dropdown: ["Option 1"],
  multiDropdown: ["B", "A"],
  checkbox: ["react", "vue"],
  radio: "male",
  switch: true,
  color: "#831b25",
  slider: 15,
  stepper: 20,
  search: "",
  json: "{}",
  file: [{}],
  audio: {},
  image: {},
  video: {},
  otp: "",
  securityQuestion: "",
  repeatableGroup: [
    {
      field1: "vfdfg",
    },
    {
      field1: "dfhfgh",
    },
  ],
};
