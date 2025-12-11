// CombinedProviders.js
import { AuthProvider } from "../../../Context/jsx/AuthContext.jsx";
import { DynamicProvider } from "../../../Context/jsx/DynamicContext.jsx";
import { TabsHandlerProvider } from "../../../Context/jsx/TabsHandlerContext.jsx";

export const CombinedProviders = ({ children, tabClickHandler, workspace }) => (
  <AuthProvider workspace={workspace}>
    <DynamicProvider>
      <TabsHandlerProvider tabClickHandler={tabClickHandler}>
        {children}
      </TabsHandlerProvider>
    </DynamicProvider>
  </AuthProvider>
);
