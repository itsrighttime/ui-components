import { useScrollPoints } from "#hooks/useScrollPoints";

export const VerticalTimeline = ({ config = {} }) => {
  const { data } = config;

  const { containerRef, registerPoint, scrollTo, isContainerVisible } =
    useScrollPoints();

  return (
    <>
      <div ref={containerRef}>
        {data.map((item, index) => (
          <div key={index} ref={registerPoint(index)}>
            <TimeLineVertical_ {...item} />
          </div>
        ))}
      </div>

      {!isContainerVisible && (
        <button onClick={() => scrollTo(0)}>Jump to Timeline</button>
      )}
    </>
  );
};

export const VerticalTimeline1 = ({ config = {} }) => {
  const { data } = config;

  const {
    containerRef,
    registerPoint,
    scrollTo,
    activeKey,
    isContainerVisible,
  } = useScrollPoints();

  return (
    <>
      <div ref={containerRef}>
        {data.map((item, i) => (
          <div key={item.id} ref={registerPoint(item.id)}>
            <TimelineItem />
          </div>
        ))}
      </div>

      <button onClick={() => scrollTo(data[3].id)}>Jump</button>
    </>
  );
};
