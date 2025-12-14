"use client";

import { useEffect } from "react";

/**
 * useOutsideClick Hook
 *
 * Custom React hook that detects clicks occurring outside
 * of a specified DOM element and triggers a callback.
 *
 * Commonly used for closing dropdowns, modals, popovers,
 * or any overlay components when the user clicks outside
 * of their boundaries.
 *
 * @hook
 *
 * @param {React.RefObject<HTMLElement>} ref
 * Ref pointing to the element that should be excluded
 * from outside click detection.
 *
 * @param {Function} handler
 * Callback function executed when a click occurs
 * outside the referenced element.
 *
 * @example
 * const ref = useRef(null);
 * useOutsideClick(ref, () => setOpen(false));
 *
 * return (
 *   <div ref={ref}>
 *     Dropdown Content
 *   </div>
 * );
 *
 * @notes
 * - Listens to `mousedown` events at the document level
 * - Automatically cleans up event listeners on unmount
 * - Safe against null or unmounted refs
 * - Only runs in browser environment (client-side)
 */

export const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    // Guard: Only run in browser environment
    if (typeof document === 'undefined') return;

    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};