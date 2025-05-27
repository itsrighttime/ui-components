import { lockIcon, logoutIcon, screenModeIcon } from "../../../utils/icons";
import { tabsHandlerKey } from "../../../utils/tabHandlerKeys";
import { getIconByKey } from "./getIconBYKey";

export const formateTabsDetails = ({
  data,
  toggleFullscreen,
  tabClickHandler,
  defaultTabsHandler,
}) => {
  const result = {};
  const levels = ["tabsLevel1", "tabsLevel2"];
  const zones = ["top", "bottom", "left", "right"];
  const positions = ["left", "mid", "right"];

  levels.forEach((level) => {
    if (!data[level]) return;

    result[level] = {};

    zones.forEach((zone) => {
      if (!data[level][zone]) return;

      result[level][zone] = {};

      positions.forEach((position) => {
        const tabs = data[level][zone][position];
        if (!tabs) return;

        result[level][zone][position] = [];

        tabs.forEach((tab, index) => {
          result[level][zone][position].push({
            ...tab,
            onClick: tabClickHandler,
            icon: tab.isIcon ? getIconByKey(tab.key) || null : null,
          });
        });

        // Add special toggleFullscreen tab for: level1 > top > right > left[0]
        if (level === "tabsLevel1" && zone === "top" && position === "right") {
          result[level][zone][position].push({
            key: tabsHandlerKey.magicLock,
            value: "Lock Screen",
            onClick: defaultTabsHandler[tabsHandlerKey.magicLock],
            icon: getIconByKey(tabsHandlerKey.magicLock),
          });
          result[level][zone][position].push({
            key: tabsHandlerKey.logout,
            value: "Logout",
            onClick: defaultTabsHandler[tabsHandlerKey.logout],
            icon: getIconByKey(tabsHandlerKey.logout),
          });
          result[level][zone][position].push({
            key: tabsHandlerKey.toggleFullscreen,
            value: "Toggle Screen Mode",
            onClick: toggleFullscreen,
            icon: getIconByKey(tabsHandlerKey.toggleFullscreen),
          });
        }
        // Add special toggleFullscreen tab for: level1 > top > right > left[0]
        else if (
          level === "tabsLevel1" &&
          zone === "top" &&
          position === "left"
        ) {
          result[level][zone][position].unshift({
            key: tabsHandlerKey.workspaceName,
            value: data.content.workspaceName,
            onClick: () => {},
            icon: null,
          });
        }
      });
    });
  });

  return result;
};
