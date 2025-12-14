"use client"

import { createContext, useContext, useState } from "react";
/**
 * DynamicContext
 *
 * A generic React Context for managing dynamic, key-value–based
 * shared state across the application.
 *
 * Useful for:
 * - Cross-component communication
 * - Temporary UI state (modals, banners, flags)
 * - Feature-level dynamic data storage
 *
 * @context
 */
const DynamicContext = createContext();

/**
 * DynamicProvider Component
 *
 * Provides a flexible key-value store to its child components,
 * allowing values to be added, updated, retrieved, removed,
 * or fully reset at runtime.
 *
 * Designed as a lightweight alternative to global state libraries
 * for non-persistent, dynamic data.
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {React.ReactNode} props.children
 * Child components that require access to the dynamic context.
 *
 * @returns {JSX.Element} Dynamic context provider wrapper
 *
 * @example
 * <DynamicProvider>
 *   <App />
 * </DynamicProvider>
 */
export const DynamicProvider = ({ children }) => {
  const [state, setState] = useState({});

  // Add or update a key-value pair
  const setValue = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Remove a key
  const removeValue = (key) => {
    setState((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  // Reset all context values
  const resetContext = () => setState({});

  const getValue = (key) => {
    return state[key] || null;
  };

  return (
    <DynamicContext.Provider
      value={{ state, setValue, removeValue, resetContext, getValue }}
    >
      {children}
    </DynamicContext.Provider>
  );
};

/**
 * useDynamicContent Hook
 *
 * Custom hook for accessing and manipulating values
 * from `DynamicContext`.
 *
 * @returns {Object} Dynamic context API
 *
 * @property {Object} state
 * Complete key-value store of the dynamic context.
 *
 * @property {Function} setValue
 * Adds or updates a value in the context.
 * @param {string} key - Unique identifier for the value
 * @param {*} value - Any serializable value to store
 *
 * @property {Function} removeValue
 * Removes a key and its associated value from the context.
 * @param {string} key - Key to remove
 *
 * @property {Function} resetContext
 * Clears all stored values from the context.
 *
 * @property {Function} getValue
 * Retrieves a value by key.
 * @param {string} key - Key to retrieve
 * @returns {*|null} Stored value or `null` if not found
 *
 * @example
 * const { setValue, getValue, removeValue } = useDynamicContent();
 *
 * setValue("activeModal", "login");
 * const modal = getValue("activeModal");
 */
export const useDynamicContent = () => useContext(DynamicContext);
