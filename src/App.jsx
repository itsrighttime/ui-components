import "./App.css";
import "./export.js";
import { UseUploadExample } from "./Usecases/Input/UseUploadExample.jsx";

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
        <UseUploadExample />
      </div>
    </div>
  );
};

export default App;
