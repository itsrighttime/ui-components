// components/WorkspaceLayout.jsx
import styles from "../css/WorkspaceLayout.module.css";
import { Navigator } from "./Navigator";
import { useWorkspaceLayout } from "../helper/useWorkspaceLayout";
import { workspaceLayoutKeys } from "../helper/workspaceLayoutKeys";

const { ZONES } = workspaceLayoutKeys;

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
  const { tabsPrimary, tabsSecondary, content, cssVariable, navigatorSize } =
    useWorkspaceLayout({
      api,
      level,
      maxDepth,
      providedTabs,
      providedContent,
      toggleFullscreen,
    });

  if (!tabsPrimary) return <>Tabs are Empty</>;

  return (
    <div
      className={styles.workspaceLayout}
      style={{ height, width, ...cssVariable }}
    >
      {tabsPrimary?.[ZONES.commandBar] && (
        <div className={styles.top}>
          <Navigator
            size={navigatorSize}
            tabs={tabsPrimary[ZONES.commandBar]}
          />
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
};
