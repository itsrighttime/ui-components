// hooks/useWorkspaceLayout.js
import { useEffect, useState, useMemo } from "react";
import { workspaceLayoutApi } from "../helper/workspaceLayoutApi";
import { formateTabsDetails } from "../helper/formateTabsDetails";
import { workspaceKeys } from "./workspaceKeys";
import { useTabHandler } from "../../../Context/jsx/TabsHandlerContext";
import { useDynamicContent } from "../../../Context/jsx/DynamicContext";
import { useAuth } from "../../../Context/jsx/AuthContext";
import { setDocumentTitle } from "../../../utils/setDocumentTitle";
import { useNavigate, useParams } from "react-router-dom";
import { makeUrl } from "./urlFormatter";

export const useWorkspaceLayout = ({
  api,
  level,
  maxDepth,
  providedTabs,
  providedContent,
  toggleFullscreen,
}) => {
  const [tabsPrimary, setTabsPrimary] = useState(providedTabs);
  const [tabsSecondary, setTabsSecondary] = useState(null);
  const [content, setContent] = useState(providedContent);
  const { tabClickHandler } = useTabHandler();
  const { getValue, setValue } = useDynamicContent();
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const {
    workspaceId,
    level: levelParam,
    zone,
    position,
    tabKey,
  } = useParams();

  const handleMagicLock = getValue(workspaceKeys.magicLock);
  const navigatorSize = "32px";

  const defaultTabsHandler = {
    [workspaceKeys.magicLock]: handleMagicLock,
    [workspaceKeys.logout]: handleLogout,
  };

  const clickHandler = (tab, value) => {
    value && setDocumentTitle(value);
    navigate(makeUrl(tab));
    return {
      ...defaultTabsHandler,
      onClick: tabClickHandler,
    };
  };

  useEffect(() => {
    if (level === 1 && api) {
      const response = workspaceLayoutApi(api);
      setValue(workspaceKeys.tabClickedKey, tabKey);

      const formattedTabs = formateTabsDetails({
        data: response,
        toggleFullscreen,
        clickHandler,
      });

      setTabsPrimary(formattedTabs.primary);
      setTabsSecondary(formattedTabs.secondary);
      setContent(response.content.data);
    }
  }, [
    api,
    level,
    handleMagicLock,
    workspaceId,
    levelParam,
    zone,
    position,
    tabKey,
  ]);

  const cssVariable = useMemo(() => {
    const heightFactor =
      Number(Boolean(tabsPrimary?.commandBar)) +
      Number(Boolean(tabsPrimary?.statusBar));
    const widthFactor =
      Number(Boolean(tabsPrimary?.sidebar)) +
      Number(Boolean(tabsPrimary?.tools));
    const value = parseFloat(navigatorSize);

    return {
      "--navigatorSize": navigatorSize,
      "--navigatorHeight": `${heightFactor * value}px`,
      "--navigatorWidth": `${widthFactor * value}px`,
    };
  }, [tabsPrimary]);

  return {
    tabsPrimary,
    tabsSecondary,
    content,
    cssVariable,
    navigatorSize,
  };
};
