// components/WorkspaceLayout.jsx
import { useWorkspaceLayout } from "../helper/useWorkspaceLayout";
import { ErrorPage } from "../../../SpecialPages/js/ErrorPage";
import { useMediaQuery } from "../../../Hooks/useMediaQuery";
import { SmallScreenLayout } from "./SmallScreenLayout";
import { LargeScreenLayout } from "./LargeScreenLayout";

export const WorkspaceLayout = ({
  api,
  height = "100%",
  width = "100%",
  level = 1,
  maxDepth = 2,
  providedTabs = null,
  providedContent = null,
  toggleFullscreen,
}) => {
  const isSmallDevice = useMediaQuery(900);

  const { tabsPrimary, tabsSecondary, content, cssVariable, navigatorSize } =
    useWorkspaceLayout({
      api,
      level,
      maxDepth,
      providedTabs,
      providedContent,
      toggleFullscreen,
    });

  if (!tabsPrimary && !tabsSecondary && !content) return <ErrorPage />;

  const layoutProps = {
    height,
    width,
    cssVariable,
    navigatorSize,
    tabsPrimary,
    tabsSecondary,
    content,
    api,
    level,
    maxDepth,
    toggleFullscreen,
  };

  return isSmallDevice ? (
    <SmallScreenLayout {...layoutProps} />
  ) : (
    <LargeScreenLayout {...layoutProps} />
  );
};
