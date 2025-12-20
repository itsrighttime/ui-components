import { getTimelineComponent } from "./timelineContentMap.js";

export const TimelineContentRenderer = ({ component }) => {
  if (!component || !component.type) return null;
  const ContentComponent = getTimelineComponent(component.type);

  if (!ContentComponent) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[TimelineContentRenderer] Unknown type: ${component.type}`);
    }
    return null;
  }

  return <ContentComponent {...component.data} />;
};
