import React from "react";
import "./App.css";
import "./export.js";
import Tooltip from "./ExtraThings/js/Tooltip.jsx";

const App = () => {
  return (
    <div className="App">
      <div
        style={{
          border: "1px solid red",
          // height: "100vh",
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Tooltip content="Dansiahn">
          <button>Hover me</button>
        </Tooltip>
      </div>
    </div>
  );
};

export default App;
