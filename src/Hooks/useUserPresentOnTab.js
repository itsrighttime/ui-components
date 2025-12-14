import { useEffect } from "react";

/**
 * useUserPresentOnTab Hook
 *
 * Custom React hook to track when the user switches browser tabs
 * or moves between applications, providing callbacks for visibility
 * and focus changes.
 *
 * Useful for pausing/resuming tasks, analytics tracking, or
 * real-time updates when the user is actively viewing the tab.
 *
 * @hook
 *
 * @param {Object} callbacks - Callback functions for tab and window events.
 *
 * @param {function} [callbacks.onFocus] - Called when the user returns
 *   to the tab or window. Receives a string indicating the focus type:
 *   "TAB_VISIBLE" | "WINDOW_FOCUS".
 *
 * @param {function} [callbacks.onBlur] - Called when the user leaves
 *   the tab or window. Receives a string indicating the blur type:
 *   "TAB_HIDDEN" | "WINDOW_BLUR".
 *
 * @example
 * useUserPresentOnTab({
 *   onFocus: (type) => console.log("User focused:", type),
 *   onBlur: (type) => console.log("User left:", type),
 * });
 *
 * @notes
 * - Listens to `document.visibilitychange`, `window.blur`, and `window.focus` events
 * - Automatically cleans up event listeners on unmount
 * - `onFocus` and `onBlur` are optional
 */
export const useUserPresentOnTab = ({ onFocus, onBlur }) => {
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
