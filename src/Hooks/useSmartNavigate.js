import { useNavigate } from "react-router-dom";

/**
 * useSmartNavigate
 *
 * Smart navigation hook for both internal (React Router)
 * and external (absolute URL) navigation.
 * Supports modifier keys (Ctrl/Cmd/Middle-click) for new tab behavior.
 *
 * @returns {Function} handleNavigate - (event, to)
 */
export const useSmartNavigate = () => {
  const navigate = useNavigate();

  const handleNavigate = (event, to) => {
    if (!to) return;

    console.log("Navigating to:", to);

    // Detect modifier keys or middle click
    const openInNewTab =
      event?.ctrlKey || event?.metaKey || event?.button === 1;

    // Determine if target is external
    const isExternal = /^https?:\/\//i.test(to);

    if (isExternal) {
      // External link
      if (openInNewTab) {
        window.open(to, "_blank");
      } else {
        window.location.href = to;
      }
    } else {
      // Internal route
      if (openInNewTab) {
        window.open(window.location.origin + to, "_blank");
      } else {
        navigate(to);
      }
    }
  };

  return handleNavigate;
};
