import "./App.css";
import "./export.js";
import { UseDragAndDropExample } from "./Usecases/Misc/UseDragAndDropExample.jsx";

const App = () => {
  return (
    <div className="App">
      <div
        style={{
          border: "1px solid red",
          // height: "100vh",
          display: "flex",
          // justifyContent: "end",
          gap: "20px",
          alignItems: "end",
          padding: "100px",
        }}
      >
        <UseDragAndDropExample />
      </div>
    </div>
  );
};

export default App;
