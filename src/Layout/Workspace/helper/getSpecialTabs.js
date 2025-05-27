import { workspaceKeys } from "./workspaceKeys";
import { getIconByKey } from "./getIconBYKey";
import { LEVELS, ZONES, POSITIONS } from "./workspaceLayoutKeys";

export const getSpecialTabs = ({
  section,
  data,
  clickHandler,
  toggleFullscreen,
}) => {
  const isTopRight =
    section.level === LEVELS.primary &&
    section.zone === ZONES.commandBar &&
    section.position === POSITIONS.end;

  const isTopLeft =
    section.level === LEVELS.primary &&
    section.zone === ZONES.commandBar &&
    section.position === POSITIONS.start;

  const isLeftLeft =
    section.level === LEVELS.primary &&
    section.zone === ZONES.sidebar &&
    section.position === POSITIONS.end;

  const specialTabs = [];

  if (isTopRight) {
    [workspaceKeys.magicLock, workspaceKeys.logout].forEach((key) => {
      specialTabs.push({
        key,
        value: key === workspaceKeys.magicLock ? "Lock Screen" : "Logout",
        onClick: (clickedValue) =>
          clickHandler({ tab: { key: clickedValue, ...section } })[key](
            clickedValue
          ),
        icon: getIconByKey(key),
      });
    });

    specialTabs.push({
      key: workspaceKeys.toggleFullscreen,
      value: "Toggle Screen Mode",
      onClick: toggleFullscreen,
      icon: getIconByKey(workspaceKeys.toggleFullscreen),
    });
  }

  if (isTopLeft) {
    specialTabs.unshift({
      key: workspaceKeys.workspaceName,
      value: data?.content?.workspaceName ?? "Workspace",
      onClick: () => {},
      icon: null,
    });
  }

  if (isLeftLeft) {
    const rendringKeys = workspaceKeys.workspace;

    Object.keys(rendringKeys).forEach((key) => {
      specialTabs.push({
        key: rendringKeys[key],
        value: rendringKeys[key],
        onClick: (clickedValue) =>
          clickHandler({
            tab: { key: clickedValue, ...section },
            isWorkspace: true,
          }),
        icon: getIconByKey(rendringKeys[key]),
      });
    });
  }

  return specialTabs;
};
