import CREATIVE from "./CREATIVE.png";
import itsRIGHTtime from "./itsRIGHTtime.png";
import letsDiscuss from "./letsDiscuss.png";
import letsGrowTogether from "./letsGrowTogether.png";
import letsSecure from "./letsSecure.png";
import DEV from "./DEV.png";
import WorkSpace from "./WorkSpace.png";

import CREATIVEName from "./namelogo/CREATIVE.png";
import itsRIGHTtimeName from "./namelogo/itsRIGHTtime.png";
import letsDiscussName from "./namelogo/letsDiscuss.png";
// import letsGrowTogetherName from "./namelogo/letsGrowTogether.png";
// import letsSecureName from "./namelogo/letsSecure.png";
import DEVName from "./namelogo/DEV.png";
import WorkSpaceName from "./namelogo/WorkSpace.png";

import CREATIVEBrand from "./brand/CREATIVE.png";
import letsDiscussBrand from "./brand/letsDiscuss.png";
import letsGrowTogetherBrand from "./brand/letsGrowTogether.png";
// import letsSecureBrand from "./brand/letsSecure.png";
import DEVBrand from "./brand/DEV.png";
import WorkSpaceBrand from "./brand/WorkSpace.png";

const productLogo = {
  CREATIVE,
  itsRIGHTtime,
  letsDiscuss,
  letsGrowTogether,
  letsSecure,
  DEV,
  WorkSpace,
  //
  CREATIVEBrand,
  // itsRIGHTtimeBrand,
  letsDiscussBrand,
  letsGrowTogetherBrand,
  // letsSecureBrand,
  DEVBrand,
  WorkSpaceBrand,
  //
  CREATIVEName,
  itsRIGHTtimeName,
  letsDiscussName,
  // letsGrowTogetherName,
  // letsSecureName,
  DEVName,
  WorkSpaceName,
};

export const getProductLogo = (name) => {
  return productLogo[name] || itsRIGHTtime;
};
