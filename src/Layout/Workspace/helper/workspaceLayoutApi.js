
import { workspaceLayoutKeys } from "./workspaceLayoutKeys";

const { LEVELS, ZONES, POSITIONS } = workspaceLayoutKeys;

export const workspaceLayoutApi = (api) => {
  return {
    content: {
      data: `Page for ${api || "Home"}`,
      workspaceName: "letsDiscuss",
    },

    [LEVELS.primary]: generateTabSet("Level1"),
    [LEVELS.secondary]: generateTabSet("Level2"),
  };
};

const generateTabSet = (label) => ({
  [ZONES.commandBar]: getZoneTabs(ZONES.commandBar, label),
  [ZONES.statusBar]: getZoneTabs(ZONES.statusBar, label),
  [ZONES.sidebar]: getZoneTabs(ZONES.sidebar, label),
  [ZONES.tools]: label === "Level1" ? getZoneTabs(ZONES.tools, label) : null,
});

const getZoneTabs = (zone, label) => ({
  [POSITIONS.start]: createTabs(
    ["Home", "Home3", "Home2"],
    zone,
    label,
    POSITIONS.start
  ),
  [POSITIONS.center]: createTabs(
    ["About", "About1", "About2"],
    zone,
    label,
    POSITIONS.center
  ),
  [POSITIONS.end]: createTabs(
    ["Contact", "Contact1", "Contact2"],
    zone,
    label,
    POSITIONS.end
  ),
});

const createTabs = (values, zone, label, position) =>
  values.map((val, index) => ({
    key: `${position}${zone}${label}${index}`,
    value: val,
    isIcon: [ZONES.sidebar, ZONES.tools].includes(zone),
    dropdown: [ZONES.sidebar, ZONES.tools].includes(zone) ? dropdown : null,
  }));

const dropdown = [
  {
    key: "dropdownkey1",
    value: "Dropdown Key 1",
    description: "Ctrl + K + h",
  },
  {
    key: "dropdownkey2",
    value: "Dropdown Key 2",
    description: "Ctrl + K + h",
  },
  {
    key: "dropdownkey3",
    value: "Dropdown Key 3",
  },
];
