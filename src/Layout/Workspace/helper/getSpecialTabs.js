import { workspaceKeys } from "./workspaceKeys";
import { getIconByKey } from "./getIconBYKey";
import { workspaceLayoutKeys } from "./workspaceLayoutKeys";
import { homeIcon, profileIcon, reminderIcon } from "../../../utils/icons";
import { workspaceLabels } from "./workspaceLabels";

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

  const isTopEnd = isPosition(LEVELS.primary, ZONES.commandBar, POSITIONS.end);
  const isTopStart = isPosition(
    LEVELS.primary,
    ZONES.commandBar,
    POSITIONS.start
  );
  const isLeftEnd = isPosition(LEVELS.primary, ZONES.sidebar, POSITIONS.end);
  const isRightStart = isPosition(LEVELS.primary, ZONES.tools, POSITIONS.start);

  // Top-right: Lock + Logout + Fullscreen
  if (isTopEnd) {
    specialTabs.push({
      key: workspaceKeys.workspaceHome,
      value: workspaceLabels.workspaceHome,
      icon: homeIcon,
      onClick: (clickedValue) =>
        clickHandler({ tab: { key: clickedValue, ...section } })[
          workspaceKeys.myProfile
        ](clickedValue),
    });

    specialTabs.push({
      key: workspaceKeys.myProfile,
      value: workspaceLabels.myProfile,
      icon: profileIcon,
      onClick: (clickedValue) =>
        clickHandler({ tab: { key: clickedValue, ...section } })[
          workspaceKeys.myProfile
        ](clickedValue),
      dropdown: data.myProfile.dropdown,
    });

    [workspaceKeys.magicLock, workspaceKeys.logout].forEach((key) => {
      const label =
        key === workspaceKeys.magicLock
          ? workspaceLabels.magicLock
          : workspaceLabels.logout;

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
      key: workspaceKeys.notification,
      value: workspaceLabels.notification,
      icon: reminderIcon,
      onClick: (clickedValue) =>
        clickHandler({ tab: { key: clickedValue, ...section } })[
          workspaceKeys.notification
        ](clickedValue),
      dropdown: data.notification.dropdown,
      extra: {
        total: data.notification.total,
      },
    });

    specialTabs.push({
      key: workspaceKeys.toggleFullscreen,
      value: workspaceLabels.toggleFullscreen,
      icon: getIconByKey(workspaceKeys.toggleFullscreen),
      onClick: toggleFullscreen,
    });
  }

  // Top-left: Workspace label
  if (isTopStart) {
    specialTabs.unshift({
      key: workspaceKeys.workspaceName,
      value: data?.content?.workspaceName ?? workspaceLabels.workspaceName,
      icon: null,
      onClick: () => {},
    });
  }

  // Left-sidebar: Workspace-level items
  if (isLeftEnd) {
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

  // Right-sidebar: Workspace-level items
  if (isRightStart) {
  }

  return specialTabs;
};
