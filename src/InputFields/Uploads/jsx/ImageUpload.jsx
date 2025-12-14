"use client";

import { useState, useEffect } from "react";
import style from "../css/ImageUpload.module.css"; // Adjust the path as needed
import { crossIcon, resetFieldIcon } from "../../../utils/icons.jsx";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";

/**
 * ImageUpload Component
 *
 * A reusable React component for uploading and previewing images with support for:
 * - Drag & drop
 * - File type and size validation
 * - Optional square image requirement
 * - Preview with configurable border radius
 * - Re-upload and remove actions
 * - Backend error handling
 *
 * Props:
 * @param {string} label - Label for the upload input.
 * @param {function} setResult - Callback to receive the uploaded File object.
 * @param {string} [color] - Primary color for styling.
 * @param {function} [setIsFieldValid] - Callback to update field validity status.
 * @param {Array<string>} [allowedTypes=["image/jpeg","image/png","image/gif"]] - Allowed MIME types.
 * @param {number} [maxSizeMB=5] - Maximum allowed file size in MB.
 * @param {boolean} [requireSquare=true] - Whether the uploaded image must be square.
 * @param {string} [width="200px"] - Width of the upload container.
 * @param {string} [height="200px"] - Height of the upload container.
 * @param {string} [previewBorderRadius="0%"] - Border radius of the image preview.
 * @param {string} [backendError=""] - Error message from backend to display.
 * @param {string|File|null} [value=null] - Initial value (URL or File).
 * @param {boolean} [required=false] - Whether the field is required.
 * @example
 * Example usage:
 * <ImageUpload
 *   label="Upload Profile Picture"
 *   setResult={(file) => console.log(file)}
 *   color="#52C9BD"
 *   maxSizeMB={5}
 *   requireSquare={true}
 *   width="250px"
 *   height="250px"
 *   previewBorderRadius="50%"
 *   backendError=""
 *   value={null}
 *   required={true}
 * />
 */
export const ImageUpload = ({
  label = "Upload Image",
  setResult,
  color,
  setIsFieldValid = () => {},
  allowedTypes = ["image/jpeg", "image/png", "image/gif"],
  maxSizeMB = 5,
  requireSquare = true,
  width = "200px",
  height = "200px",
  previewBorderRadius = "0%",
  backendError = "",
  value = null,
  required = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(value); // image URL for preview
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) {
      setImage(null);
      return;
    }

    if (typeof value === "string") {
      // backend provided URL (e.g. from DynamoDB / S3)
      setImage(value);
      setIsFieldValid(true);
      setError(null);
    } else if (value instanceof File || value instanceof Blob) {
      // local file object (user just uploaded)
      const url = URL.createObjectURL(value);
      setImage(url);
      setIsFieldValid(true);
      setError(null);

      return () => URL.revokeObjectURL(url); // cleanup
    }
  }, [value]);

  const maxSize = maxSizeMB * 1024 * 1024;

  // Sync backend error into local error
  useEffect(() => {
    if (backendError) {
      setError(backendError);
      setIsFieldValid(false);
    }
  }, [backendError]);

  useEffect(() => {
    // Cleanup the previous object URL to prevent memory leak
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

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

  const checkIfSquare = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img.width === img.height);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const handleFileChange = async (selectedFile) => {
    if (!selectedFile || !validateImage(selectedFile)) return;

    const url = URL.createObjectURL(selectedFile);
    const isSquare = await checkIfSquare(url);

    if (requireSquare && !isSquare) {
      setError("Image must be square. Please reupload.");
      URL.revokeObjectURL(url);
      resetAll();
    } else {
      setImage(url);
      setResult(selectedFile);
      setIsFieldValid(true);
      setError(null);
    }
  };

  const resetAll = () => {
    if (image) URL.revokeObjectURL(image);
    setImage(null);
    setResult(null);
    setIsFieldValid(false);
  };

  const handleDrag = (e, dragging) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleReupload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = allowedTypes.join(",");
    fileInput.onchange = (e) => handleFileChange(e.target.files[0]);
    fileInput.click();
  };

  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--width": width,
    "--height": height,
  };

  return (
    <>
      <div className={style.imageUploadContainer} style={cssVariable}>
        {required && <p className={style.required}>*</p>}

        {!image && (
          <label
            className={`${style.imageUpload} ${
              isDragging ? style.dragging : ""
            }`}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className={style.formControl}
              title=""
              accept={allowedTypes.join(",")}
            />
            <span className={style.label}>{label}</span>
            <span className={style.label}>{`(Max Size: ${maxSizeMB}MB)`}</span>
          </label>
        )}

        {image && (
          <div className={style.imagePreview}>
            <img
              src={image}
              alt="Preview"
              className={style.image}
              style={{ borderRadius: previewBorderRadius }}
            />
            <div className={style.resetRemove}>
              <IconButton
                icon={resetFieldIcon}
                onClick={handleReupload}
                color={color || "#52C9BD"}
                label={"Re-Upload"}
              />
              <IconButton icon={crossIcon} onClick={resetAll} color="#FF5969" />
            </div>
          </div>
        )}

        {error && <p className={style.error}>{error}</p>}
      </div>
    </>
  );
};
