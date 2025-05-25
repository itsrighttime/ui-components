import { WorkspaceLayoutFullScreen } from "../../Layout/Workspace/jsx/WorkspaceLayoutFullScreen";
import { tabsHandler } from "./helper/tabsHandler";

tabsHandler;
export const UseLayoutExample = () => {
  return <WorkspaceLayoutFullScreen tabsHandler={tabsHandler} />;
};
