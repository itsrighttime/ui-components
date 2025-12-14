import { useEffect, useRef, useState } from "react";

/**
 * useUserActiveOnTab Hook
 *
 * Custom React hook that tracks user activity on the current browser tab
 * and marks the user as inactive after a specified period of inactivity.
 *
 * Useful for features like auto-logout, session management, or
 * temporarily pausing updates when the user is inactive.
 *
 * @hook
 *
 * @param {number} [timeout=5] - Inactivity timeout in minutes after which the user is considered inactive.
 *
 * @returns {boolean} isActive - Boolean indicating whether the user is currently active on the tab.
 *
 * @example
 * const isUserActive = useUserActiveOnTab(10); // 10-minute inactivity timeout
 *
 * useEffect(() => {
 *   if (!isUserActive) {
 *     console.log("User is inactive");
 *   }
 * }, [isUserActive]);
 *
 * @notes
 * - Listens to multiple user events such as mouse movements, key presses,
 *   touch events, scrolls, and visibility changes
 * - Automatically resets timer whenever activity is detected
 * - Cleans up all event listeners and timers on component unmount
 */

export const useUserActiveOnTab = (timeout = 5) => {
  const [isActive, setIsActive] = useState(true);
  const timeoutId = useRef(null);

  const resetTimer = () => {
    clearTimeout(timeoutId.current);
    setIsActive(true);
    timeoutId.current = setTimeout(
      () => setIsActive(false),
      timeout * 60 * 1000
    );
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "visibilitychange",
    ];
    const handleActivity = () => {
      if (document.visibilityState === "visible") resetTimer();
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimer();

    return () => {
      clearTimeout(timeoutId.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [timeout]);

  return isActive;
};
