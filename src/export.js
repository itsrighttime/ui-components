import { Alert } from "./Alert/js/Alert";
import { AlertContainer } from "./Alert/js/AlertContainer";
import { CardImg } from "./Cards/js/CardImg";
import { CardSimpleInfo } from "./Cards/js/CardSimpleInfo";
import { CardTextOn } from "./Cards/js/CardTextOn";
import { CardTextSliding } from "./Cards/js/CardTextSliding";
import IndiaMap from "./ExtraThings/js/IndiaMap";
import Tooltip from "./ExtraThings/js/Tooltip";
import { useAlerts } from "./Hooks/useAlert";
import { useAPI } from "./Hooks/useAPI";
import { Button } from "./InputFields/Actions/jsx/Button";
import { IconButton } from "./InputFields/Actions/jsx/IconButton";
import { ImageButton } from "./InputFields/Actions/jsx/ImageButton";
import { Link } from "./InputFields/Actions/jsx/Link";
import { apiCaller } from "./utils/apiCaller";
import { UtilsLogger } from "./utils/logger/logger.util";

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

export const UIExtra = {
  IndiaMap,
};

export const UIEssentials = {
  Tooltip,
  logger: UtilsLogger.logger,
  codeTypes: UtilsLogger.codeTypes,
  getTrackingCode: UtilsLogger.getTrackingCode,
  useAPI,
  apiCaller,
};

export const UIInputs = {
  Actions: {
    Button,
    IconButton,
    ImageButton,
    Link,
  },
};
