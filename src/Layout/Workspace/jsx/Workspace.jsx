// Workspace.jsx
import { Route, Routes, useNavigate } from "react-router";
import { CombinedProviders } from "../helper/CombinedProviders";
import { WorkspaceLayoutWrapper } from "./WorkspaceLayoutWrapper";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage";
import { WorkspaceHomePage } from "./WorspaceHomePage";
import { FullscreenWrapper } from "./FullscreenWrapper";
import { LoginPage } from "../helper/LoginPage";

export const Workspace = ({ tabClickHandler, workspace = "letsDiscuss" }) => {
  const navigate = useNavigate();

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
                  <LoginPage handleToggleFullscreen={toggleFullscreen} />
                }
              />

              <Route
                path="*"
                element={<ErrorPage handleNavigate={() => navigate("/")} />}
              />
            </Routes>
          </>
        )}
      </FullscreenWrapper>
    </CombinedProviders>
  );
};
