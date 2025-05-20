import "./App.css";
import "./export.js";
import UseAlertsExample from "./Usecases/Misc/UseAlertsExample.jsx";

const App = () => {
  return (
    <div className="App">
      <div
        style={{
          border: "1px solid red",
          // height: "100vh",
          display: "flex",
          // justifyContent: "end",
          alignItems: "end",
        }}
      >
        <UseAlertsExample />
      </div>
    </div>
  );
};

export default App;
