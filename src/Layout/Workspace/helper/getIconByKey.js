import * as Icons from "../../../utils/icons";
import { workspaceKeys } from "./workspaceKeys";

const IconsMap = {
  [workspaceKeys.magicLock]: Icons.lockIcon,
  [workspaceKeys.logout]: Icons.logoutIcon,
  [workspaceKeys.toggleFullscreen]: Icons.screenModeIcon,
  home: Icons.homeIcon,
};

export const getIconByKey = (key) => {
  return IconsMap[key] || IconsMap.home;
};
