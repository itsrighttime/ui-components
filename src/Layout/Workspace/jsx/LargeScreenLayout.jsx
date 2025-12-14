"use client";

import styles from "./../css/WorkspaceLayout.module.css";
import { Navigator } from "./Navigator.jsx";
import { WorkspaceLayout } from "./WorkspaceLayout.jsx"; // for recursion
import { workspaceLayoutKeys } from "./../helper/workspaceLayoutKeys.js";

const { ZONES } = workspaceLayoutKeys;

/**
 * LargeScreenLayout Component
 *
 * Renders a workspace layout optimized for large screens with multiple zones.
 * Supports recursive nesting for secondary tabs/content, creating multi-level workspaces.
 *
 * Props:
 * @param {string|number} height - Height of the layout container.
 * @param {string|number} width - Width of the layout container.
 * @param {object} cssVariable - Additional CSS variables to apply to the container.
 * @param {number} navigatorSize - Size of the navigators rendered in different zones.
 * @param {object} tabsPrimary - Object containing primary zone tabs keyed by ZONES constants (commandBar, sidebar, tools, statusBar).
 * @param {object} tabsSecondary - Optional object for secondary tabs to render recursively.
 * @param {any} content - The main content to display within the workspace.
 * @param {object} api - Optional API or data passed down for nested layouts.
 * @param {number} level - Current recursion level (used internally for nested layouts).
 * @param {number} maxDepth - Maximum depth allowed for recursive rendering.
 * @param {function} toggleFullscreen - Function to toggle fullscreen mode (optional).
 *
 * Behavior:
 * - Renders primary zones: commandBar (top), sidebar (left), tools (right), statusBar (bottom).
 * - Middle area displays either nested WorkspaceLayout (if level < maxDepth) or the provided content.
 * - Navigators are rendered for each zone if tabs are provided.
 * - Supports recursive layouts for complex workspace structures.
 */
export const LargeScreenLayout = ({
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
}) => (
  <div
    className={styles.workspaceLayout}
    style={{ height, width, ...cssVariable }}
  >
    {tabsPrimary?.[ZONES.commandBar] && (
      <div className={styles.top}>
        <Navigator size={navigatorSize} tabs={tabsPrimary[ZONES.commandBar]} />
      </div>
    )}

    <div className={styles.midOfTopBottom}>
      {tabsPrimary?.[ZONES.sidebar] && (
        <div className={styles.left}>
          <Navigator
            direction="column"
            size={navigatorSize}
            tabs={tabsPrimary[ZONES.sidebar]}
          />
        </div>
      )}

      <div className={styles.midOfLeftRight}>
        {level < maxDepth && tabsSecondary ? (
          <WorkspaceLayout
            api={api}
            level={level + 1}
            maxDepth={maxDepth}
            providedTabs={tabsSecondary}
            providedContent={content}
            toggleFullscreen={toggleFullscreen}
          />
        ) : (
          <div>{JSON.stringify(content)}</div>
        )}
      </div>

      {tabsPrimary?.[ZONES.tools] && (
        <div className={styles.right}>
          <Navigator
            direction="column"
            size={navigatorSize}
            tabs={tabsPrimary[ZONES.tools]}
          />
        </div>
      )}
    </div>

    {tabsPrimary?.[ZONES.statusBar] && (
      <div className={styles.bottom}>
        <Navigator size={navigatorSize} tabs={tabsPrimary[ZONES.statusBar]} />
      </div>
    )}
  </div>
);
