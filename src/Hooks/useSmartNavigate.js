"use client";

import { useNavigate } from "react-router-dom";

/**
 * useSmartNavigate Hook
 *
 * Custom React hook that provides a unified navigation handler
 * for both internal routes (React Router) and external URLs.
 *
 * Automatically detects modifier keys (Ctrl, Cmd) and middle-click
 * interactions to support opening links in a new browser tab,
 * mimicking native anchor (`<a>`) behavior.
 *
 * Useful for buttons, list items, cards, or custom link components
 * that need intelligent navigation handling without duplicating logic.
 *
 * @hook
 *
 * @returns {Function} handleNavigate
 * Navigation handler function.
 *
 * @param {MouseEvent} event
 * Mouse or click event used to detect modifier keys or middle-click.
 *
 * @param {string} to
 * Target path or URL.
 * Can be a relative internal route (e.g., `/dashboard`)
 * or an absolute external URL (e.g., `https://example.com`).
 *
 * @example
 * const handleNavigate = useSmartNavigate();
 *
 * <div onClick={(e) => handleNavigate(e, "/profile")}>
 *   Go to Profile
 * </div>
 *
 * <div onClick={(e) => handleNavigate(e, "https://example.com")}>
 *   External Link
 * </div>
 *
 * @notes
 * - Supports Ctrl / Cmd + click and middle-click for new tab behavior
 * - Automatically distinguishes between internal and external URLs
 * - Uses `react-router-dom` navigation for internal routes
 * - Falls back to `window.location` for external navigation
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
