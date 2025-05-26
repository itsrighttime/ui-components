import { useState } from "react";
import { FullscreenWrapper } from "./FullscreenWrapper";
import { WorkspaceLayout } from "./WorkspaceLayout";
import { LockScreen } from "./LockScreen";
import { useUserActiveOnTab } from "../../../Hooks/useUserActiveOnTab";
import { LoginForm } from "../../../Auth/js/LoginForm";

const ScreenType = {
  MAGIC_SCREEN: "magicScreen",
  FULL_SCREEN: "fullScreen",
  LOGOUT_SCREEN: "logoutScreen",
};

export const WorkspaceLayoutFullScreen = () => {
  const isActive = useUserActiveOnTab(1); // 5 minutes inactivity timeout
  const [locked, setLocked] = useState(null);

  // When inactive, lock
  // if (!isActive && !locked) setLocked(ScreenType.MAGIC_SCREEN);

  const unlockMagicScreen = () => setLocked(null);

  return locked === ScreenType.MAGIC_SCREEN ? (
    <LockScreen onUnlock={unlockMagicScreen} />
  ) : locked === ScreenType.LOGOUT_SCREEN ? (
    <LoginForm onLogin={unlockMagicScreen} />
  ) : (
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
  );
};
