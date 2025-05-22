import { useState, useEffect, useCallback, useMemo } from "react";
import throttle from "lodash.throttle";
import {
  preserveScrollOnAppend,
  preserveScrollOnRestore,
} from "./helper/scroll.helper.js";
import {
  getAppendIndices,
  getRestoreIndices,
} from "./helper/pagination.helper.js";

/*


### **General Working Principle of the Infinite Scroll Hook**

1. **Start with a small chunk of data**
   When the list is first loaded, only a small portion (e.g. 10 items) is shown to avoid overloading the UI.

2. **Monitor scrolling behavior**
   The system watches when the user scrolls — either upward (to the top) or downward (to the bottom) 
   — using the scroll position of a container.

3. **Add more items as needed (scrolling down)**
   When the user reaches the bottom of the scroll area, more items are appended to the list, 
   extending the view gradually (e.g. adding 10 more each time).

4. **Limit how many items are shown at once**
   To prevent too much data from staying visible, the list is designed to only show up to a certain number of items (e.g. 50). 
   If that limit is hit, the visible window "slides forward" — older items are removed from the top as new ones are added at the bottom.

5. **Allow restoring items when scrolling back up**
   If the user scrolls back to the top, older items that were removed can be reloaded, effectively letting the user move backward through the list, too.

6. **Keep everything fast and smooth**
   The system uses throttling to ensure that scrolling doesn’t trigger too many updates too quickly, keeping the experience smooth and efficient.


### **In Short:**

> The hook shows a sliding window of items from a larger dataset. It loads more as you scroll down, 
and removes old ones to stay within a limit. If you scroll back up, it restores older items, 
creating a continuous and memory-efficient scrolling experience.


*/

export const useInfiniteScroll = ({
  data,
  initialChunk,
  chunkSize = 10,
  maxItems = 50,
  scrollContainerRef,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(initialChunk);
  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(initialChunk);
    setVisibleData(data.slice(0, initialChunk));
  }, [data, initialChunk]);

  const appendItems = useCallback(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const indices = getAppendIndices({
      startIndex,
      endIndex,
      chunkSize,
      maxItems,
      dataLength: data.length,
    });

    if (!indices) return;

    const prevScrollTop = container.scrollTop;
    const prevScrollHeight = container.scrollHeight;

    setStartIndex(indices.newStart);
    setEndIndex(indices.newEnd);
    setVisibleData(data.slice(indices.newStart, indices.newEnd));

    setTimeout(() => {
      preserveScrollOnAppend(container, prevScrollHeight, prevScrollTop);
    }, 0);
  }, [data, startIndex, endIndex, chunkSize, maxItems, scrollContainerRef]);

  const restoreItems = useCallback(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const indices = getRestoreIndices({
      startIndex,
      endIndex,
      chunkSize,
    });

    if (!indices) return;

    const prevScrollHeight = container.scrollHeight;

    setStartIndex(indices.newStart);
    setEndIndex(indices.newEnd);
    setVisibleData(data.slice(indices.newStart, indices.newEnd));

    setTimeout(() => {
      preserveScrollOnRestore(container, prevScrollHeight);
    }, 0);
  }, [startIndex, endIndex, data, chunkSize, scrollContainerRef]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const atBottom = scrollHeight - scrollTop - clientHeight < 5;
    const atTop = scrollTop === 0;

    if (atBottom) appendItems();
    if (atTop) restoreItems();
  }, [appendItems, restoreItems, scrollContainerRef]);

  const throttledScroll = useMemo(() => {
    return throttle(handleScroll, 100);
  }, [handleScroll]);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;
    container.addEventListener("scroll", throttledScroll);
    return () => {
      container.removeEventListener("scroll", throttledScroll);
    };
  }, [throttledScroll, scrollContainerRef]);

  return {
    visibleData,
    appendItems,
    restoreItems,
  };
};
