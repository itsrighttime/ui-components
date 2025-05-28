import { workspaceKeys } from "./workspaceKeys";
import { getIconByKey } from "./getIconBYKey";
import { workspaceLayoutKeys } from "./workspaceLayoutKeys";
import { profileIcon } from "../../../utils/icons";

const { LEVELS, ZONES, POSITIONS } = workspaceLayoutKeys;

export const getSpecialTabs = ({
  section,
  data,
  clickHandler,
  toggleFullscreen,
}) => {
  const { level, zone, position } = section;
  const specialTabs = [];

  const isPosition = (lvl, zn, pos) =>
    level === lvl && zone === zn && position === pos;

  const isTopRight = isPosition(
    LEVELS.primary,
    ZONES.commandBar,
    POSITIONS.end
  );
  const isTopLeft = isPosition(
    LEVELS.primary,
    ZONES.commandBar,
    POSITIONS.start
  );
  const isLeftLeft = isPosition(LEVELS.primary, ZONES.sidebar, POSITIONS.end);

  // Top-right: Lock + Logout + Fullscreen
  if (isTopRight) {
    specialTabs.push({
      key: workspaceKeys.myProfile,
      value: "My Profile",
      icon: profileIcon,
      onClick: (clickedValue) =>
        clickHandler({ tab: { key: clickedValue, ...section } })[
          workspaceKeys.myProfile
        ](clickedValue),
      dropdown: data.myProfile.dropdown,
    });

    [workspaceKeys.magicLock, workspaceKeys.logout].forEach((key) => {
      const label = key === workspaceKeys.magicLock ? "Lock Screen" : "Logout";

      specialTabs.push({
        key,
        value: label,
        icon: getIconByKey(key),
        onClick: (clickedValue) =>
          clickHandler({ tab: { key: clickedValue, ...section } })[key](
            clickedValue
          ),
      });
    });

    specialTabs.push({
      key: workspaceKeys.toggleFullscreen,
      value: "Toggle Screen Mode",
      icon: getIconByKey(workspaceKeys.toggleFullscreen),
      onClick: toggleFullscreen,
    });
  }

  // Top-left: Workspace label
  if (isTopLeft) {
    specialTabs.unshift({
      key: workspaceKeys.workspaceName,
      value: data?.content?.workspaceName ?? "Workspace",
      icon: null,
      onClick: () => {},
    });
  }

  // Left-sidebar: Workspace-level items
  if (isLeftLeft) {
    const renderingKeys = workspaceKeys.workspace;

    Object.values(renderingKeys).forEach((key) => {
      specialTabs.push({
        key,
        value: key,
        icon: getIconByKey(key),
        onClick: (clickedValue) =>
          clickHandler({
            tab: { key: clickedValue, ...section },
            isWorkspace: true,
          }),
      });
    });
  }

  return specialTabs;
};
