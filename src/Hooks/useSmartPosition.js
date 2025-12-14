import { useEffect, useState } from "react";

/**
 * useSmartPosition Hook
 *
 * Custom React hook to determine the optimal vertical and horizontal
 * position of a DOM element relative to the viewport.
 *
 * Useful for positioning popovers, tooltips, dropdowns, or any
 * overlay component to ensure it remains fully visible on screen.
 *
 * @hook
 *
 * @param {React.RefObject<HTMLElement>} ref
 * Ref pointing to the target DOM element to position.
 *
 * @returns {Object} position
 * Object containing computed vertical and horizontal positions.
 *
 * @property {"top"|"bottom"} position.vertical
 * Recommended vertical position of the element relative to the reference.
 * Defaults to "bottom" if there is sufficient space below.
 *
 * @property {"left"|"right"} position.horizontal
 * Recommended horizontal position of the element relative to the reference.
 * Defaults to "right" if there is sufficient space on the right.
 *
 * @example
 * const ref = useRef(null);
 * const position = useSmartPosition(ref);
 *
 * return (
 *   <Tooltip ref={ref} position={position}>
 *     Hover me
 *   </Tooltip>
 * );
 *
 * @notes
 * - Recalculates position on window resize
 * - Chooses the side with sufficient space to fully display the element
 * - Returns default positions if there is enough space
 */
export const useSmartPosition = (ref) => {
  const [position, setPosition] = useState({
    vertical: "bottom",
    horizontal: "right",
  });

  useEffect(() => {
    const checkPosition = () => {
      const el = ref.current;
      if (!el) return;

      const { top, bottom, left, right } = el.getBoundingClientRect();
      const { offsetWidth: width, offsetHeight: height } = el;
      const { innerHeight: vh, innerWidth: vw } = window;

      const space = {
        below: vh - bottom,
        above: top,
        right: vw - right,
        left: left,
      };

      setPosition({
        vertical:
          space.below < height && space.above >= height ? "top" : "bottom",
        horizontal:
          space.right < width && space.left >= width ? "left" : "right",
      });
    };

    checkPosition();
    window.addEventListener("resize", checkPosition);
    return () => window.removeEventListener("resize", checkPosition);
  }, [ref]);

  return position;
};
