// TabsHandlerContext.jsx
import { createContext, useContext } from "react";

const TabsHandlerContext = createContext();

export const TabsHandlerProvider = ({ children, tabsHandler }) => {
  return (
    <TabsHandlerContext.Provider value={tabsHandler}>
      {children}
    </TabsHandlerContext.Provider>
  );
};

export const useTabHandler = () => useContext(TabsHandlerContext);
