// helper/formatSingleTab.js
import { getIconByKey } from "./getIconBYKey";

export const formatSingleTab = (tab, clickHandler, section) => ({
  ...tab,
  onClick: () =>
    clickHandler({ key: tab.key, ...section }, tab.value).onClick(tab.key),
  icon: tab.isIcon ? getIconByKey(tab.key) || null : null,
});
