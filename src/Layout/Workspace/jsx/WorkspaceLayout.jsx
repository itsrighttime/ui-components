import { useEffect, useState } from "react";
import styles from "../css/WorkspaceLayout.module.css";
import { workspaceLayoutApi } from "../helper/workspaceLayoutApi";
import { Navigator } from "./Navigator";
import { formateTabsDetails } from "../helper/formateTabsDetails";
import { useTabHandler } from "../../../Context/jsx/TabsHandlerContext";
import { tabsHandlerKey } from "../../../utils/tabHandlerKeys";
import { useDynamicContent } from "../../../Context/jsx/DynamicContext";
import { useAuth } from "../../../Context/jsx/AuthContext";

export const WorkspaceLayout = ({
  api,
  height = "100%",
  width = "100%",
  level = 1, // <---- NEW |
  maxDepth = 2, // <---- Where to stop nesting
  providedTabs = null, // <---- Passed from parent if not root
  providedContent = null, // <---- Same for content
  toggleFullscreen,
}) => {
  const [tabsLevel1, setTabsLevel1] = useState(providedTabs);
  const [tabsLevel2, setTabsLevel2] = useState(null);
  const [content, setContent] = useState(providedContent);
  const navigatorSize = "32px";
  const tabsHandler = useTabHandler();
  const { getValue } = useDynamicContent();
  const { handleLogout } = useAuth();

  const handleMagicLock = getValue(tabsHandlerKey.magicLock);

  // handleMagicLock && handleMagicLock();

  const defaultTabsHandler = {
    [tabsHandlerKey.magicLock]: handleMagicLock && handleMagicLock,
    [tabsHandlerKey.logout]: handleLogout,
  };

  useEffect(() => {
    if (level === 1 && api) {
      const response = workspaceLayoutApi(api);

      const formattedTabs = formateTabsDetails({
        data: response,
        toggleFullscreen: toggleFullscreen,
        tabsHandler: tabsHandler,
        defaultTabsHandler: defaultTabsHandler,
      });

      setTabsLevel1(formattedTabs.tabsLevel1);
      setTabsLevel2(formattedTabs.tabsLevel2);

      setContent(response.content.data);
    }
  }, [api, level, handleMagicLock]);

  if (!tabsLevel1) return <>Tabs are Empty</>;

  const cssVariable = {
    "--navigatorSize": navigatorSize,
  };

  return (
    <div
      className={styles.workspaceLayout}
      style={{ height, width, ...cssVariable }}
    >
      <div className={styles.top}>
        <Navigator size={navigatorSize} tabs={tabsLevel1.top} />
      </div>

      <div className={styles.midOfTopBottom}>
        <div className={styles.left}>
          <Navigator
            size={navigatorSize}
            direction="column"
            tabs={tabsLevel1.left}
          />
        </div>

        <div className={styles.midOfLeftRight}>
          {/* Recursive nesting until maxDepth */}
          {level < maxDepth && tabsLevel2 ? (
            <WorkspaceLayout
              api={api}
              level={level + 1}
              maxDepth={maxDepth}
              providedTabs={tabsLevel2}
              providedContent={content}
            />
          ) : (
            <div>{JSON.stringify(content)}</div>
          )}
        </div>

        <div className={styles.right}>
          <Navigator
            size={navigatorSize}
            direction="column"
            tabs={tabsLevel1.right}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <Navigator size={navigatorSize} tabs={tabsLevel1.bottom} />
      </div>
    </div>
  );
};
