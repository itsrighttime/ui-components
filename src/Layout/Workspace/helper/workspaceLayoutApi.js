export const workspaceLayoutApi = (api) => {
  const response = {
    content: {
      data: `Page for ${api || "Home"}`,
      workspaceName: "letsDiscuss",
    },

    tabsLevel1: generateTabSet("Level1"),
    tabsLevel2: generateTabSet("Level2"),
  };

  return response;
};

const generateTabSet = (label) => ({
  top: getZoneTabs("Top", label),
  bottom: getZoneTabs("Bottom", label),
  left: getZoneTabs("Left", label),
  right: getZoneTabs("Right", label),
});

const getZoneTabs = (zone, label) => ({
  left: createTabs(["Home", "Home3", "Home2"], zone, label, "left"),
  mid: createTabs(["About", "About1", "About2"], zone, label, "mid"),
  right: createTabs(["Contact", "Contact1", "Contact2"], zone, label, "right"),
});

const createTabs = (values, zone, label, position) =>
  values.map((val, index) => ({
    key: `${position}${zone}${label}${index}`,
    value: val,
    isIcon: ["Left", "Right"].includes(zone),
    dropdown: ["Left", "Right"].includes(zone) ? dropdown : null,
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
