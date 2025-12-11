import styles from "./../css/WorkspaceLayout.module.css";
import { Navigator } from "./Navigator.jsx";
import { WorkspaceLayout } from "./WorkspaceLayout.jsx"; // for recursion
import { workspaceLayoutKeys } from "./../helper/workspaceLayoutKeys.js";

const { ZONES } = workspaceLayoutKeys;

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
