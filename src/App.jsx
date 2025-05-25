import "./App.css";
import "./export.js";
import { UseLayoutExample } from "./Usecases/Misc/UseLayoutExample.jsx";

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
        <UseLayoutExample />
      </div>
    </div>
  );
};

export default App;
