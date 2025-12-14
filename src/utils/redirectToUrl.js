import { redirectURL as tempRedirectURL } from "./redirectURL.js";
/**
 * Redirects the browser to a specified URL while appending a "redirectBack" parameter.
 *
 * @param {Object} params - Parameters object.
 * @param {string} params.to - The target URL to redirect to.
 * @param {string} params.from - The current URL to be used as the redirect back URL.
 * @returns {null} Always returns null.
 */
export const redirectUrlWithBack = ({ to, from }) => {
  tempRedirectURL(`${to}?redirectBack=${encodeURIComponent(from)}`);
  return null;
};

/**
 * Extracts and validates the "redirectBack" URL from a given URL string.
 *
 * @param {string} url - The full URL containing the optional "redirectBack" query parameter.
 * @returns {string|null} The validated redirect back URL if it exists and starts with the current origin; otherwise, null.
 */
export const getRedirectBackUrl = (url) => {
  const params = new URLSearchParams(
    new URL(url, window.location.origin).search
  );

  const redirectUrl = params.get("redirectBack");
  return redirectUrl && redirectUrl.startsWith(window.location.origin)
    ? redirectUrl
    : null;
};
