"use client";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import IconGallery from "./Usecases/Misc/IconGallery.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <IconGallery />
      </div>
    </BrowserRouter>
  );
};

export default App;
