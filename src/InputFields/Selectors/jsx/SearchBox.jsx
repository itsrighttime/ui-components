import { useState, useEffect, useRef } from "react";
import styles from "../css/SearchBox.module.css";
import { searchIcon } from "../../../utils/icons";
import {
  filterSuggestions,
  handleKeyDown,
  handleClickOutside,
} from "../helper/searchBoxHelper";
import { IconButton } from "../../Actions/jsx/IconButton";

export const SearchBox = ({
  suggestions,
  setResult,
  color,
  placeholder = "Search...",
  width = "300px",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3) {
      const filtered = filterSuggestions(suggestions, value);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setHighlightedIndex(0); // Highlight the first suggestion
    } else {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200); // Delay to allow click events to register
  };

  const handleInputFocus = () => {
    if (inputValue.length >= 3) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    setResult(suggestion.code);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleOutsideClick = handleClickOutside(
      searchBoxRef,
      setShowSuggestions
    );
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleIconClick = () => {
    inputRef.current.focus();
    const filtered = filterSuggestions(suggestions, inputValue);
    if (filtered.length > 0) {
      setShowSuggestions(true);
      setHighlightedIndex(0); // Highlight the first suggestion
    } else {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
    "--width": width,
  };

  return (
    <div ref={searchBoxRef} className={styles.searchBox} style={cssVariable}>
      <div className={styles.nameIcon}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              showSuggestions,
              filteredSuggestions,
              handleSuggestionClick,
              highlightedIndex,
              setHighlightedIndex
            )
          }
          placeholder={placeholder}
          className={styles.input}
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-activedescendant={
            highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
          }
        />
        <div className={styles.search} onMouseDown={(e) => e.preventDefault()}>
          <IconButton
            icon={searchIcon}
            onClick={handleIconClick}
            label={"Search"}
            color={color}
          />
        </div>
      </div>
      {showSuggestions && (
        <ul
          id="suggestions-list"
          className={styles.suggestionsList}
          role="listbox"
        >
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion.code}
                id={`suggestion-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`${styles.suggestionItem} ${
                  index === highlightedIndex ? styles.highlighted : ""
                }`}
                role="option"
                aria-selected={index === highlightedIndex}
              >
                {suggestion.name}
              </li>
            ))
          ) : inputValue.length >= 3 ? (
            <li className={styles.suggestionItem}>No suggestions</li>
          ) : null}
        </ul>
      )}
    </div>
  );
};
