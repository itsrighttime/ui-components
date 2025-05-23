import { useState, useRef, useEffect } from "react";
import styles from "../css/Dropdown.module.css"; // Import your CSS module for styling
import { downArrowIcon, upArrowIcon } from "../../../utils/icons";
import { IconButton } from "../../Actions/jsx/IconButton";

export const Dropdown = ({
  options = [],
  multiple = false,
  placeholder = "Select...",
  label,
  setResult,
  color,
  value = [],
  addNew = false,
  setAddedOptions,
  width = "300px",
}) => {
  // console.log(options)
  const [isOpen, setIsOpen] = useState(false);
  const [allOptions, setAllOptions] = useState(options);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState(value);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOption, setNewOption] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelectOption = (option) => {
    let updatedSelections;
    if (multiple) {
      updatedSelections = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
    } else {
      updatedSelections = [option];
      setIsOpen(false);
    }
    setSelectedOptions(updatedSelections);
    setResult(updatedSelections);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    setFilteredOptions(
      allOptions.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleAddOption = () => {
    if (newOption && !allOptions.includes(newOption)) {
      const updatedOptions = [...allOptions, newOption];
      setAllOptions(updatedOptions);
      setFilteredOptions(updatedOptions);
      setAddedOptions(updatedOptions);
      setNewOption("");
      setSearchTerm("");
      // handleSelectOption(newOption);
      setResult(selectedOptions);
    }
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);
    setResult([]);
  };

  const handleHeaderClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
    "--width": width,
  };

  return (
    <div
      className={styles.dropdown}
      ref={dropdownRef}
      tabIndex={0} // Makes the div focusable
      style={cssVariable}
    >
      <div className={styles.label}>{label}</div>
      <div
        className={`${styles.dropdownHeader} ${isOpen ? styles.open : ""}`}
        onClick={handleHeaderClick}
      >
        <span>
          {selectedOptions.length ? selectedOptions.join(", ") : placeholder}
        </span>

        {isOpen ? (
          <IconButton icon={upArrowIcon} label={"Open Dropdown"} />
        ) : (
          <IconButton icon={downArrowIcon} label={"Close Dropdown"} />
        )}
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className={styles.searchInput}
          />

          <ul className={styles.optionList}>
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`${styles.optionItem} ${
                    selectedOptions.includes(option) ? styles.selected : ""
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className={styles.optionItem}>No Options Available</li>
            )}
          </ul>

          {addNew && (
            <div className={styles.addNewOption}>
              <input
                type="text"
                value={newOption}
                onChange={(e) => {
                  setNewOption(e.target.value);
                }}
                placeholder="Add new option"
              />
              <button onClick={handleAddOption}>Add</button>
            </div>
          )}
          {multiple && selectedOptions.length > 0 && (
            <button
              className={styles.clearButton}
              onClick={handleClearSelection}
            >
              Clear Selection
            </button>
          )}
        </div>
      )}
    </div>
  );
};
