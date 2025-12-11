import * as Icons from "../../../utils/icons.jsx";
import { workspaceKeys } from "./workspaceKeys.js";

const IconsMap = {
  [workspaceKeys.magicLock]: Icons.lockIcon,
  [workspaceKeys.logout]: Icons.logoutIcon,
  [workspaceKeys.toggleFullscreen]: Icons.screenModeIcon,
  home: Icons.homeIcon,
};

export const getIconByKey = (key) => {
  return IconsMap[key] || Icons.analyticsIcon;
};

