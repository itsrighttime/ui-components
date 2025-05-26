import { useEffect } from "react";

/**
 * Hook to track when user switches tabs or applications.
 * @param {function} onFocus - Called when user returns to the tab/app.
 * @param {function} onBlur - Called when user leaves the tab/app.
 */
export const useUserActivity = ({ onFocus, onBlur }) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onBlur?.("TAB_HIDDEN");
      } else {
        onFocus?.("TAB_VISIBLE");
      }
    };

    const handleWindowBlur = () => {
      onBlur?.("WINDOW_BLUR");
    };

    const handleWindowFocus = () => {
      onFocus?.("WINDOW_FOCUS");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [onFocus, onBlur]);
};
