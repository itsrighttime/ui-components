// import CREATIVE from "./CREATIVE.png";
// import itsRIGHTtime from "./itsRIGHTtime.png";
// import letsDiscuss from "./letsDiscuss.png";
// import letsGrowTogether from "./letsGrowTogether.png";
// import letsSecure from "./letsSecure.png";
// import DEV from "./DEV.png";
// import WorkSpace from "./WorkSpace.png";

// import CREATIVEName from "./namelogo/CREATIVE.png";
// import itsRIGHTtimeName from "./namelogo/itsRIGHTtime.png";
// import letsDiscussName from "./namelogo/letsDiscuss.png";
// import DEVName from "./namelogo/DEV.png";
// import WorkSpaceName from "./namelogo/WorkSpace.png";

// import CREATIVEBrand from "./brand/CREATIVE.png";
// import letsDiscussBrand from "./brand/letsDiscuss.png";
// import letsGrowTogetherBrand from "./brand/letsGrowTogether.png";
// import DEVBrand from "./brand/DEV.png";
// import WorkSpaceBrand from "./brand/WorkSpace.png";

export const IMAGE_ASSETS_KEYS = {
  creative: "CREATIVE",
  itsrighttime: "itsRIGHTtime",
  letsdiscuss: "letsDiscuss",
  letsgrowtogether: "letsGrowTogether",
  letssecure: "letsSecure",
  dev: "DEV",
  workspace: "WorkSpace",
  creativeBrand: "CREATIVEBrand",
  letsdiscussBrand: "letsDiscussBrand",
  letsgrowtogetherBrand: "letsGrowTogetherBrand",
  devBrand: "DEVBrand",
  workspaceBrand: "WorkSpaceBrand",
  creativeName: "CREATIVEName",
  itsrighttimeName: "itsRIGHTtimeName",
  letsdiscussName: "letsDiscussName",
  devName: "DEVName",
  workspaceName: "WorkSpaceName",
};

// const productLogo = {
//   [IMAGE_ASSETS_KEYS.creative]: CREATIVE,
//   [IMAGE_ASSETS_KEYS.itsrighttime]: itsRIGHTtime,
//   [IMAGE_ASSETS_KEYS.letsdiscuss]: letsDiscuss,
//   [IMAGE_ASSETS_KEYS.letsgrowtogether]: letsGrowTogether,
//   [IMAGE_ASSETS_KEYS.letssecure]: letsSecure,
//   [IMAGE_ASSETS_KEYS.dev]: DEV,
//   [IMAGE_ASSETS_KEYS.workspace]: WorkSpace,
//   [IMAGE_ASSETS_KEYS.creativeBrand]: CREATIVEBrand,
//   [IMAGE_ASSETS_KEYS.letsdiscussBrand]: letsDiscussBrand,
//   [IMAGE_ASSETS_KEYS.letsgrowtogetherBrand]: letsGrowTogetherBrand,
//   [IMAGE_ASSETS_KEYS.devBrand]: DEVBrand,
//   [IMAGE_ASSETS_KEYS.workspaceBrand]: WorkSpaceBrand,
//   [IMAGE_ASSETS_KEYS.creativeName]: CREATIVEName,
//   [IMAGE_ASSETS_KEYS.itsrighttimeName]: itsRIGHTtimeName,
//   [IMAGE_ASSETS_KEYS.letsdiscussName]: letsDiscussName,
//   [IMAGE_ASSETS_KEYS.devName]: DEVName,
//   [IMAGE_ASSETS_KEYS.workspaceName]: WorkSpaceName,
// };

const productLogo = {
  [IMAGE_ASSETS_KEYS.creative]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.itsrighttime]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.letsdiscuss]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.letsgrowtogether]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.letssecure]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.dev]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.workspace]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.creativeBrand]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.letsdiscussBrand]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.letsgrowtogetherBrand]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.devBrand]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.workspaceBrand]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.creativeName]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.itsrighttimeName]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.letsdiscussName]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.devName]: "https://itsrighttime.group/favicon.ico",
  [IMAGE_ASSETS_KEYS.workspaceName]: "https://itsrighttime.group/favicon.ico",
};

export const getProductLogo = (name) => {
  return productLogo[name] || itsRIGHTtime;
};
