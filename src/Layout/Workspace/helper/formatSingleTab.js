// helper/formatSingleTab.js
import { getIconByKey } from "./getIconBYKey";

export const formatSingleTab = (tab, clickHandler, section) => ({
  ...tab,
  onClick: (clickedValue) =>
    clickHandler({ key: clickedValue, ...section }, tab.value).onClick(
      clickedValue
    ),
  icon: tab.isIcon ? getIconByKey(tab.key) || null : null,
});
