// Workspace.jsx
import { CombinedProviders } from "../helper/CombinedProviders";
import { WorkspaceLayoutFullScreen } from "./WorkspaceLayoutFullScreen";

export const Workspace = ({ tabsHandler }) => {
  return (
    <CombinedProviders tabsHandler={tabsHandler}>
      <WorkspaceLayoutFullScreen />
    </CombinedProviders>
  );
};
