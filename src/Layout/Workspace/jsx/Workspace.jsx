// Workspace.jsx
import { Route, Routes } from "react-router";
import { CombinedProviders } from "../helper/CombinedProviders";
import { WorkspaceLayoutWrapper } from "./WorkspaceLayoutWrapper";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage";
import { LoginForm } from "../../../Auth/js/LoginForm";
import { WorkspaceHomePage } from "./WorspaceHomePage";
import { FullscreenWrapper } from "./FullscreenWrapper";

export const Workspace = ({ tabClickHandler, workspace = "letsDiscuss" }) => {
  return (
    <CombinedProviders tabClickHandler={tabClickHandler} workspace={workspace}>
      <FullscreenWrapper>
        {({ toggleFullscreen }) => (
          <>
            <Routes>
              <Route
                path="workspace/:workspaceId/:level/:zone/:position/:tabKey"
                element={
                  <WorkspaceLayoutWrapper toggleFullscreen={toggleFullscreen} />
                }
              />
              <Route
                index
                element={
                  <WorkspaceHomePage
                    apps={[
                      "letsSecure",
                      "itsRIGHTtime",
                      "letsDiscuss",
                      "letsGrowTogether",
                      "CREATIVE",
                    ]}
                    toggleFullscreen={toggleFullscreen}
                  />
                }
              />

              <Route
                path="/login"
                element={
                  <LoginForm
                    isRegisterButton={false}
                    toggleFullscreen={toggleFullscreen}
                  />
                }
              />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </>
        )}
      </FullscreenWrapper>
    </CombinedProviders>
  );
};
