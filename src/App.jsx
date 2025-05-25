// import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./export.js";
import { UsePagesExample } from "./Usecases/Misc/UsePagesExample.jsx";
import IconGallery from "./Usecases/Misc/IconGallery.jsx";
import { UseContainerExample } from "./Usecases/Misc/UseContainerExample.jsx";

const App = () => {
  return (
    <div className="App">
      <div
        style={{
          border: "1px solid red",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          height: "100vh",
        }}
      >
        {/* <Router> */}
          <UseContainerExample />
        {/* </Router> */}
      </div>
    </div>
  );
};

export default App;
