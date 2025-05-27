// CombinedProviders.js
import { AuthProvider } from "../../../Context/jsx/AuthContext";
import { DynamicProvider } from "../../../Context/jsx/DynamicContext";
import { TabsHandlerProvider } from "../../../Context/jsx/TabsHandlerContext";

export const CombinedProviders = ({ children, tabClickHandler, workspace }) => (
  <AuthProvider workspace={workspace}>
    <DynamicProvider>
      <TabsHandlerProvider tabClickHandler={tabClickHandler}>
        {children}
      </TabsHandlerProvider>
    </DynamicProvider>
  </AuthProvider>
);
