/**
 * Updates the favicon of the current document.
 *
 * @param {string} logoName - The name of the favicon file (without extension).
 * @param {string} [extension="png"] - The file extension of the favicon (e.g., "png", "ico").
 */
export const setFavicon = (logoName, extension = "png") => {
  if (typeof document === "undefined") return;

  const link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = `image/${extension}`;
  link.rel = "shortcut icon";
  link.href = `${process.env.PUBLIC_URL}/icon/${logoName}.${extension}`;
  document.getElementsByTagName("head")[0].appendChild(link);
};
