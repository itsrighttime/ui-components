import "./App.css";
import "./export.js";
import { UseDragAndDropExample } from "./Usecases/Misc/UseDragAndDropExample.jsx";
import { UseHookAPIExample } from "./Usecases/Misc/UseHookAPIExample.jsx";
import { UseSmoothScrollerExample } from "./Usecases/Misc/UseSmoothScrollerExample.jsx";

const App = () => {
  return (
    <div className="App">
      <div
        style={{
          border: "1px solid red",
        }}
      >
        <UseSmoothScrollerExample />
      </div>
    </div>
  );
};

export default App;
