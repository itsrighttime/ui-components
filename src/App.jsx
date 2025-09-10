import { useState } from "react";
import "./App.css";
import "./export.js";
import IconGallery from "./Usecases/Misc/IconGallery.jsx";
import { UseLayoutExample } from "./Usecases/Misc/UseLayoutExample.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./Auth/js/LoginForm.jsx";
import { Header } from "./Layout/Header/jsx/Header.jsx";
import { getProductLogo } from "./assets/productsLogo/productLogo.assets.js";
import { GenericForm } from "./Layout/Forms/jsx/GenericForm.jsx";
import { WebStructure } from "./Layout/WebStructure/jsx/WebStructure.jsx";

const logo = getProductLogo("");

const formConfig = {
  title: "Create New User", // Title of the form
  description: "Please fill in the details below to create a new user.",

  fields: [
    {
      name: "name", // Field name (key in the formData)
      label: "Full Name", // Field label displayed next to the input
      type: "text", // Input type (text, email, etc.)
      required: true, // Make this field mandatory
      placeholder: "Enter your full name", // Placeholder text for the input
    },
    {
      name: "namea", // Field name (key in the formData)
      label: "Full Name", // Field label displayed next to the input
      type: "textArea", // Input type (text, email, etc.)
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

const App = () => {
  const [count, setCount] = useState();

  const tabs = [
    {
      name: "Home",
      goTo: "/",
    },
    {
      name: "Design Inspiration",
      goTo: "/design-showcase",
    },
    {
      name: "Services",
      goTo: "/services",
    },
    {
      name: "Industries",
      goTo: "/industries",
    },
    {
      name: "Portfolio",
      goTo: "/portfolio",
    },

    {
      name: "About",
      goTo: "/about",
    },
    {
      name: "Blog",
      goTo: "/blog",
    },
    {
      name: "Contact",
      goTo: "/contact",
    },
    {
      name: "Book a Consultation",
      goTo: "/book-consultation",
    },
  ];
  return (
    <BrowserRouter>
      <div className="App">
        {/* <div
          style={{
            // border: "1px solid red",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            height: "100vh",
          }}
        > */}

        {/* <UseLayoutExample /> */}
        {/* <LoginForm /> */}
        {/* <IconGallery /> */}

        {/* <GenericForm
          config={formConfig}
          onSubmit={(value) => {
            console.log("Submited", value);
          }} // Your custom submission logic
          submitLabel="Create User"
        /> */}

        {/* <Header
            tabs={[
              { name: "Home", goTo: "/" },
              { name: "About", goTo: "about" },
              { name: "Services", goTo: "services" },
              { name: "Login/Register", goTo: "login" },
            ]}
            logoURL={logo}
            defaultTab={{ name: "Home", goTo: "/" }}
            loginRegisterURL="/login"
            color="var(--colorCyan)"
          /> */}

        {/* </div> */}

        <WebStructure brandHeader={{ tabs, logoURL: logo }}>
          {/* <IconGallery /> */}
        </WebStructure>
      </div>
    </BrowserRouter>
  );
};

export default App;
