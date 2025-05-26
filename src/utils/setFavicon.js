// Manually update the favicon
export const setFavicon = (logoName, extension = "png") => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = `image/${extension}`;
    link.rel = "shortcut icon";
    link.href = `${process.env.PUBLIC_URL}/icon/${logoName}.${extension}`;
    document.getElementsByTagName("head")[0].appendChild(link);
};
