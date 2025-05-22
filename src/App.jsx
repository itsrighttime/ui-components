import "./App.css";
import "./export.js";
import { UseCommunicationExample } from "./Usecases/Input/UseCommunicationExample.jsx";

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
        <UseCommunicationExample />
      </div>
    </div>
  );
};

export default App;
