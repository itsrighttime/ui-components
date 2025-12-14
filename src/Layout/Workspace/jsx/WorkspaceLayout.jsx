// components/WorkspaceLayout.jsx
import { useWorkspaceLayout } from "../helper/useWorkspaceLayout.js";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage.jsx";
import { useMediaQuery } from "../../../Hooks/useMediaQuery.js";
import { SmallScreenLayout } from "./SmallScreenLayout.jsx";
import { LargeScreenLayout } from "./LargeScreenLayout.jsx";

/**
 * WorkspaceLayout Component
 *
 * Dynamically renders a workspace layout based on the device screen size and provided workspace configuration.
 *
 * Props:
 * @param {object} api - API object or data source for fetching workspace tabs and content.
 * @param {string | number} height - Height of the workspace container (default: "100%").
 * @param {string | number} width - Width of the workspace container (default: "100%").
 * @param {number} level - Current depth level in nested workspace layout (default: 1).
 * @param {number} maxDepth - Maximum allowed depth for nested layouts (default: 2).
 * @param {object|null} providedTabs - Optional tabs data to override API-provided tabs.
 * @param {object|null} providedContent - Optional content data to override API-provided content.
 * @param {function} toggleFullscreen - Callback to toggle fullscreen mode.
 *
 * Behavior:
 * - Uses `useWorkspaceLayout` hook to compute primary/secondary tabs, content, navigator size, and CSS variables.
 * - Detects device screen size using `useMediaQuery` to determine small or large screen layout.
 * - Renders:
 *   - `LargeScreenLayout` for screens larger than the threshold.
 *   - `SmallScreenLayout` for smaller screens (mobile/tablet).
 * - If no tabs or content are available, renders the `ErrorPage`.
 *
 * Usage:
 * <WorkspaceLayout
 *   api={workspaceAPI}
 *   height="100%"
 *   width="100%"
 *   level={1}
 *   maxDepth={3}
 *   toggleFullscreen={handleFullscreenToggle}
 * />
 */
export const WorkspaceLayout = ({
  api,
  height = "100%",
  width = "100%",
  level = 1,
  maxDepth = 2,
  providedTabs = null,
  providedContent = null,
  toggleFullscreen,
}) => {
  const isSmallDevice = useMediaQuery(900);

  const { tabsPrimary, tabsSecondary, content, cssVariable, navigatorSize } =
    useWorkspaceLayout({
      api,
      level,
      maxDepth,
      providedTabs,
      providedContent,
      toggleFullscreen,
    });

  if (!tabsPrimary && !tabsSecondary && !content) return <ErrorPage />;

  const layoutProps = {
    height,
    width,
    cssVariable,
    navigatorSize,
    tabsPrimary,
    tabsSecondary,
    content,
    api,
    level,
    maxDepth,
    toggleFullscreen,
  };

  return isSmallDevice ? (
    <SmallScreenLayout {...layoutProps} />
  ) : (
    <LargeScreenLayout {...layoutProps} />
  );
};
