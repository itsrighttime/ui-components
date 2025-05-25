import "./App.css";
import "./export.js";
import { Navigator } from "./Layout/Workspace/jsx/Navigator.jsx";

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
        <Navigator
          tabs={{
            left: [{ key: "home", value: "Home" }, { key: "home1", value: "Home3" }, { key: "home2", value: "Home2" }],
            mid: [{ key: "about", value: "About" }, { key: "about1", value: "About1" }, { key: "about2", value: "About2" }],
            right: [{ key: "contact", value: "Contact" }, { key: "contact1", value: "Contact1" }, { key: "contact2", value: "Contact2" }],
          }}
        />
      </div>
    </div>
  );
};

export default App;
