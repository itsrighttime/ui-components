import { useState } from "react";
import { FullscreenWrapper } from "./FullscreenWrapper";
import { WorkspaceLayout } from "./WorkspaceLayout";
import { LockScreen } from "./LockScreen";
import { useUserActiveOnTab } from "../../../Hooks/useUserActiveOnTab";
import { useDynamicContent } from "../../../Context/jsx/DynamicContext";
import { useEffect } from "react";
import { workspaceKeys } from "../helper/workspaceKeys";
import { useAuth } from "../../../Context/jsx/AuthContext";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage";

export const ScreenType = {
  MAGIC_SCREEN: "magicScreen",
  FULL_SCREEN: "fullScreen",
  LOGOUT_SCREEN: "logoutScreen",
};

export const WorkspaceLayoutWrapper = ({ toggleFullscreen }) => {
  const { userDetails } = useAuth();
  const isActive = useUserActiveOnTab(5); // 5 minutes inactivity timeout
  const [locked, setLocked] = useState(userDetails?.user?.screenType);
  const { setValue } = useDynamicContent();

  useEffect(() => {
    setValue(workspaceKeys.magicLock, () => {
      console.log("Locking screen");
      setLocked(ScreenType.MAGIC_SCREEN);
    });
  }, []);

  // When inactive, lock
  if (!isActive && !locked) setLocked(ScreenType.MAGIC_SCREEN);

  const unlockMagicScreen = () => setLocked(ScreenType.FULL_SCREEN);

  return locked === ScreenType.MAGIC_SCREEN ? (
    <LockScreen onUnlock={unlockMagicScreen} />
  ) : locked === ScreenType.FULL_SCREEN ? (
    <WorkspaceLayout toggleFullscreen={toggleFullscreen} api={"letsSecure"} />
  ) : (
    <ErrorPage ErrorMsg="Something is Wrong in WorkspaceLayoutFullScreen" />
  );
};
