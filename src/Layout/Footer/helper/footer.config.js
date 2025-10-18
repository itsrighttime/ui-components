import { IMAGE_ASSETS_KEYS as IAK } from "../../../assets/productsLogo/productLogo.assets";
import { baseURL } from "./baseURL";
import { FOOTER_BRANDS_KEYS as FBKs, BRANDS_PROPS_KEYS as KEYS } from "./KEYS";

export const FOOTER_BRANDS = (urls) => {
  const itsrighttime = {
    [KEYS.name]: FBKs.itsrighttime,
    [KEYS.logo]: IAK.itsrighttimeName,
    [KEYS.tagLine]: "One Stop Solution for all Businesses",
    [KEYS.tabs]: [
      { [KEYS.name]: "Home", [KEYS.goTo]: urls.getIrtUrl("/") },
      { [KEYS.name]: "About", [KEYS.goTo]: urls.getIrtUrl("/about-us") },
    ],
    [KEYS.contactus]: {
      [KEYS.address]: "Delhi, India, Asia",
      [KEYS.email]: "hello@itsrighttime.group",
    },
    [KEYS.getInTouch]: {
      [KEYS.name]: "Get in Touch",
      [KEYS.goTo]: urls.getIrtUrl("/contact-us"),
    },
  };

  const dev = {
    [KEYS.name]: FBKs.dev,
    [KEYS.logo]: IAK.devName,
    [KEYS.tagLine]: "From Idea to Launch - We Build What Powers Your Vision.",
    [KEYS.tabs]: [
      { [KEYS.name]: "Home", [KEYS.goTo]: urls.getDevUrl("/") },
      { [KEYS.name]: "Services", [KEYS.goTo]: urls.getDevUrl("/services") },
      { [KEYS.name]: "Contact", [KEYS.goTo]: urls.getDevUrl("/contact") },
    ],
    [KEYS.contactus]: {
      [KEYS.address]: "Delhi, India, Asia",
      [KEYS.email]: "dev@itsrighttime.group",
    },
    [KEYS.getInTouch]: {
      [KEYS.name]: "Schedule a Meet",
      [KEYS.goTo]: urls.getDevUrl("/schedule-meeting"),
    },
  };

  const creative = {
    [KEYS.name]: FBKs.creative,
    [KEYS.logo]: IAK.creativeName,
    [KEYS.tagLine]: "Your Space, Your Style, Our Expertise",
    [KEYS.tabs]: [
      { [KEYS.name]: "Home", [KEYS.goTo]: urls.getCreUrl("/") },
      { [KEYS.name]: "About", [KEYS.goTo]: urls.getCreUrl("/about-us") },
    ],
    [KEYS.contactus]: {
      [KEYS.address]: "Delhi, India, Asia",
      [KEYS.email]: "hello@itsrighttime.group",
    },
    [KEYS.getInTouch]: {
      [KEYS.name]: "Get in Touch",
      [KEYS.goTo]: urls.getCreUrl("/contact-us"),
    },
  };

  const workspace = {
    [KEYS.name]: FBKs.workspace,
    [KEYS.logo]: IAK.workspaceName,
    [KEYS.tagLine]: "One WorkSpace. Infinite Possibilities.",
    [KEYS.tabs]: [
      { [KEYS.name]: "Home", [KEYS.goTo]: urls.getWSUrl("/") },
      { [KEYS.name]: "About", [KEYS.goTo]: urls.getWSUrl("/about-us") },
    ],
    [KEYS.contactus]: {
      [KEYS.address]: "Delhi, India, Asia",
      [KEYS.email]: "hello@itsrighttime.group",
    },
    [KEYS.getInTouch]: {
      [KEYS.name]: "Get in Touch",
      [KEYS.goTo]: urls.getWSUrl("/contact-us"),
    },
  };

  return {
    [FBKs.itsrighttime]: itsrighttime,
    [FBKs.dev]: dev,
    [FBKs.creative]: creative,
    [FBKs.workspace]: workspace,
  };
};

export const getFooterBrands = (brandNames, urls) => {
  const _baseURLs = baseURL(urls);
  const brandsMap = FOOTER_BRANDS(_baseURLs);
  const selected = brandNames.map((name) => brandsMap[name]);
  return [...selected, brandsMap[FBKs.itsrighttime]];
};
