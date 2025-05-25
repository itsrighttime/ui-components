import "./App.css";
import "./export.js";
import { FullscreenWrapper } from "./Layout/Workspace/jsx/FullscreenWrapper.jsx";
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
        <FullscreenWrapper>
          {({ toggleFullscreen }) => (
            <WorkspaceLayout toggleFullscreen={toggleFullscreen} api={"letsSecure"}/>
          )}
        </FullscreenWrapper>
      </div>
    </div>
  );
};

export default App;
