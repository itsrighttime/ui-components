import "./App.css";
import "./export.js";
import { UseSelectorExample } from "./Usecases/Input/UseSelectorExample.jsx";

const App = () => {
  return (
    <div className="App">
      <div
        style={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <UseSelectorExample />
      </div>
    </div>
  );
};

export default App;
