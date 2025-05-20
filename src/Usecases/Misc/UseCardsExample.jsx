import { CardImg } from "../../Cards/js/CardImg";
import { CardSimpleInfo } from "../../Cards/js/CardSimpleInfo";
import { CardTextOn } from "../../Cards/js/CardTextOn";
import { CardTextSliding } from "../../Cards/js/CardTextSliding";

import img from "../../Images/danishan.jpeg";
import img2 from "../../Images/img.jpeg";

export const UseCardsExample = () => {
  return (
    <div>
      <CardImg
        img={img}
        title="Top 5 Interior Tips"
        desc="Learn how to maximize space and aesthetics with these proven strategies."
        targetLink="/blog/interior-tips"
        targetTab="_self"
      />

      <CardSimpleInfo
        img={img}
        name="Danishan Farookh"
        desc="Leading our design department with a vision for modern living. Leading our design department with a vision for modern living."
        title="Creative Head"
        colorName="green"
      />

      <CardTextOn
        authorName="Ayesha Khan"
        date="May 15, 2025"
        img={img}
        desc="An in-depth view of how AI is shaping design decisions globally."
        productID="AI-UX-22"
        orientation="H"
      />

      {/* <CardTextSliding
        img={img}
        productName="Smart Home Kit"
        desc="Automate your living with our latest AI-driven smart devices."
        setResult={() => console.log("Expert view requested")}
        productID="SHK-2025"
        orientation="V"
      /> */}
    </div>
  );
};
