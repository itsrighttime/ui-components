import "./App.css";
import "./export.js";
import { UseDateTimeExample } from "./Usecases/Input/UseDateTimeExample.jsx";

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
        <UseDateTimeExample />
      </div>
    </div>
  );
};

export default App;
