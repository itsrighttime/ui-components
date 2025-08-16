import { useState } from "react";
import "./App.css";
import "./export.js";
import IconGallery from "./Usecases/Misc/IconGallery.jsx";
import { UseLayoutExample } from "./Usecases/Misc/UseLayoutExample.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "./Auth/js/LoginForm.jsx";

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
          <LoginForm />
          {/* <IconGallery /> */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
