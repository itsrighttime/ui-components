import { Workspace } from "../../Layout/Workspace/jsx/Workspace.jsx";
import { handleOnClick, tabsHandler } from "./helper/tabsHandler.js";

export const UseLayoutExample = () => {
  return <Workspace tabClickHandler={handleOnClick} />;
};
