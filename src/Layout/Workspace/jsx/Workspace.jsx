// Workspace.jsx
import { Route, Routes } from "react-router";
import { CombinedProviders } from "../helper/CombinedProviders";
import { WorkspaceLayoutFullScreen } from "./WorkspaceLayoutFullScreen";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage";

export const Workspace = ({ tabClickHandler }) => {
  return (
    <CombinedProviders tabClickHandler={tabClickHandler}>
      <Routes>
        <Route
          path="workspace/:workspaceId/:level/:zone/:position/:tabKey"
          element={<WorkspaceLayoutFullScreen />}
        />

        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </CombinedProviders>
  );
};
