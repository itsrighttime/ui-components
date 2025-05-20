import { Alert } from "./Alert/js/Alert";
import { AlertContainer } from "./Alert/js/AlertContainer";
import { CardImg } from "./Cards/js/CardImg";
import { CardSimpleInfo } from "./Cards/js/CardSimpleInfo";
import { CardTextOn } from "./Cards/js/CardTextOn";
import { CardTextSliding } from "./Cards/js/CardTextSliding";
import { useAlerts } from "./Hooks/useAlert";

export const UIAlert = {
  Alert,
  AlertContainer,
  useAlerts,
};

export const UICards = {
  CardImg,
  CardSimpleInfo,
  CardTextOn,
  CardTextSliding,
};
