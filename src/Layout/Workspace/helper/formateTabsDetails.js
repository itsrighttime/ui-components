// helper/formateTabsDetails.js
import { formatSingleTab } from "./formatSingleTab.js";
import { getSpecialTabs } from "./getSpecialTabs.js";
import { workspaceLayoutKeys } from "./workspaceLayoutKeys.js";

const { LEVELS, ZONES, POSITIONS } = workspaceLayoutKeys;

export const formateTabsDetails = ({
  data,
  toggleFullscreen,
  clickHandler,
}) => {
  const result = {};
  const levels = [LEVELS.primary, LEVELS.secondary];
  const zones = [ZONES.sidebar, ZONES.tools, ZONES.commandBar, ZONES.statusBar];
  const positions = [POSITIONS.start, POSITIONS.center, POSITIONS.end];

  for (const level of levels) {
    const levelData = data[level];
    if (!levelData) continue;

    result[level] = {};

    for (const zone of zones) {
      const zoneData = levelData[zone];
      if (!zoneData) continue;

      result[level][zone] = {};

      for (const position of positions) {
        const tabs = zoneData[position];
        if (!tabs) continue;

        const section = { level, zone, position };
        const formattedTabs = tabs.map((tab) =>
          formatSingleTab(tab, clickHandler, section)
        );

        const specialTabs = getSpecialTabs({
          section,
          data,
          clickHandler,
          toggleFullscreen,
        });

        result[level][zone][position] =
          position === POSITIONS.start
            ? [...specialTabs, ...formattedTabs]
            : [...formattedTabs, ...specialTabs];
      }
    }
  }

  return result;
};
