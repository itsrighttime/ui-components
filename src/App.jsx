"use client";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import IconGallery from "./Usecases/Misc/IconGallery.jsx";
import { ErrorPage } from "./SpecialPages/js/ErrorPage.jsx";
import { CardShowcase } from "./Usecases/Misc/CardGallery.jsx";
import { UseTimeLineExample } from "./Usecases/Misc/UseTimeLineExample.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <IconGallery />
        <ErrorPage
          statusDetail={
            "You are not my type that is why you are seeing this messaage"
          }
          responseCode={"DFRD895"}
        /> */}
        {/* <CardShowcase /> */}
        <UseTimeLineExample />
      </div>
    </BrowserRouter>
  );
};

export default App;
