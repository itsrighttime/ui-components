import { SmoothInfiniteScroll } from "../../Scroller/jsx/SmoothInfiniteScroll";

const dummyData = Array.from({ length: 1000 }, (_, i) => `Message #${i + 1}`);

export const UseSmoothScrollerExample = () => {
  return (
    <div style={{ width: "90vw", height: "90vh" }}>
      <h2>Smooth Infinite Scroll</h2>
      <SmoothInfiniteScroll data={dummyData} />
    </div>
  );
};