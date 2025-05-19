import { redirectURL } from ".";

export const RedirectToURL = ({ to, from }) => {
  redirectURL(`${to}?redirectBack=${encodeURIComponent(from)}`);
  return null;
};

export const getRedirectBackUrl = (url) => {
  const params = new URLSearchParams(
    new URL(url, window.location.origin).search
  );
  
  const redirectUrl = params.get("redirectBack");
  return redirectUrl && redirectUrl.startsWith(window.location.origin)
    ? redirectUrl
    : null;
};
