// Workspace.jsx
import { Route, Routes } from "react-router";
import { CombinedProviders } from "../helper/CombinedProviders";
import { WorkspaceLayoutFullScreen } from "./WorkspaceLayoutFullScreen";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage";
import { LoginForm } from "../../../Auth/js/LoginForm";

export const Workspace = ({ tabClickHandler, workspace = "letsDiscuss" }) => {
  return (
    <CombinedProviders tabClickHandler={tabClickHandler} workspace={workspace}>
      <Routes>
        <Route
          path="workspace/:workspaceId/:level/:zone/:position/:tabKey"
          element={<WorkspaceLayoutFullScreen />}
        />

        <Route path="/login" element={<LoginForm isRegisterButton={false} />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </CombinedProviders>
  );
};
