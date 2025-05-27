import { camelToKebab } from "../../../utils/caseConverter";

export const makeUrl = (
  { level, zone, position, key },
  workspace = "letsDiscuss"
) => {
  const parts = [workspace, level, zone, position, key].map(camelToKebab);
  return `/workspace/${parts.join("/")}`;
};
