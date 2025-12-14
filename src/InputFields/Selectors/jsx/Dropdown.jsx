"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../css/Dropdown.module.css";
import { arrowDownIcon, arrowUpIcon } from "../../../utils/icons.jsx";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { Button } from "../../Actions/jsx/Button.jsx";
import { useSmartPosition } from "../../../Hooks/useSmartPosition.js";

/**
 * `Dropdown` is a React component that renders a customizable dropdown/select input.
 * It supports single or multiple selections, search filtering, and optional ability to add new options.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Array<string>} [props.options=[]] - List of initial options to display in the dropdown.
 * @param {boolean} [props.multiple=false] - Whether multiple selections are allowed.
 * @param {string} [props.placeholder="Select..."] - Placeholder text when no option is selected.
 * @param {string} [props.label] - Label to display above the dropdown.
 * @param {function} props.setResult - Callback invoked with the currently selected option(s).
 * @param {string} [props.color] - Primary color for the dropdown (used for highlights, buttons, etc.).
 * @param {Array<string>} [props.value=[]] - Initial selected option(s).
 * @param {boolean} [props.addNew=false] - Whether to allow adding new options dynamically.
 * @param {function} [props.setAddedOptions] - Callback invoked with updated options when a new option is added.
 * @param {string} [props.width="300px"] - Width of the dropdown.
 * @param {boolean} [props.showLabelAlways=false] - Whether to always show the label even if nothing is selected.
 * @param {boolean} [props.required=false] - Whether the field is required (renders an asterisk if true).
 *
 * @example
 * <Dropdown
 *   options={['Option 1', 'Option 2']}
 *   multiple={true}
 *   label="Choose Options"
 *   setResult={(selected) => console.log(selected)}
 *   color="#52c9bd"
 *   addNew={true}
 * />
 *
 * @returns {JSX.Element} A dropdown component supporting search, multiple selection, and add-new-option functionality.
 */
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
  showLabelAlways = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allOptions, setAllOptions] = useState(options);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOption, setNewOption] = useState("");

  const dropdownRef = useRef(null);
  const position = useSmartPosition(dropdownRef);

  useEffect(() => {
    if (value.length > 0 && selectedOptions.length === 0)
      value && setSelectedOptions(value);
  }, [value]);

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
  }, []);

  const handleSelectOption = (option) => {
    const updatedSelections = multiple
      ? selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option]
      : [option];

    setSelectedOptions(updatedSelections);
    setResult(updatedSelections);
    if (!multiple) setIsOpen(false);
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
    const trimmed = newOption.trim();
    if (trimmed && !allOptions.includes(trimmed)) {
      const updated = [...allOptions, trimmed];
      setAllOptions(updated);
      setFilteredOptions(updated);
      setAddedOptions?.(updated);
      setNewOption("");
      setSearchTerm("");
    }
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);
    setResult([]);
  };

  const handleHeaderClick = () => setIsOpen((prev) => !prev);

  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--width": width,
  };

  return (
    <div
      className={styles.dropdown}
      ref={dropdownRef}
      tabIndex={0}
      style={cssVariable}
    >
      {required && <p className={styles.required}>*</p>}
      {(selectedOptions.length > 0 || showLabelAlways) && label && (
        <div className={styles.label}>{label}</div>
      )}

      <div
        className={`${styles.dropdownHeader} ${isOpen ? styles.open : ""}`}
        onClick={handleHeaderClick}
      >
        {selectedOptions.length ? (
          <span>{selectedOptions.join(", ")}</span>
        ) : (
          <span style={{ color: "var(--colorGray4)" }}>{placeholder}</span>
        )}

        <IconButton
          icon={isOpen ? arrowUpIcon : arrowDownIcon}
          label={isOpen ? "Close Dropdown" : "Open Dropdown"}
          color={color}
        />
      </div>

      {isOpen && (
        <div
          className={`${styles.dropdownMenu} ${
            position.vertical === "top" ? styles.dropTop : styles.dropBottom
          } ${
            position.horizontal === "left"
              ? styles.alignLeft
              : styles.alignRight
          }`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className={styles.searchInput}
          />

          <div className={styles.dropdownOptions}>
            <ul className={styles.optionList}>
              {filteredOptions.length > 0 ? (
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
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option"
                />
                <Button text="Add" onClick={handleAddOption} color={color} />
              </div>
            )}

            {selectedOptions.length > 0 && (
              <div className={styles.buttons}>
                <Button
                  onClick={handleClearSelection}
                  text="Clear Selection"
                  width="90%"
                  color={color}
                />
                <Button
                  onClick={handleHeaderClick}
                  text="Done"
                  width="90%"
                  color={color}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
