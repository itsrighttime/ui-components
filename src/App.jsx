import "./App.css";
import "./export.js";
import { UseActionExample } from "./Usecases/Input/UseActionExample.jsx";

const App = () => {
  return (
    <div className="App">
      <div
        style={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          height: "100vh",
        }}
      >
        <UseActionExample />
      </div>
    </div>
  );
};

export default App;
