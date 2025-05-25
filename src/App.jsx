import "./App.css";
import "./export.js";
import { Navigator } from "./Layout/Workspace/jsx/Navigator.jsx";
import { WorkspaceLayout } from "./Layout/Workspace/jsx/WorkspaceLayout.jsx";

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
        <WorkspaceLayout api={"/letsDiscuss"} />
      </div>
    </div>
  );
};

export default App;
