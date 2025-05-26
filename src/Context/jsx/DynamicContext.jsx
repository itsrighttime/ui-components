import { createContext, useContext, useState } from "react";

const DynamicContext = createContext();

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

// Custom hook for easier use
export const useDynamicContent = () => useContext(DynamicContext);
