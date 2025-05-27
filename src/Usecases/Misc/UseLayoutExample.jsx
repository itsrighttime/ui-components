import { Workspace } from "../../Layout/Workspace/jsx/Workspace";
import { handleOnClick, tabsHandler } from "./helper/tabsHandler";

export const UseLayoutExample = () => {
  return <Workspace tabClickHandler={handleOnClick} />;
};
