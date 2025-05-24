import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./export.js";
import { UsePagesExample } from "./Usecases/Misc/UsePagesExample.jsx";
import IconGallery from "./Usecases/Misc/IconGallery.jsx";

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
        <Router>
          <UsePagesExample />
        </Router>
      </div>
    </div>
  );
};

export default App;
