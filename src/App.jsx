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

import { configData06 } from "./Layout/Forms/helper/data-06.js";
import { configData05 } from "./Layout/Forms/helper/data-05.js";
import { configData01 } from "./Layout/Forms/helper/data-01.js";
import { configData07 } from "./Layout/Forms/helper/data-07.js";

const logo = getProductLogo("");

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
          config={configData05}
          onSubmit={(value) => {
            console.log("Submited", value);
          }} // Your custom submission logic
          submitLabel="Create User"
          settings={{
            // showLabelAlways: true,
            color: "var(--colorDarkBlue)",
            width: "550px",
            gap: "3rem",
          }}
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
