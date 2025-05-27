import * as Icons from "../../../utils/icons";
import { tabsHandlerKey } from "../../../utils/tabHandlerKeys";

const IconsMap = {
  [tabsHandlerKey.magicLock]: Icons.lockIcon,
  [tabsHandlerKey.logout]: Icons.logoutIcon,
  [tabsHandlerKey.toggleFullscreen]: Icons.screenModeIcon,
  home: Icons.homeIcon,
};

export const getIconByKey = (key) => {
  return IconsMap[key] || IconsMap.home;
};
