"use client";

import { useRef, useEffect } from "react";
import styles from "../css/FullscreenWrapper.module.css";

/**
 * FullscreenWrapper Component
 *
 * Provides a container that can toggle fullscreen mode for its content.
 * Supports programmatic toggling and keyboard shortcut activation.
 *
 * Props:
 * @param {React.ReactNode|function} children - Content to render inside the wrapper.
 *   - If a function is provided, it receives an object `{ toggleFullscreen }`
 *     to allow manual fullscreen toggling from within the children.
 * @param {string} shortcutKey - Keyboard key used in combination with Ctrl to toggle fullscreen (default: "`").
 *
 * Behavior:
 * - Wraps its children in a container with a ref to request fullscreen.
 * - Uses browser-specific APIs to enter and exit fullscreen mode.
 * - Listens for `Ctrl + shortcutKey` to toggle fullscreen.
 */
export const FullscreenWrapper = ({ children, shortcutKey = "`" }) => {
  const containerRef = useRef();

  const enterFullScreen = () => {
    const el = containerRef.current;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  const exitFullScreen = () => {
    if (typeof document === "undefined") return;

    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  };

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;

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
