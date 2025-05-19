import React, { useState, useEffect } from "react";

const ImagePreview = ({ image, radius }) => {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImgUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  return (
    <img
      src={imgUrl}
      alt="Preview"
      style={{ width: "100%", height: "100%", borderRadius: radius }}
    />
  );
};

export default ImagePreview;
