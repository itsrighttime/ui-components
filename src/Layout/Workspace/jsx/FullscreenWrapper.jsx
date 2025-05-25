import { useRef, useEffect } from "react";
import styles from "../css/FullscreenWrapper.module.css";

export const FullscreenWrapper = ({ children, shortcutKey = "`" }) => {
  const containerRef = useRef();

  const enterFullScreen = () => {
    const el = containerRef.current;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) enterFullScreen();
    else exitFullScreen();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === shortcutKey) {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className={styles.fullscreenWrapper}>
      {typeof children === "function"
        ? children({ toggleFullscreen })
        : children}
    </div>
  );
};
