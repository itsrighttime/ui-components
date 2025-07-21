// helper/formatSingleTab.js
import { getIconByKey } from "./getIconByKey";

export const formatSingleTab = (tab, clickHandler, section) => ({
  ...tab,
  onClick: (clickedValue) =>
    clickHandler({
      tab: { key: clickedValue, ...section },
      value: tab.value,
    }).onClick(
      // TODO : handle title update for dropdowns --------------------------------
      clickedValue
    ),
  icon: tab.isIcon ? getIconByKey(tab.key) || null : null,
});
