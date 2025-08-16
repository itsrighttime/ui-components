import { useState } from "react";
import "./App.css";
import "./export.js";
import IconGallery from "./Usecases/Misc/IconGallery.jsx";
import { UseLayoutExample } from "./Usecases/Misc/UseLayoutExample.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "./Auth/js/LoginForm.jsx";
import { Header } from "./Layout/Header/jsx/Header.jsx";
import { getProductLogo } from "./assets/productsLogo/productLogo.assets.js";

const logo = getProductLogo();

const App = () => {
  const [count, setCount] = useState();
  return (
    <BrowserRouter>
      <div className="App">
        <div
          style={{
            // border: "1px solid red",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            height: "100vh",
          }}
        >
          {/* <UseLayoutExample /> */}
          {/* <LoginForm /> */}
          {/* <IconGallery /> */}

          <Header
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
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
