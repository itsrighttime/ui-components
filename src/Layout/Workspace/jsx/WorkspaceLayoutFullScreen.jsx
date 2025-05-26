import { useState } from "react";
import { FullscreenWrapper } from "./FullscreenWrapper";
import { WorkspaceLayout } from "./WorkspaceLayout";
import { LockScreen } from "./LockScreen";
import { useUserActiveOnTab } from "../../../Hooks/useUserActiveOnTab";
import { LoginForm } from "../../../Auth/js/LoginForm";
import { useDynamicContent } from "../../../Context/jsx/DynamicContext";
import { useEffect } from "react";
import { tabsHandlerKey } from "../../../utils/tabHandlerKeys";
import { useAuth } from "../../../Context/jsx/AuthContext";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage";

export const ScreenType = {
  MAGIC_SCREEN: "magicScreen",
  FULL_SCREEN: "fullScreen",
  LOGOUT_SCREEN: "logoutScreen",
};

export const WorkspaceLayoutFullScreen = () => {
  const { userDetails } = useAuth();
  const isActive = useUserActiveOnTab(1); // 5 minutes inactivity timeout
  const [locked, setLocked] = useState(userDetails?.user?.screenType);
  const { setValue } = useDynamicContent();
  console.log("User Details: ", userDetails);

  useEffect(() => {
    setValue(tabsHandlerKey.magicLock, () => {
      console.log("Locking screen");
      setLocked(ScreenType.MAGIC_SCREEN);
    });
  }, []);

  // When inactive, lock
  if (!isActive && !locked) setLocked(ScreenType.MAGIC_SCREEN);

  const unlockMagicScreen = () => setLocked(ScreenType.FULL_SCREEN);

  return !userDetails ? (
    <LoginForm onLogin={unlockMagicScreen} isRegisterButton={false} />
  ) : locked === ScreenType.MAGIC_SCREEN ? (
    <LockScreen onUnlock={unlockMagicScreen} />
  ) : locked === ScreenType.FULL_SCREEN ? (
    <FullscreenWrapper>
      {({ toggleFullscreen }) => (
        <>
          <WorkspaceLayout
            toggleFullscreen={toggleFullscreen}
            api={"letsSecure"}
          />
        </>
      )}
    </FullscreenWrapper>
  ) : (
    <ErrorPage ErrorMsg="Something is Wrong in WorkspaceLayoutFullScreen" />
  );
};
