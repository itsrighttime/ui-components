import { FORM_FIELDS_TYPE } from "../jsx/formFieldTypes";

export const buildValidationSchema = (fieldsConfig) => {
  const schema = {};

  fieldsConfig.forEach((field) => {
    const {
      name,
      key, // in your address config
      label,
      required,
      options,
      min,
      max,
      minLength,
      maxLength,
      pattern,
    } = field;
    console.log(
      "DDDD 1",
      name,
      key, // in your address config
      label,
      required,
      options,
      min,
      max,
      minLength,
      maxLength,
      pattern
    );

    const fieldKey = name || key; // support both naming styles

    switch (field.type) {
      case FORM_FIELDS_TYPE.EMAIL:
        schema[name] = {
          required,
          validator: (value) => {
            if (!value && required) return "Email is required";
            if (value && !/^\S+@\S+\.\S+$/.test(value))
              return "Invalid email format";
            return true;
          },
        };
        break;

      case FORM_FIELDS_TYPE.MOBILE:
        schema[name] = {
          required,
          validator: (value) => {
            if (!value && required) return "Mobile is required";
            if (value?.number && !/^\d{7,15}$/.test(value.number))
              return "Invalid mobile number";
            return true;
          },
        };
        break;

      case FORM_FIELDS_TYPE.PASSWORD:
        schema[name] = {
          required,
          validator: (value) => {
            if (!value && required) return "Password is required";
            if (value && value.length < (minLength || 6))
              return `Password must be at least ${minLength || 6} chars`;
            return true;
          },
        };
        break;

      case FORM_FIELDS_TYPE.TEXT:
      case FORM_FIELDS_TYPE.TEXT_AREA:
        schema[name] = {
          required,
          validator: (value) => {
            if (!value && required) return `${field.label} is required`;
            if (minLength && value?.length < minLength)
              return `Must be at least ${minLength} characters`;
            if (maxLength && value?.length > maxLength)
              return `Must be less than ${maxLength} characters`;
            if (pattern && !new RegExp(pattern).test(value))
              return `Invalid format`;
            return true;
          },
        };
        break;

      case FORM_FIELDS_TYPE.FILE:
      case FORM_FIELDS_TYPE.IMAGE:
      case FORM_FIELDS_TYPE.VIDEO:
      case FORM_FIELDS_TYPE.AUDIO:
        schema[name] = {
          required,
          validator: (files) => {
            if ((!files || files.length === 0) && required)
              return "File is required";
            if (
              allowedTypes &&
              files?.some((f) => !allowedTypes.includes(f.type))
            )
              return `Invalid file type, allowed: ${allowedTypes.join(", ")}`;
            if (
              maxSizeMB &&
              files?.some((f) => f.size > maxSizeMB * 1024 * 1024)
            )
              return `File too large, max ${maxSizeMB}MB allowed`;
            return true;
          },
        };
        break;

      /** ==================== DROPDOWN ==================== */
      case FORM_FIELDS_TYPE.DROPDOWN:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (!value && required) return `${label} is required`;
            if (value && !options?.includes(value))
              return `${label} must be one of ${options.join(", ")}`;
            return true;
          },
        };
        break;

      /** ==================== MULTI DROPDOWN ==================== */
      case FORM_FIELDS_TYPE.MULTI_DROPDOWN:
        schema[fieldKey] = {
          required,
          validator: (values) => {
            if ((!values || values.length === 0) && required)
              return `${label} is required`;
            if (values?.some((v) => !options?.includes(v)))
              return `Invalid selection in ${label}, allowed: ${options.join(
                ", "
              )}`;
            return true;
          },
        };
        break;

      /** ==================== DATE ==================== */
      case FORM_FIELDS_TYPE.DATE:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (!value && required) return "Date is required";

            // Match dd-mm-yyyy
            const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value || "");
            if (!match) return "Date must be in dd-mm-yyyy format";

            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10);
            const year = parseInt(match[3], 10);

            // Month check
            if (month < 1 || month > 12) return "Invalid month in date";

            // Days per month (handle leap year)
            const daysInMonth = new Date(year, month, 0).getDate();
            if (day < 1 || day > daysInMonth)
              return `Invalid day for month ${month}`;

            // Restriction check
            const dateObj = new Date(year, month - 1, day);
            if (
              field.restrictionStartDate &&
              dateObj < new Date(field.restrictionStartDate)
            )
              return `Date cannot be before ${field.restrictionStartDate}`;
            if (
              field.restrictionEndDate &&
              dateObj > new Date(field.restrictionEndDate)
            )
              return `Date cannot be after ${field.restrictionEndDate}`;

            return true;
          },
        };
        break;

      /** ==================== TIME ==================== */
      case FORM_FIELDS_TYPE.TIME:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (!value && required) return "Time is required";

            // Match hh:mm AM/PM
            const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/i.exec(value || "");
            if (!match) return "Time must be in hh:mm AM/PM format";

            let hour = parseInt(match[1], 10);
            const minute = parseInt(match[2], 10);
            const period = match[3].toUpperCase();

            if (hour < 1 || hour > 12) return "Hour must be between 1 and 12";
            if (minute < 0 || minute > 59)
              return "Minute must be between 00 and 59";

            // Convert to 24h if you want to apply start/end restriction
            let hour24 = hour % 12;
            if (period === "PM") hour24 += 12;

            const timeObj = new Date();
            timeObj.setHours(hour24, minute, 0, 0);

            return true;
          },
        };
        break;

      /** ==================== ADDRESS ==================== */
      case FORM_FIELDS_TYPE.ADDRESS:
        schema[fieldKey] = {
          required,
          validator: (addressObj) => {
            for (const subField of field.fieldConfigs || []) {
              if (!subField.visible) continue;
              const val = addressObj?.[subField.key];
              if (subField.minLength && val?.length < subField.minLength)
                return `${subField.label} must be at least ${subField.minLength} chars`;
              if (subField.maxLength && val?.length > subField.maxLength)
                return `${subField.label} must be less than ${subField.maxLength} chars`;
              if (subField.pattern && val && !subField.pattern.test(val))
                return `${subField.label} invalid: ${subField.errorMessage}`;
            }
            return true;
          },
        };
        break;

      /** ==================== SECURITY QUESTION ==================== */
      case FORM_FIELDS_TYPE.SECURTY_QUESTION:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (!value && required) return "Security question is required";
            if (value && !field.questions?.includes(value))
              return `Invalid security question selected`;
            return true;
          },
        };
        break;

      /** ==================== CHECKBOX ==================== */
      case FORM_FIELDS_TYPE.CHECKBOX:
        schema[fieldKey] = {
          required,
          validator: (values) => {
            if ((!values || values.length === 0) && required)
              return `${label} is required`;
            if (values?.some((v) => !field.options?.includes(v)))
              return `Invalid selection in ${label}, allowed: ${field.options.join(
                ", "
              )}`;
            return true;
          },
        };
        break;

      /** ==================== RADIO ==================== */
      case FORM_FIELDS_TYPE.RADIO:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (!value && required) return `${label} is required`;
            if (value && !field.options?.includes(value))
              return `Invalid selection for ${label}`;
            return true;
          },
        };
        break;

      /** ==================== COLOR ==================== */
      case FORM_FIELDS_TYPE.COLOR:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (!value && required) return "Color is required";
            if (value && !/^#([0-9A-Fa-f]{6})$/.test(value))
              return "Color must be a valid hex code (e.g. #aabbcc)";
            return true;
          },
        };
        break;

      /** ==================== SWITCH ==================== */
      case FORM_FIELDS_TYPE.SWITCH:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (required && value === undefined) return `${label} is required`;
            if (typeof value !== "boolean")
              return `${label} must be true or false`;
            return true;
          },
        };
        break;

      /** ==================== SLIDER ==================== */
      case FORM_FIELDS_TYPE.SLIDER:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (value === undefined && required) return `${label} is required`;
            if (typeof value !== "number") return `${label} must be a number`;
            if (value < min || value > max)
              return `${label} must be between ${min} and ${max}`;
            return true;
          },
        };
        break;

      /** ==================== STEPPER ==================== */
      case FORM_FIELDS_TYPE.STEPPER:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (value === undefined && required) return `${label} is required`;
            if (typeof value !== "number") return `${label} must be a number`;
            if (value < min || value > max)
              return `${label} must be between ${min} and ${max}`;
            return true;
          },
        };
        break;

      default:
        schema[fieldKey] = {
          required,
          validator: (value) => {
            if (!value && required) return `${label} is required`;
            return true;
          },
        };
    }
  });

  return schema;
};
