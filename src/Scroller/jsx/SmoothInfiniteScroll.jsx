import { useRef, useEffect } from "react";
import style from "../css/SmoothInfiniteScroll.module.css"; // Custom styles
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { Button } from "../../InputFields/Actions/jsx/Button";

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
      <div >
        <Button text="Load More" onClick={() => appendItems()} />
      </div>
    </div>
  );
};
