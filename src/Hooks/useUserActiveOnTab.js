import { useEffect, useRef, useState } from "react";

/** timeout in minutes */
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
