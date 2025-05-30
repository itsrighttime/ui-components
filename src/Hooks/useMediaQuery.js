import { useState, useEffect } from "react";

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
