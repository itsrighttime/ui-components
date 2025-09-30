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
import { FORM_FIELDS_TYPE } from "./Layout/Forms/jsx/formFieldTypes.js";
import { configData01 } from "./Layout/Forms/helper/data-01.js";

const logo = getProductLogo("");

// const formConfig = {
//   title: "Job Application",
//   description: "Fill out your details to apply",
//   mode: "multi",

//   steps: [
//     {
//       title: "Step 1: Personal Info",
//       fields: [
//         {
//           name: "fullName",
//           type: FORM_FIELDS_TYPE.TEXT,
//           label: "Full Name",
//           required: true,
//           min: 3,
//           max: 50,
//         },
//         {
//           name: "email",
//           type: FORM_FIELDS_TYPE.EMAIL,
//           label: "Email",
//           required: true,
//         },
//         {
//           name: "portfolio",
//           type: FORM_FIELDS_TYPE.TEXT,
//           label: "Portfolio URL",
//           conditional: {
//             dependsOn: "role",
//             operator: "eq",
//             value: "designer",
//           },
//         },
//       ],
//     },
//     {
//       title: "Step 2: Education",
//       fields: [
//         {
//           name: "education",
//           label: "Education Details",
//           repeatable: true,
//           fields: [
//             { name: "degree", type: "text", label: "Degree" },
//             { name: "institute", type: "text", label: "Institute" },
//             { name: "year", type: "date", label: "Year of Passing" },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Step 3: Uploads",
//       fields: [
//         {
//           name: "resume",
//           type: FORM_FIELDS_TYPE.TEXT,
//           label: "Upload Resume",
//           required: true,
//           allowedTypes: ["application/pdf"],
//           maxSize: 2 * 1024 * 1024,
//         },
//       ],
//     },
//   ],
// };

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

        <GenericForm
          config={configData01}
          onSubmit={(value) => {
            console.log("Submited", value);
          }} // Your custom submission logic
          submitLabel="Create User"
          // settings={{ showLabelAlways: true }}
        />

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

        {/* <WebStructure brandHeader={{ tabs, logoURL: logo }}>
          <IconGallery />
        </WebStructure> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
