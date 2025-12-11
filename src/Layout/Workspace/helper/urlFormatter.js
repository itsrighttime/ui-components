import { toKebabCase } from "../../../utils/caseConverter.js";

export const makeUrl = (
  { level, zone, position, key, workspaceId },
  isWorkspace
) => {
  const workspace = isWorkspace ? key : workspaceId;
  const usedKey = isWorkspace ? "home" : key;
  const parts = [workspace, level, zone, position, usedKey].map(toKebabCase);
  return `/workspace/${parts.join("/")}`;
};
