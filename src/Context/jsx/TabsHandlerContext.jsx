// TabsHandlerContext.jsx
"use client";

import { createContext, useContext } from "react";

/**
 * TabsHandlerContext
 *
 * React Context used to share a centralized tab-click handler
 * across tab-based UI components.
 *
 * Enables consistent tab interaction logic without prop drilling,
 * especially useful in complex layouts or nested tab structures.
 *
 * @context
 */
const TabsHandlerContext = createContext();

/**
 * TabsHandlerProvider Component
 *
 * Provides a tab click handler function to all descendant components
 * via `TabsHandlerContext`.
 *
 * Intended to decouple tab UI components from business logic
 * such as routing, analytics, or state synchronization.
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {React.ReactNode} props.children
 * Child components that require access to the tab click handler.
 *
 * @param {Function} props.tabClickHandler
 * Callback executed when a tab is clicked.
 * Typically receives tab metadata (id, index, label, etc.).
 *
 * @returns {JSX.Element} Tabs handler context provider
 *
 * @example
 * <TabsHandlerProvider tabClickHandler={handleTabChange}>
 *   <Tabs />
 * </TabsHandlerProvider>
 */
export const TabsHandlerProvider = ({ children, tabClickHandler }) => {
  return (
    <TabsHandlerContext.Provider value={{ tabClickHandler }}>
      {children}
    </TabsHandlerContext.Provider>
  );
};

/**
 * useTabHandler Hook
 *
 * Custom hook for accessing the shared tab click handler
 * from `TabsHandlerContext`.
 *
 * @returns {Object} Context value
 *
 * @property {Function} tabClickHandler
 * Function invoked when a tab interaction occurs.
 *
 * @example
 * const { tabClickHandler } = useTabHandler();
 *
 * tabClickHandler(tabId);
 */
export const useTabHandler = () => useContext(TabsHandlerContext);
