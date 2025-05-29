import { useAuth } from "../../../Context/jsx/AuthContext";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import {
  logoutIcon,
  profileIcon,
  reminderIcon,
  screenModeIcon,
} from "../../../utils/icons";
import styles from "../css/WorkspaceHomePage.module.css";
import { Tab } from "./Tab";
import { workspaceKeys } from "./workspaceKeys";
import { workspaceLabels } from "./workspaceLabels";
import { getWorspaceHomeTabsApi } from "./workspaceLayoutApi";

export const WorkspaceHomePageTabs = ({ toggleFullscreen }) => {
  const { handleLogout } = useAuth();
  const { myProfile, notification } = getWorspaceHomeTabsApi();

  return (
    <div className={styles.extraIcons}>
      <Tab
        icon={profileIcon}
        mykey={workspaceKeys.myProfile}
        value={workspaceLabels.myProfile}
        dropdown={myProfile.dropdown}
        onClick={(value) => {
          console.log("WorkSpace Home Profile Click: ", value);
        }}
      />

      <IconButton
        icon={logoutIcon}
        label={workspaceLabels.logout}
        onClick={handleLogout}
        size={1.2}
      />
      <Tab
        icon={reminderIcon}
        mykey={workspaceKeys.notification}
        value={workspaceLabels.notification}
        dropdown={notification.dropdown}
        onClick={(value) => {
          console.log("WorkSpace Home Notification Click: ", value);
        }}
        extra={{
          total: notification.total,
        }}
      />
      <IconButton
        icon={screenModeIcon}
        label={workspaceLabels.toggleFullscreen}
        onClick={toggleFullscreen}
        size={1.2}
        color={"var(--colorRed)"}
      />
    </div>
  );
};
