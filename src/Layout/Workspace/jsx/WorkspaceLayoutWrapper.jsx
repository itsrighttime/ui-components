"use client";

import { useState } from "react";
import { FullscreenWrapper } from "./FullscreenWrapper.jsx";
import { WorkspaceLayout } from "./WorkspaceLayout.jsx";
import { LockScreen } from "./LockScreen.jsx";
import { useUserActiveOnTab } from "../../../Hooks/useUserActiveOnTab.js";
import { useDynamicContent } from "../../../Context/jsx/DynamicContext.jsx";
import { useEffect } from "react";
import { workspaceKeys } from "../helper/workspaceKeys.js";
import { useAuth } from "../../../Context/jsx/AuthContext.jsx";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage.jsx";

export const ScreenType = {
  MAGIC_SCREEN: "magicScreen",
  FULL_SCREEN: "fullScreen",
  LOGOUT_SCREEN: "logoutScreen",
};

/**
 * WorkspaceLayoutWrapper Component
 *
 * Wraps the workspace layout and handles dynamic screen states including:
 * - Magic lock screen (requires user input to unlock)
 * - Full workspace screen
 * - Logout/error screen
 *
 * Props:
 * @param {function} toggleFullscreen - Callback to toggle fullscreen mode for the workspace.
 *
 * Behavior:
 * - Uses `useAuth` to get user details.
 * - Tracks user activity with `useUserActiveOnTab` hook (defaults to 5 minutes inactivity timeout).
 * - Uses `useDynamicContent` to register a lock callback for the workspace.
 * - Manages `locked` state to determine which screen to display:
 *   - `MAGIC_SCREEN`: Shows the `LockScreen` component for user authentication.
 *   - `FULL_SCREEN`: Displays the main `WorkspaceLayout` component.
 *   - Any other state or error: Renders the `ErrorPage`.
 * - Automatically locks the workspace if the user becomes inactive and the screen is not already locked.
 * - Unlocking the magic screen updates `locked` state to `FULL_SCREEN`.
 *
 * Usage:
 * <WorkspaceLayoutWrapper toggleFullscreen={handleFullscreenToggle} />
 */
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
    <LockScreen
      handleUnlock={(key) => {
        unlockMagicScreen();
      }}
    />
  ) : locked === ScreenType.FULL_SCREEN ? (
    <WorkspaceLayout toggleFullscreen={toggleFullscreen} api={"letsSecure"} />
  ) : (
    <ErrorPage ErrorMsg="Something is Wrong in WorkspaceLayoutFullScreen" />
  );
};
