export const filterSuggestions = (suggestions, value) => {
    return suggestions
        .filter((suggestion) =>
            suggestion.name.toLowerCase().includes(value.toLowerCase())
        )
        .map((suggestion) => ({
            code: suggestion.code,
            name: suggestion.name,
        }));
};

export const handleKeyDown = (e, showSuggestions, filteredSuggestions, handleSuggestionClick, highlightedIndex, setHighlightedIndex) => {
    if (showSuggestions) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => {
                const nextIndex = Math.min(prev + 1, filteredSuggestions.length - 1);
                if (nextIndex !== prev) {
                    document
                        .getElementById(`suggestion-${nextIndex}`)
                        .scrollIntoView({ block: "nearest", behavior: "smooth" });
                }
                return nextIndex;
            });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => {
                const nextIndex = Math.max(prev - 1, 0);
                if (nextIndex !== prev) {
                    document
                        .getElementById(`suggestion-${nextIndex}`)
                        .scrollIntoView({ block: "nearest", behavior: "smooth" });
                }
                return nextIndex;
            });
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0) {
                handleSuggestionClick(filteredSuggestions[highlightedIndex]);
            }
        }
    }
};

export const handleClickOutside = (searchBoxRef, setShowSuggestions) => {
    return (event) => {
        if (
            searchBoxRef.current &&
            !searchBoxRef.current.contains(event.target)
        ) {
            setShowSuggestions(false);
        }
    };
};
