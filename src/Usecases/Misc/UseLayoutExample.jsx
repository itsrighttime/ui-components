import { Workspace } from "../../Layout/Workspace/jsx/Workspace";
import { tabsHandler } from "./helper/tabsHandler";

export const UseLayoutExample = () => {
  return <Workspace tabsHandler={tabsHandler} />;
};
