import { useEffect } from "react";
import styles from "../css/WorkspaceLayout.module.css";
import { workspaceLayoutApi } from "../helper/workspaceLayoutApi";
import { useState } from "react";
import { Navigator } from "./Navigator";

export const WorkspaceLayout = ({ api, height = "100%", width = "100%" }) => {
  const [tabs, setTabs] = useState(null);
  const navigatorSize = "30px";
  useEffect(() => {
    const response = workspaceLayoutApi(api);
    setTabs(response);
  }, [api]);

  if (!tabs) return <>Tabs is Empty </>;

  const cssVariable = {
    "--navigatorSize": navigatorSize,
  };

  return (
    <div
      className={styles.workspaceLayout}
      style={{ height, width, ...cssVariable }}
    >
      {/* <Navigator tabs={tabs.left} /> */}
      {/* <Navigator tabs={tabs.right} /> */}
      <div className={styles.top}>
        <Navigator size={navigatorSize} tabs={tabs.top} />
      </div>
      <div className={styles.midOfTopBottom}>
        <div className={styles.left}>
          <Navigator size={navigatorSize} direction="column" tabs={tabs.left} />
        </div>

        <div className={styles.midOfLeftRight}> {} </div>
        <div className={styles.right}>
          <Navigator
            size={navigatorSize}
            direction="column"
            tabs={tabs.right}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Navigator size={navigatorSize} tabs={tabs.bottom} />
      </div>
    </div>
  );
};
