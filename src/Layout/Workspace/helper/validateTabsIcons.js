import { workspaceLayoutKeys } from "./workspaceLayoutKeys.js";

const { POSITIONS } = workspaceLayoutKeys;

export const validateTabsIcons = (tabs, direction) => {
  if (direction !== "column") return tabs;

  const allSections = [POSITIONS.start, POSITIONS.center, POSITIONS.end];

  for (const section of allSections) {
    const tabGroup = tabs[section] || [];

    for (const tab of tabGroup) {
      if (!tab.icon) {
        // throw new Error(
        //   `[Navigator]: All tabs must include an 'icon' when direction is set to 'column'. Missing in section '${section}' for tab with key '${tab.key}'.`
        // );
      }
    }
  }

  return tabs;
};
