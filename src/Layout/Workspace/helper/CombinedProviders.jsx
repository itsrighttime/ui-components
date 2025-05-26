// CombinedProviders.js
import { AuthProvider } from "../../../Context/jsx/AuthContext";
import { DynamicProvider } from "../../../Context/jsx/DynamicContext";
import { TabsHandlerProvider } from "../../../Context/jsx/TabsHandlerContext";

export const CombinedProviders = ({ children, tabsHandler }) => (
  <AuthProvider>
    <DynamicProvider>
      <TabsHandlerProvider tabsHandler={tabsHandler}>
        {children}
      </TabsHandlerProvider>
    </DynamicProvider>
  </AuthProvider>
);
