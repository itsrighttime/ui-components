import { FORM_FIELDS_TYPE } from "../helper/formFieldTypes.js";
import { validationEngine as engine } from "../ValidationEngine.js";

engine.register(FORM_FIELDS_TYPE.ADDRESS, {
  validateConfig: (field) => {
    const flags = [
      "isHouse",
      "isStreet",
      "isCity",
      "isState",
      "isPostal",
      "isCountry",
      "isLandmark",
      "isAddressLine",
    ];
    for (const f of flags) {
      if (field[f] !== undefined && typeof field[f] !== "boolean") {
        return { valid: false, error: `${f} must be boolean` };
      }
    }
    return { valid: true };
  },

  validateResponse: (field, value) => {
    if (typeof value !== "object" || value === null) {
      return { valid: false, error: "Address must be an object" };
    }

    const subFieldConfigs = [
      {
        key: "house",
        visible: field.isHouse,
        regex: /^[A-Za-z0-9\s,\/.\-]*$/,
        min: 1,
        max: 10,
        msg: "House must be letters, numbers, space, hyphen, dot, or slash",
      },
      {
        key: "street",
        visible: field.isStreet,
        regex: /^[A-Za-z0-9\s,]*$/,
        min: 1,
        max: 100,
        msg: "Street must be letters, numbers, spaces, or commas",
      },
      {
        key: "city",
        visible: field.isCity,
        regex: /^[A-Za-z0-9\s]*$/,
        min: 2,
        max: 50,
        msg: "City must be letters, numbers, and spaces",
      },
      {
        key: "state",
        visible: field.isState,
        regex: /^[A-Za-z\s]*$/,
        min: 2,
        max: 50,
        msg: "State must be letters and spaces",
      },
      {
        key: "postal",
        visible: field.isPostal,
        regex: /^[0-9]*$/,
        min: 4,
        max: 8,
        msg: "Postal code must be 4-8 digits",
      },
      {
        key: "country",
        visible: field.isCountry,
        regex: /^[A-Za-z\s]*$/,
        min: 2,
        max: 50,
        msg: "Country must be letters and spaces",
      },
      {
        key: "landmark",
        visible: field.isLandmark,
        regex: /^[A-Za-z0-9\s,]*$/,
        min: 2,
        max: 50,
        msg: "Landmark must be letters, numbers, spaces, or commas",
      },
      {
        key: "addressLine",
        visible: field.isAddressLine,
        regex: /^[A-Za-z0-9\s,]*$/,
        min: 2,
        max: 50,
        msg: "Address Line must be letters, numbers, spaces, or commas",
      },
    ];

    for (const sub of subFieldConfigs) {
      if (!sub.visible) continue; // skip hidden parts

      const val = value[sub.key];
      if (val == null || val === "") {
        return { valid: false, error: `${sub.key} is required` };
      }
      if (typeof val !== "string") {
        return { valid: false, error: `${sub.key} must be string` };
      }
      if (val.length < sub.min || val.length > sub.max) {
        return {
          valid: false,
          error: `${sub.key} length must be ${sub.min}-${sub.max}`,
        };
      }
      if (!sub.regex.test(val)) {
        return { valid: false, error: sub.msg };
      }
    }

    return { valid: true };
  },
});
