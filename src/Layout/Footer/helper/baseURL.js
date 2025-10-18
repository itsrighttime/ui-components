import { FOOTER_BRANDS_KEYS as FBKs } from "./KEYS";

class BaseURL {
  constructor(urls) {
    this[FBKs.itsrighttime] = urls?.[FBKs.itsrighttime] || "/";
    this[FBKs.dev] = urls?.[FBKs.dev] || "/";
    this[FBKs.creative] = urls?.[FBKs.creative] || "/";
    this[FBKs.workspace] = urls?.[FBKs.workspace] || "/";
  }

  getURL(brandKey, route = "/") {
    return `${this[brandKey] || "/"}${route}`;
  }

  getIrtUrl(route) {
    return this.getURL(FBKs.itsrighttime, route);
  }

  getDevUrl(route) {
    return this.getURL(FBKs.dev, route);
  }

  getCreUrl(route) {
    return this.getURL(FBKs.creative, route);
  }

  getWSUrl(route) {
    return this.getURL(FBKs.workspace, route);
  }
}

export const baseURL = (urls) => new BaseURL(urls);
