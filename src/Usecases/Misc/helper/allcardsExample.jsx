import { CardAchievement } from "../../../Cards/js/Achievement.jsx";
import { CardDecision } from "../../../Cards/js/CardDecision.jsx";
import { CardEvent } from "../../../Cards/js/CardEvent.jsx";
import { CardExperience } from "../../../Cards/js/CardExperience.jsx";
import { CardImg } from "../../../Cards/js/CardImg.jsx";
import { CardMedia } from "../../../Cards/js/CardMedia.jsx";
import { CardMilestone } from "../../../Cards/js/CardMilestone.jsx";
import { CardPhase } from "../../../Cards/js/CardPhase.jsx";
import { CardProduct } from "../../../Cards/js/CardProduct.jsx";
import { CardSimpleInfo } from "../../../Cards/js/CardSimpleInfo.jsx";
import { CardTextOn } from "../../../Cards/js/CardTextOn.jsx";
import { CardTextSliding } from "../../../Cards/js/CardTextSliding.jsx";

import img from "/src/assets/image.jpeg";

export const allCardsExample = [
  {
    name: "CardImg",
    component: (
      <CardImg
        img={img}
        title="Top 5 Interior Tips"
        desc="Learn how to maximize space and aesthetics."
        targetLink="/blog/interior-tips"
        targetTab="_self"
        colorName="cyan"
      />
    ),
  },
  {
    name: "CardSimpleInfo",
    component: (
      <CardSimpleInfo
        img={img}
        name="Danishan Farookh"
        desc="Leading our design department with modern vision."
        title="Creative Head"
        colorName="green"
      />
    ),
  },
  {
    name: "CardTextOn",
    component: (
      <CardTextOn
        authorName="Ayesha Khan"
        date="May 15, 2025"
        img={img}
        desc="An in-depth view of how AI is shaping design decisions globally."
        productID="AI-UX-22"
        orientation="H"
        colorName="var(--colorCyan)"
      />
    ),
  },
  {
    name: "CardTextSliding",
    component: (
      <CardTextSliding
        img={img}
        productName="Smart Home Kit"
        desc="Automate your living with our AI-driven devices."
        setResult={() => console.log("Expert view requested")}
        productID="SHK-2025"
        orientation="H"
        colorName="green"
      />
    ),
  },
  {
    name: "CardAchievement",
    component: (
      <CardAchievement
        title="Users Reached"
        metric="50K+"
        description="Active users across the platform"
        iconName="homeIcon"
      />
    ),
  },
  {
    name: "CardDecision",
    component: (
      <CardDecision
        decision="Adopt Microservices"
        reason="Improves scalability and usablity of the system in the organization"
        impact="Faster deployments"
        description="Helps teams work independently on the projects and it has lots of benifits in WRM pattern."
      />
    ),
  },
  {
    name: "CardEvent",
    component: (
      <CardEvent
        name="Product Launch"
        date="Aug 20, 2025"
        location="San Francisco"
        description="Official release event on founders day but still required huge attention from the clients."
        links={[
          { label: "Register", href: "#" },
          { label: "Details", href: "#" },
        ]}
      />
    ),
  },
  {
    name: "CardExperience",
    component: (
      <CardExperience
        role="Frontend Developer"
        org="Tech Corp"
        period="2022 – 2024"
        responsibilities={["UI development", "Performance optimization"]}
        skills={["React", "CSS"]}
        description="Worked on scalable UI systems"
      />
    ),
  },
  {
    name: "CardMedia",
    component: (
      <CardMedia mediaType="image" src={img} caption="Initial prototype" />
    ),
  },
  {
    name: "CardMilestone",
    component: (
      <CardMilestone
        title="Series A Funding"
        subtitle="Funding for my launch"
        description="Raised $5M from investors"
        iconName="homeIcon"
        link={{ label: "Read More", href: "#" }}
      />
    ),
  },
  {
    name: "CardPhase",
    component: (
      <CardPhase
        title="Research Phase"
        period="2025 - 2024"
        description="Market and user research"
        highlights={["User interviews", "Competitor analysis"]}
      />
    ),
  },
  {
    name: "CardProduct",
    component: (
      <CardProduct
        name="Nova UI Kit"
        version="1.2.0"
        status="beta"
        tagline="Modern UI components"
        highlights={["New cards", "Dark mode"]}
        links={[
          { label: "Docs", href: "#" },
          { label: "GitHub", href: "#" },
        ]}
      />
    ),
  },
];
