import { IMAGE_ASSETS_KEYS as IAK } from "../../../assets/productsLogo/productLogo.assets";
import { FOOTER_BRANDS_KEYS, BRANDS_PROPS_KEYS as KEYS } from "./KEYS";
import { SOCIAL_MEDIA_KEYS as SM } from "./getIcon";

const getIrtUrl = (route) => `${import.meta.url.IRT}${route}`;
const getdevUrl = (route) => `${import.meta.url.DEV}${route}`;
const getCreUrl = (route) => `${import.meta.url.CREATIVE}${route}`;
const getWSUrl = (route) => `${import.meta.url.WORKSPACE}${route}`;

const itsrighttime = {
  [KEYS.name]: FOOTER_BRANDS_KEYS.itsrighttime,
  [KEYS.logo]: IAK.itsrighttimeName,
  [KEYS.tagLine]: "One Stop Solution for all Businesses",
  [KEYS.tabs]: [
    { [KEYS.name]: "Home", [KEYS.goTo]: getIrtUrl("/") },
    { [KEYS.name]: "About", [KEYS.goTo]: getIrtUrl("/about-us") },
  ],
  [KEYS.contactus]: {
    [KEYS.address]: "Delhi, India, Asia",
    // [KEYS.contactus] : "+91 95405 1488",
    [KEYS.email]: "hello@itsrighttime.group",
  },
  // [KEYS.socialMedia]: [
  //   { [KEYS.name]: "github", [KEYS.goTo]: "https://github.com/itsrighttime" },
  // ],
  [KEYS.getInTouch]: {
    [KEYS.name]: "Get in Touch",
    [KEYS.goTo]: getdevUrl("/contact-us"),
  },
};

const dev = {
  [KEYS.name]: FOOTER_BRANDS_KEYS.dev,
  [KEYS.logo]: IAK.devName,
  [KEYS.tagLine]: "From Idea to Launch - We Build What Powers Your Vision.",
  [KEYS.tabs]: [
    { [KEYS.name]: "Home", [KEYS.goTo]: getdevUrl("/") },
    { [KEYS.name]: "Services", [KEYS.goTo]: getdevUrl("/services") },
    { [KEYS.name]: "Contact", [KEYS.goTo]: getdevUrl("/contact") },
  ],
  [KEYS.contactus]: {
    [KEYS.address]: "Delhi, India, Asia",
    // [KEYS.contactus] : "+91 95405 1488",
    [KEYS.email]: "dev@itsrighttime.group",
  },
  // [KEYS.socialMedia]: [
  //   { [KEYS.name]: "github", [KEYS.goTo]: "https://github.com/itsrighttime" },
  // ],
  [KEYS.getInTouch]: {
    [KEYS.name]: "Schedule a Meet",
    [KEYS.goTo]: getdevUrl("/schedule-meeting"),
  },
};

const creative = {
  [KEYS.name]: FOOTER_BRANDS_KEYS.creative,
  [KEYS.logo]: IAK.creativeName,
  [KEYS.tagLine]: "Your Space, Your Style, Our Expertise",
  [KEYS.tabs]: [
    { [KEYS.name]: "Home", [KEYS.goTo]: getCreUrl("/") },
    { [KEYS.name]: "About", [KEYS.goTo]: getCreUrl("/about-us") },
  ],
  [KEYS.contactus]: {
    [KEYS.address]: "Delhi, India, Asia",
    // [KEYS.contactus] : "+91 95405 1488",
    [KEYS.email]: "hello@itsrighttime.group",
  },
  // [KEYS.socialMedia]: [
  //   { [KEYS.name]: "github", [KEYS.goTo]: "https://github.com/itsrighttime" },
  // ],
  [KEYS.getInTouch]: {
    [KEYS.name]: "Get in Touch",
    [KEYS.goTo]: getCreUrl("/contact-us"),
  },
};

const workspace = {
  [KEYS.name]: FOOTER_BRANDS_KEYS.workspace,
  [KEYS.logo]: IAK.workspaceName,
  [KEYS.tagLine]: "One WorkSpace. Infinite Possibilities.",
  [KEYS.tabs]: [
    { [KEYS.name]: "Home", [KEYS.goTo]: getWSUrl("/") },
    { [KEYS.name]: "About", [KEYS.goTo]: getWSUrl("/about-us") },
  ],
  [KEYS.contactus]: {
    [KEYS.address]: "Delhi, India, Asia",
    // [KEYS.contactus] : "+91 95405 1488",
    [KEYS.email]: "hello@itsrighttime.group",
  },
  // [KEYS.socialMedia]: [
  //   { [KEYS.name]: "github", [KEYS.goTo]: "https://github.com/itsrighttime" },
  // ],
  [KEYS.getInTouch]: {
    [KEYS.name]: "Get in Touch",
    [KEYS.goTo]: getWSUrl("/contact-us"),
  },
};

const FOOTER_BRANDS = {
  [FOOTER_BRANDS_KEYS.itsrighttime]: itsrighttime,
  [FOOTER_BRANDS_KEYS.dev]: dev,
  // [FOOTER_BRANDS_KEYS.creative]: creative,
  // [FOOTER_BRANDS_KEYS.workspace]: workspace,
};

export const getFooterBrands = (brandNames) => {
  const brand = brandNames.map(
    (name) => name !== FOOTER_BRANDS_KEYS.itsrighttime && FOOTER_BRANDS[name]
  );

  return [...brand, itsrighttime];
};
