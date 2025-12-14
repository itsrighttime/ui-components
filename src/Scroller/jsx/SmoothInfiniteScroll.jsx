"use client";

import { useRef, useEffect } from "react";
import style from "../css/SmoothInfiniteScroll.module.css"; // Custom styles
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll.js";
import { Button } from "../../InputFields/Actions/jsx/Button.jsx";

/**
 * SmoothInfiniteScroll Component
 *
 * Renders a scrollable container with smooth infinite scrolling functionality.
 * Only a subset of the full dataset is rendered at a time to improve performance.
 *
 * Props:
 * @param {Array<any>} data - Full dataset to render.
 * @param {number} initialChunk - Number of items to render initially (default: 20).
 * @param {number} chunkSize - Number of items to append on "Load More" or scroll event (default: 10).
 * @param {number} maxItems - Maximum number of items to keep rendered in the container (default: 50).
 *
 * Features:
 * - Uses `useInfiniteScroll` hook to manage visible items and scrolling behavior.
 * - Renders visible items in a scrollable container (`scrollRef`).
 * - Includes a "Load More" button to append additional items manually.
 * - Supports optional auto-scroll behavior (commented out in code).
 *
 * Usage:
 * <SmoothInfiniteScroll
 *   data={myDataArray}
 *   initialChunk={20}
 *   chunkSize={10}
 *   maxItems={50}
 * />
 */
export const SmoothInfiniteScroll = ({
  data,
  initialChunk = 20,
  chunkSize = 10,
  maxItems = 50,
}) => {
  const scrollRef = useRef(null);
  const { visibleData, appendItems, restoreItems } = useInfiniteScroll({
    data,
    initialChunk,
    chunkSize,
    maxItems,
    scrollContainerRef: scrollRef,
  });

  //   // Optional: Auto-scroll to bottom (e.g., chat-like behavior)
  //   useEffect(() => {
  //     if (scrollRef.current) {
  //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //     }
  //   }, [visibleData]);

  return (
    <div className={style.scrollContainer} ref={scrollRef}>
      {visibleData.map((item, idx) => (
        <div className={style.scrollItem} key={idx}>
          {item}
        </div>
      ))}
      <div>
        <Button text="Load More" onClick={() => appendItems()} />
      </div>
    </div>
  );
};
