"use client";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import IconGallery from "./Usecases/Misc/IconGallery.jsx";
import { ErrorPage } from "./SpecialPages/js/ErrorPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <IconGallery />
        <ErrorPage
          statusDetail={
            "You are not my type that is why you are seeing this messaage"
          }
          responseCode={"DFRD895"}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
