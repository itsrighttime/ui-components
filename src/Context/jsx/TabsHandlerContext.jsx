// TabsHandlerContext.jsx
import { createContext, useContext } from "react";

const TabsHandlerContext = createContext();

export const TabsHandlerProvider = ({ children, tabClickHandler }) => {
  return (
    <TabsHandlerContext.Provider value={tabClickHandler}>
      {children}
    </TabsHandlerContext.Provider>
  );
};

export const useTabHandler = () => useContext(TabsHandlerContext);
