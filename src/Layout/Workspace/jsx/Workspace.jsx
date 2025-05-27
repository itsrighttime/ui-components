// Workspace.jsx
import { CombinedProviders } from "../helper/CombinedProviders";
import { WorkspaceLayoutFullScreen } from "./WorkspaceLayoutFullScreen";

export const Workspace = ({ tabClickHandler }) => {
  return (
    <CombinedProviders tabClickHandler={tabClickHandler}>
      <WorkspaceLayoutFullScreen />
    </CombinedProviders>
  );
};
