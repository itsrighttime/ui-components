import { useState, useEffect } from "react";
import { IconError } from "../../../SpecialPages/js/IconError.jsx";
import { imageNotIcon } from "../../../utils/icons.jsx";

/**
 * `ImagePreview` is a React component that displays an image preview from a URL or a File object.
 * If the image is invalid or not provided, it shows a placeholder/error icon.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string|File|null} props.image - The image source, either a URL string or a File object.
 * @param {string} [props.radius="8px"] - Border radius for the image container.
 * @param {string} [props.width="200px"] - Width of the preview container.
 * @param {string} [props.height="200px"] - Height of the preview container.
 * @param {string} [props.alt="Preview"] - Alt text for the image.
 *
 * @example
 * <ImagePreview
 *   image={fileOrUrl}
 *   width="300px"
 *   height="300px"
 *   radius="12px"
 *   alt="Profile Picture"
 * />
 *
 * @returns {JSX.Element} A container displaying the image or an error placeholder.
 */
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
