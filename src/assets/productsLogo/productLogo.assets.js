import creative from "./creative.png";
import itsRIGHTtime from "./itsRIGHTtime.png";
import letsDiscuss from "./letsDiscuss.png";
import letsGrowTogether from "./letsGrowTogether.png";
import letsSecure from "./letsSecure.png";

const productLogo = {
  CREATIVE: creative,
  itsRIGHTtime,
  letsDiscuss,
  letsGrowTogether,
  letsSecure,
};

export const getProductLogo = (name) => {
  return productLogo[name] || itsRIGHTtime;
};
