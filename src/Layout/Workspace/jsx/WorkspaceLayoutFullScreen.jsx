import { FullscreenWrapper } from "./FullscreenWrapper";
import { WorkspaceLayout } from "./WorkspaceLayout";

export const WorkspaceLayoutFullScreen = ({ tabsHandler }) => {
  return (
    <FullscreenWrapper>
      {({ toggleFullscreen }) => (
        <WorkspaceLayout
          toggleFullscreen={toggleFullscreen}
          api={"letsSecure"}
          tabsHandler={tabsHandler}
        />
      )}
    </FullscreenWrapper>
  );
};
