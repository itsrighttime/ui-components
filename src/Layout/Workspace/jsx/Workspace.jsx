// Workspace.jsx
import { Route, Routes, useNavigate } from "react-router";
import { CombinedProviders } from "../helper/CombinedProviders.jsx";
import { WorkspaceLayoutWrapper } from "./WorkspaceLayoutWrapper.jsx";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage.jsx";
import { WorkspaceHomePage } from "./WorspaceHomePage.jsx";
import { FullscreenWrapper } from "./FullscreenWrapper.jsx";
import { LoginPage } from "../helper/LoginPage.jsx";

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
