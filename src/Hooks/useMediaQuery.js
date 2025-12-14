import { useState, useEffect } from "react";

/**
 * useMediaQuery Hook
 *
 * Custom React hook for detecting whether the current viewport width
 * is below or equal to a specified breakpoint.
 *
 * Useful for building responsive components and conditionally
 * rendering UI based on device or screen size.
 *
 * @hook
 *
 * @param {number} [breakpoint=900]
 * Screen width (in pixels) used as the threshold for determining
 * a small device.
 *
 * @returns {boolean} isSmallDevice
 * `true` if the viewport width is less than or equal to the breakpoint,
 * otherwise `false`.
 *
 * @example
 * const isMobile = useMediaQuery(768);
 *
 * return (
 *   <div>
 *     {isMobile ? <MobileLayout /> : <DesktopLayout />}
 *   </div>
 * );
 *
 * @notes
 * - Listens to window resize events to update state
 * - Ideal for layout-level responsiveness
 * - Assumes a browser environment (accesses `window`)
 */

export const useMediaQuery = (breakpoint = 900) => {
  const [isSmallDevice, setIsSmallDevice] = useState(
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () =>
      setIsSmallDevice(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isSmallDevice;
};
