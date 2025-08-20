import { GenericForm } from "../../Layout/Forms/jsx/GenericForm";

const formConfig = {
  title: "Create New User", // Title of the form
  description: "Please fill in the details below to create a new user.",
  submitVariant: "primary", // Defines the styling of the submit button (can be primary, secondary, etc.)
  submitLabel: "Create User", // Text displayed on the submit button

  fields: [
    {
      name: "name", // Field name (key in the formData)
      label: "Full Name", // Field label displayed next to the input
      type: "text", // Input type (text, email, etc.)
      required: true, // Make this field mandatory
      placeholder: "Enter your full name", // Placeholder text for the input
    },

    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Enter your email address",
    },

    {
      name: "password",
      label: "Password",
      type: "password", // Password field
      required: true,
      placeholder: "Enter a secure password",
    },

    {
      name: "role",
      label: "User Role",
      type: "dropdown", // Single selection dropdown
      required: true,
      options: ["Admin", "Phase Head", "Operator"],
    },

    {
      name: "phases",
      label: "Assigned Phases",
      type: "multi-dropdown", // Multiple selection dropdown
      options: ["Phase 1", "Phase 2", "Phase 3"],
      defaultValue: ["Phase 1"], // Default value pre-selected
    },

    {
      name: "birthdate",
      label: "Date of Birth",
      type: "date", // Date picker input
      required: true,
      placeholder: "Select your birthdate",
      initialDate: "2000-01-01", // Initial default date
      restrictionStartDate: "1900-01-01", // Restrict start date
      restrictionEndDate: "2025-12-31", // Restrict end date
    },

    {
      name: "appointmentTime",
      label: "Appointment Time",
      type: "time", // Time picker input
      required: true,
    },

    {
      name: "phone",
      label: "Phone Number",
      type: "mobile", // Mobile number field
      required: true,
      placeholder: "Enter your phone number",
    },

    {
      name: "address",
      label: "Home Address",
      type: "address", // Custom Address input component
      isHouse: true,
      isStreet: true,
      isCity: true,
      isState: true,
      isPostal: true,
      isCountry: true,
      isAddressLine: true,
      isLandmark: false,
    },
  ],
};

export const UseFormExample = () => {
  return (
    <div className="App">
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <GenericForm
          config={formConfig}
          onSubmit={(value) => {
            console.log("Submited", value);
          }}
          submitLabel="Create User"
        />
      </div>
    </div>
  );
};
