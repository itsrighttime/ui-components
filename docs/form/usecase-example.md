```js
import { FORM_FIELDS_TYPE } from "../jsx/formFieldTypes";

export const configData01 = {
  title: "Complete User Form",
  description: "A single-step form including all field types",
  mode: "single",
  settings: {
    showLabelAlways: true,
    color: "var(--colorCyan)",
    gap: "2rem",
  },
  fields: [
    {
      name: "fullName",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      min: 3,
      max: 50,
    },
    {
      name: "email",
      type: FORM_FIELDS_TYPE.EMAIL,
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      type: FORM_FIELDS_TYPE.PASSWORD,
      label: "Password",
      placeholder: "Enter a secure password",
      required: true,
      min: 8,
    },
    {
      name: "mobile",
      type: FORM_FIELDS_TYPE.MOBILE,
      label: "Mobile Number",
      required: true,
    },
    {
      name: "birthDate",
      type: FORM_FIELDS_TYPE.DATE,
      label: "Date of Birth",
      required: true,
    },
    {
      name: "appointmentTime",
      type: FORM_FIELDS_TYPE.TIME,
      label: "Preferred Appointment Time",
    },
    {
      name: "address",
      type: FORM_FIELDS_TYPE.ADDRESS,
      label: "Residential Address",
      isHouse: true,
      isStreet: true,
      isCity: true,
      isState: true,
      isPostal: true,
      isCountry: true,
      isLandmark: true,
    },
    {
      name: "gender",
      type: FORM_FIELDS_TYPE.DROPDOWN,
      label: "Gender",
      options: ["Male", "Female", "Other"],
    },
    {
      name: "hobbies",
      type: FORM_FIELDS_TYPE.MULTI_DROPDOWN,
      label: "Hobbies",
      options: ["Reading", "Traveling", "Gaming", "Music"],
    },
    {
      name: "bio",
      type: FORM_FIELDS_TYPE.TEXT_AREA,
      label: "Short Bio",
      placeholder: "Tell us about yourself",
      minLength: 10,
      maxLength: 500,
      showCharacterCount: true,
    },
    {
      name: "education",
      type: FORM_FIELDS_TYPE.TEXT_AREA,
      label: "Education Details (Repeatable)",
      repeatable: true,
      moreLabel: "Add Other Degree",
      fields: [
        {
          name: "degree",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Degree",
          placeholder: "Enter degree",
        },
        {
          name: "year",
          type: FORM_FIELDS_TYPE.DATE,
          label: "Year of Passing",
        },
      ],
    },
    {
      name: "resume",
      type: FORM_FIELDS_TYPE.FILE,
      label: "Upload Resume / Documents",
      multiple: true,
      maxFiles: 5,
      maxSize: 2 * 1024 * 1024, // 2MB
      allowedTypes: ["application/pdf", "image/jpeg", "image/png"],
    },
  ],
};
```

```js
export const configData02 = {
  title: "Conditional Fields Example",
  description: "Form with conditional field rendering",
  mode: "single",
  settings: {
    showLabelAlways: true,
    color: "var(--colorBlue)",
    gap: "2rem",
  },
  fields: [
    {
      name: "employmentStatus",
      type: FORM_FIELDS_TYPE.DROPDOWN,
      label: "Employment Status",
      required: true,
      options: ["Student", "Employed", "Self-Employed", "Unemployed"],
    },
    {
      name: "companyName",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Company Name",
      placeholder: "Enter your company",
      conditional: {
        dependsOn: "employmentStatus",
        operator: OPERATORS.in,
        value: ["Employed", "Self-Employed"], // only visible if employed or self-employed
      },
    },
    {
      name: "studentId",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Student ID",
      placeholder: "Enter student ID",
      conditional: {
        dependsOn: "employmentStatus",
        operator: OPERATORS.in,
        value: ["Student"], // only visible if student
      },
    },
    {
      name: "portfolio",
      type: FORM_FIELDS_TYPE.FILE,
      label: "Upload Portfolio",
      multiple: false,
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ["application/pdf"],
      conditional: {
        dependsOn: "employmentStatus",
        operator: OPERATORS.in,
        value: ["Self-Employed"], // only visible if self-employed
      },
    },
    {
      name: "newsletterOptIn",
      type: FORM_FIELDS_TYPE.DROPDOWN,
      label: "Subscribe to Newsletter?",
      required: true,
      options: ["Yes", "No"],
    },
    {
      name: "email",
      type: FORM_FIELDS_TYPE.EMAIL,
      label: "Email Address",
      placeholder: "Enter your email",
      conditional: {
        dependsOn: "newsletterOptIn",
        operator: OPERATORS.in,
        value: ["Yes"], // only show email if user opts in
      },
    },
    {
      name: "resume",
      type: FORM_FIELDS_TYPE.FILE,
      label: "Upload Resume / Documents",
      multiple: true,
      maxFiles: 1,
      maxSize: 2 * 1024 * 1024, // 2MB
      allowedTypes: ["application/pdf", "image/jpeg", "image/png"],
    },
  ],
};
```

```js
import { FORM_FIELDS_TYPE } from "../jsx/formFieldTypes";
import { OPERATORS } from "../jsx/operators";

export const configData03 = {
  title: "Advanced Conditional Operators Example",
  description: "Form testing all conditional operators",
  mode: "single",
  settings: {
    showLabelAlways: true,
    color: "var(--colorGreen)",
    gap: "2rem",
  },
  fields: [
    // Base dropdown to control conditionals
    {
      name: "userType",
      type: FORM_FIELDS_TYPE.DROPDOWN,
      label: "User Type",
      required: true,
      options: ["Guest", "Basic", "Premium", "VIP"],
    },

    // IN operator
    {
      name: "discountCode",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Discount Code",
      placeholder: "Enter discount code",
      conditional: {
        dependsOn: "userType",
        operator: OPERATORS.in,
        value: ["Premium", "VIP"], // show if Premium or VIP
      },
    },

    // NOT IN operator
    {
      name: "restrictedNote",
      type: FORM_FIELDS_TYPE.TEXT_AREA,
      label: "Restricted Notes",
      placeholder: "Visible if NOT guest",
      conditional: {
        dependsOn: "userType",
        operator: OPERATORS.notIn,
        value: ["Guest"],
      },
    },

    // EQUALS operator
    {
      name: "basicEmail",
      type: FORM_FIELDS_TYPE.EMAIL,
      label: "Basic User Email",
      placeholder: "Email Only for basic users",
      conditional: {
        dependsOn: "userType",
        operator: OPERATORS.equals,
        value: ["Basic"],
      },
    },

    // NOT EQUALS operator
    {
      name: "vipCode",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "VIP Secret Code",
      placeholder: "Hidden if userType is VIP",
      conditional: {
        dependsOn: "userType",
        operator: OPERATORS.notEquals,
        value: ["VIP"],
      },
    },

    // Score input for numeric checks
    {
      name: "score",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Game Score",
      placeholder: "Enter your score",
    },

    // GREATER THAN OR EQUAL (gte)
    {
      name: "highScoreBonus",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "High Score Bonus",
      placeholder: "Visible if score >= 80",
      conditional: {
        dependsOn: "score",
        operator: OPERATORS.gte,
        value: [80],
      },
    },

    // LESS THAN (lt)
    {
      name: "lowScoreAdvice",
      type: FORM_FIELDS_TYPE.TEXT_AREA,
      label: "Advice for Low Scores",
      placeholder: "Visible if score < 50",
      conditional: {
        dependsOn: "score",
        operator: OPERATORS.lt,
        value: [50],
      },
    },

    // Multi-dropdown for contains tests
    {
      name: "hobbies",
      type: FORM_FIELDS_TYPE.MULTI_DROPDOWN,
      label: "Hobbies",
      options: ["Reading", "Traveling", "Gaming", "Other"],
    },

    // CONTAINS operator
    {
      name: "otherHobby",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Other Hobby",
      placeholder: "Specify your other hobby",
      conditional: {
        dependsOn: "hobbies",
        operator: OPERATORS.contains,
        value: ["Other"],
      },
    },

    // NOT CONTAINS operator
    {
      name: "noTravelNote",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Note (if not traveling)",
      placeholder: "Visible if Traveling is not selected",
      conditional: {
        dependsOn: "hobbies",
        operator: OPERATORS.notContains,
        value: ["Traveling"],
      },
    },
  ],
};
```

```js
import { FORM_FIELDS_TYPE } from "../jsx/formFieldTypes";
import { OPERATORS } from "../jsx/operators";

export const configData04 = {
  title: "Cross Field Conditional Example",
  description: "Testing conditionals on non-dropdown fields",
  mode: "single",
  settings: {
    showLabelAlways: true,
    color: "var(--colorOrange)",
    gap: "2rem",
  },
  fields: [
    // TEXT field controlling another field
    {
      name: "country",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Country",
      placeholder: "Enter your country",
    },
    {
      name: "state",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "State / Province",
      placeholder: "Shown only if country is India",
      conditional: {
        dependsOn: "country",
        operator: OPERATORS.equals,
        value: ["India"],
      },
    },

    // EMAIL controlling another field
    {
      name: "email",
      type: FORM_FIELDS_TYPE.EMAIL,
      label: "Email Address",
      placeholder: "Enter your email",
    },
    {
      name: "companyDomain",
      type: FORM_FIELDS_TYPE.TEXT,
      label: "Company Domain",
      placeholder: "Visible if email ends with @company.com",
      conditional: {
        dependsOn: "email",
        operator: OPERATORS.contains,
        value: ["@company.com"],
      },
    },

    // FILE controlling another field
    {
      name: "resume",
      type: FORM_FIELDS_TYPE.FILE,
      label: "Upload Resume",
      multiple: false,
      maxFiles: 1,
      maxSize: 2 * 1024 * 1024, // 2MB
      allowedTypes: ["application/pdf"],
    },
    {
      name: "resumeNote",
      type: FORM_FIELDS_TYPE.TEXT_AREA,
      label: "Resume Note",
      placeholder: "This appears only if resume is uploaded",
      conditional: {
        dependsOn: "resume",
        operator: OPERATORS.notEquals,
        value: [""], // not empty means file uploaded
      },
    },
  ],
};
```

```js
import { FORM_FIELDS_TYPE } from "../jsx/formFieldTypes";
import { OPERATORS } from "../jsx/operators";

export const configData05 = {
  title: "Multi-Step Conditional Example",
  description: "Testing conditions across steps",
  mode: "multi",
  settings: {
    showLabelAlways: true,
    color: "var(--colorGreen)",
    gap: "2rem",
  },
  steps: [
    {
      title: "Step 1: Basic Info",
      fields: [
        {
          name: "employmentStatus",
          type: FORM_FIELDS_TYPE.DROPDOWN,
          label: "Employment Status",
          required: true,
          options: ["Student", "Employed", "Self-Employed", "Unemployed"],
        },
        {
          name: "country",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Country",
          placeholder: "Enter your country",
        },
      ],
    },
    {
      title: "Step 2: Conditional Fields",
      fields: [
        {
          name: "companyName",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Company Name",
          placeholder: "Enter your company",
          conditional: {
            dependsOn: "employmentStatus",
            operator: OPERATORS.in,
            value: ["Employed", "Self-Employed"],
          },
        },
        {
          name: "studentId",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Student ID",
          placeholder: "Enter student ID",
          conditional: {
            dependsOn: "employmentStatus",
            operator: OPERATORS.equals,
            value: ["Student"],
          },
        },
        {
          name: "state",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "State / Province",
          placeholder: "Shown only if country is India",
          conditional: {
            dependsOn: "country",
            operator: OPERATORS.equals,
            value: ["India"],
          },
        },
      ],
    },
    {
      title: "Step 3: Communication",
      fields: [
        {
          name: "newsletterOptIn",
          type: FORM_FIELDS_TYPE.DROPDOWN,
          label: "Subscribe to Newsletter?",
          required: true,
          options: ["Yes", "No"],
        },
        {
          name: "email",
          type: FORM_FIELDS_TYPE.EMAIL,
          label: "Email Address",
          placeholder: "Enter your email",
          conditional: {
            dependsOn: "newsletterOptIn",
            operator: OPERATORS.equals,
            value: ["Yes"],
          },
        },
        {
          name: "companyDomain",
          type: FORM_FIELDS_TYPE.TEXT,
          label: "Company Domain",
          placeholder: "Visible if email ends with @company.com",
          conditional: {
            dependsOn: "email",
            operator: OPERATORS.contains,
            value: ["@company.com"],
          },
        },
      ],
    },
    {
      title: "Step 4: Documents",
      fields: [
        {
          name: "resume",
          type: FORM_FIELDS_TYPE.FILE,
          label: "Upload Resume",
          multiple: false,
          maxFiles: 1,
          maxSize: 2 * 1024 * 1024,
          allowedTypes: ["application/pdf"],
        },
        {
          name: "resumeNote",
          type: FORM_FIELDS_TYPE.TEXT_AREA,
          label: "Resume Note",
          placeholder: "This appears only if resume is uploaded",
          conditional: {
            dependsOn: "resume",
            operator: OPERATORS.notEquals,
            value: [""],
          },
        },
      ],
    },
  ],
};
```
