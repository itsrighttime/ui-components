import { camelToKebab } from "../../../utils/caseConverter";

export const makeUrl = (
  { level, zone, position, key, workspaceId },
  isWorkspace
) => {
  const workspace = isWorkspace ? key : workspaceId;
  const usedKey = isWorkspace ? "home" : key;
  const parts = [workspace, level, zone, position, usedKey].map(camelToKebab);
  return `/workspace/${parts.join("/")}`;
};
