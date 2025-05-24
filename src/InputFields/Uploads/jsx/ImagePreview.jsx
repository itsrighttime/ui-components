import { useState, useEffect } from "react";
import { IconError } from "../../../SpecialPages/js/IconError";
import { imageNotIcon } from "../../../utils/icons";

export const ImagePreview = ({
  image,
  radius = "8px",
  width = "200px",
  height = "200px",
  alt = "Preview",
}) => {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (!image) {
      setImgUrl(null);
      return;
    }

    if (typeof image === "string") {
      setImgUrl(image);
      return;
    }

    if (image instanceof File && image.type.startsWith("image/")) {
      const url = URL.createObjectURL(image);
      setImgUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    console.warn("Invalid image input provided to ImagePreview.");
    setImgUrl(null);
  }, [image]);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f8f8",
        border: "1px solid var(--colorGray3)",
      }}
    >
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: radius,
          }}
        />
      ) : (
        <IconError
          icon={imageNotIcon}
          messgae="Ah! Looks like the image is not found."
          size={2}
        />
      )}
    </div>
  );
};
