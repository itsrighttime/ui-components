import React, { useState } from "react";
import style from "../css/ImageUpload.module.css"; // Adjust the path as necessary
import { crossIcon, resetFieldIcon } from "../../../utils/index.js";
import IconButton from "../../Actions/jsx/IconButton";

const ImageUpload = ({
  label = "Upload Image",
  setResult,
  color,
  setIsFieldValid = () => {},
  allowedTypes = ["image/jpeg", "image/png", "image/gif"],
  maxSizeMB = 5, // Default to 5 MB
  requireSquare = true, // Flag to specify if image must be square
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes

  const validateImage = (file) => {
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid image type. Allowed types: ${allowedTypes.join(", ")}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`Image size exceeds limit of ${maxSizeMB} MB`);
      return false;
    }
    return true;
  };

  const checkIfSquare = (image) => {
    const img = new Image();
    img.src = image;
    return new Promise((resolve) => {
      img.onload = () => {
        resolve(img.width === img.height);
      };
    });
  };

  const handleFileChange = async (selectedFile) => {
    if (validateImage(selectedFile)) {
      const imageURL = URL.createObjectURL(selectedFile);
      const isSquare = await checkIfSquare(imageURL);

      if (requireSquare && !isSquare) {
        setError("Image must be square. Please reupload.");
        setImage(null);
        setResult(null);
        setIsFieldValid(false);
      } else {
        setImage(imageURL);
        setResult(selectedFile);
        setIsFieldValid(true);
        setError(null);
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleInputChange = (e) => {
    handleFileChange(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setResult(null);
    setIsFieldValid(null);
  };

  const handleReupload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = allowedTypes.join(",");
    fileInput.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && validateImage(selectedFile)) {
        handleFileChange(selectedFile);
      }
    };
    fileInput.click();
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
  };

  return (
    <>
      {!image && (
        <div
          className={`${style.imageUpload} ${isDragging ? style.dragging : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={cssVariable}
        >
          <input
            type="file"
            onChange={handleInputChange}
            className={style.formControl}
            title=""
            accept={allowedTypes.join(",")}
          />
          <span className={style.label}>{label}</span>
          <span className={style.label}>{`(Max Size: ${maxSizeMB}MB)`}</span>
        </div>
      )}
      {image && (
        <div className={style.imagePreview} style={cssVariable}>
          <img src={image} alt="Preview" className={style.image} />
          <div className={style.resetRemove}>
            <IconButton
              icon={resetFieldIcon}
              onClick={handleReupload}
              color={color || "#52C9BD"}
            />
            <IconButton
              icon={crossIcon}
              onClick={handleRemoveImage}
              color="#FF5969"
            />
          </div>
        </div>
      )}
      {error && <p className={style.error}>{error}</p>}
    </>
  );
};

export default ImageUpload;
