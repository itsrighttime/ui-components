import { screenModeIcon } from "../../../utils/icons";

export const formateTabsDetails = ({ data, toggleFullscreen, tabsHandler }) => {
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
          const handler = tabsHandler[tab.key];

          if (handler && !handler.onClick) {
            console.warn(
              `Missing onClick handler for tab key "${tab.key}". Please define it in tabsHandler.`
            );
          }

          if (handler && tab.isIcon && !handler.icon) {
            console.warn(
              `Missing icon handler for tab key "${tab.key}". Please define it in tabsHandler.`
            );
          }

          result[level][zone][position].push({
            ...tab,
            onClick: handler?.onClick || (() => {}),
            icon: tab.isIcon ? handler?.icon || null : null,
          });
        });

        // Add special toggleFullscreen tab for: level1 > top > right > left[0]
        if (level === "tabsLevel1" && zone === "right" && position === "left") {
          result[level][zone][position].unshift({
            key: "toggleFullscreen",
            value: "Toggle Screen Mode",
            onClick: toggleFullscreen,
            icon: screenModeIcon,
          });
        }
        // Add special toggleFullscreen tab for: level1 > top > right > left[0]
        else if (
          level === "tabsLevel1" &&
          zone === "top" &&
          position === "left"
        ) {
          result[level][zone][position].unshift({
            key: "workspaceName",
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
