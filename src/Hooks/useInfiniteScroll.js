import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = (data, initialChunk, chunkSize = 10, maxItems = 50) => {
    const [visibleData, setVisibleData] = useState([]); // Initialize as empty
    const [removedChunkIndices, setRemovedChunkIndices] = useState([]); // Store removed chunks by index
    const [removeStartIndx, setRemoveStartIndx] = useState(0); // Store start index of removed items

    // Use effect to set initial visible data
    useEffect(() => {
        setVisibleData(data.slice(0, initialChunk)); // Set initially visible items
    }, [data, initialChunk]);


    const appendItems = useCallback(() => {
        const currentLength = visibleData.length;
        const newItems = data.slice(currentLength, currentLength + chunkSize);

        let updatedData = [...visibleData, ...newItems];

        // If we've reached the maxItems limit, remove items from the start
        if (updatedData.length > maxItems) {
            const removedIndices = { startIndex: removeStartIndx, endIndex: removeStartIndx + chunkSize - 1 };
            setRemoveStartIndx(removeStartIndx + chunkSize);

            // Track removed indices using the actual data indices
            setRemovedChunkIndices((prev) => [...prev, { ...removedIndices }]);

            // Remove items from the start
            updatedData = updatedData.slice(chunkSize);
        }

        setVisibleData(updatedData);
    }, [data, visibleData, chunkSize, maxItems, removeStartIndx]);

    const restoreRemovedItems = useCallback(() => {
        if (removedChunkIndices.length > 0) {
            // Get the last removed chunk indices
            const lastRemovedChunk = removedChunkIndices[removedChunkIndices.length - 1];
            const restoredItems = data.slice(lastRemovedChunk.startIndex, lastRemovedChunk.endIndex + 1);

            // Restore the removed chunk at the start
            setVisibleData((prev) => [...restoredItems, ...prev.slice(0, prev.length - chunkSize)]);

            // Update the removed chunk stack
            setRemovedChunkIndices((prev) => prev.slice(0, -1)); // Remove last index from stack
        }
    }, [removedChunkIndices, data, chunkSize]);

    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        console.log("Scroll: ", scrollTop, scrollHeight, clientHeight)

        // Check if user has scrolled to the bottom
        const atBottom = scrollHeight - scrollTop === clientHeight;
        if (atBottom) {
            appendItems();
        }

        // Check if user is back at the top
        const atTop = scrollTop === 0;
        if (atTop && removedChunkIndices.length > 0) {
            restoreRemovedItems();
        }
    }, [appendItems, restoreRemovedItems, removedChunkIndices]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]); // Only depend on handleScroll

    // console.log("Visible Data: ", visibleData);
    return { visibleData, appendItems };
};

export default useInfiniteScroll;
