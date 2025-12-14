"use client";

// Workspace.jsx
import { Route, Routes, useNavigate } from "react-router";
import { CombinedProviders } from "../helper/CombinedProviders.jsx";
import { WorkspaceLayoutWrapper } from "./WorkspaceLayoutWrapper.jsx";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage.jsx";
import { WorkspaceHomePage } from "./WorspaceHomePage.jsx";
import { FullscreenWrapper } from "./FullscreenWrapper.jsx";
import { LoginPage } from "../helper/LoginPage.jsx";

/**
 * Workspace Component
 *
 * Acts as the main entry point for the workspace section of the application.
 * Handles routing, fullscreen mode, and provider context for all nested workspace components.
 *
 * Props:
 * @param {function} tabClickHandler - Optional callback invoked when a tab in the workspace is clicked.
 * @param {string} workspace - Workspace identifier (default: "letsDiscuss") to load a specific workspace context.
 *
 * Behavior:
 * - Wraps workspace content inside CombinedProviders for shared state and context.
 * - Wraps content in FullscreenWrapper to enable fullscreen toggle via keyboard or programmatic triggers.
 * - Sets up routes:
 *   - "/workspace/:workspaceId/:level/:zone/:position/:tabKey": Renders WorkspaceLayoutWrapper with toggleFullscreen.
 *   - Index route: Renders WorkspaceHomePage with predefined apps and toggleFullscreen.
 *   - "/login": Renders LoginPage with fullscreen toggle support.
 *   - Catch-all "*": Renders ErrorPage with navigation back to root.
 *
 * Usage:
 * <Workspace workspace="letsDiscuss" tabClickHandler={handleTabClick} />
 */
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
