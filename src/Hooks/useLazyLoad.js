import { useEffect, useState } from "react";

/**
 * useLazyLoad Hook
 *
 * Custom React hook that detects when a DOM element becomes visible
 * in the viewport using the Intersection Observer API.
 *
 * Commonly used to lazily load images, components, or data only
 * when they are about to enter the user's view, improving
 * performance and reducing initial load time.
 *
 * @hook
 *
 * @param {React.RefObject<HTMLElement>} ref
 * Ref attached to the target DOM element to observe.
 *
 * @returns {boolean} isVisible
 * Indicates whether the observed element has entered the viewport.
 *
 * @example
 * const ref = useRef(null);
 * const isVisible = useLazyLoad(ref);
 *
 * return (
 *   <div ref={ref}>
 *     {isVisible && <HeavyComponent />}
 *   </div>
 * );
 *
 * @notes
 * - Observer disconnects after the element becomes visible
 * - Uses a visibility threshold of 10%
 * - Automatically cleans up observer on component unmount
 */

export const useLazyLoad = (ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current; // Copy ref.current to a local variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Use the local variable here
      }
    };
  }, [ref]);

  return isVisible;
};
