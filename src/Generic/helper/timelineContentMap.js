import { CardMilestone as Milestone } from "../../Cards/js/CardMilestone.jsx";
import { CardAchievement as Achievement } from "../../Cards/js/CardAchievement.jsx";
import { CardPhase as Phase } from "../../Cards/js/CardPhase.jsx";
import { CardExperience as Experience } from "../../Cards/js/CardExperience.jsx";
import { CardProduct as Product } from "../../Cards/js/CardProduct.jsx";
import { CardDecision as Decision } from "../../Cards/js/CardDecision.jsx";
import { CardEvent as Event } from "../../Cards/js/CardEvent.jsx";
import { CardMedia as Media } from "../../Cards/js/CardMedia.jsx";
import { CardImg } from "../../Cards/js/CardImg.jsx";
import { CardSimpleInfo } from "../../Cards/js/CardSimpleInfo.jsx";
import { CardTextOn } from "../../Cards/js/CardTextOn.jsx";
import { CardTextSliding } from "../../Cards/js/CardTextSliding.jsx";

const contentMap = {
  milestone: Milestone,
  achievement: Achievement,
  phase: Phase,
  experience: Experience,
  product: Product,
  decision: Decision,
  event: Event,
  media: Media,
  cardImg: CardImg,
  cardSimpleInfo: CardSimpleInfo,
  cardTextOn: CardTextOn,
  cardTextSliding: CardTextSliding,
};

export const getTimelineComponent = (type) => {
  return contentMap[type] || null;
};
