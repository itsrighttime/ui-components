import { useState } from "react";
import style from "../css/VideoUpload.module.css"; // Adjust the path as necessary
import { VideoPlayer } from "./VideoPlayer.jsx";
import { crossIcon, resetFieldIcon } from "../../../utils/icons.jsx";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { formatFileSize } from "../helper/formatFileSize.js";
import { useEffect } from "react";

export const VideoUpload = ({
  label = "Upload Video",
  color,
  setResult,
  setIsFieldValid = () => {},
  allowedTypes = ["video/mp4", "video/webm"],
  maxSizeMB = 50, // Default to 50 MB
  preview = false,
  width = "400px",
  height = "200px",
  backendError,
  value = null,
  required = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [video, setVideo] = useState(value);
  const [error, setError] = useState(null);

  const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  const formattedMaxSize = formatFileSize(maxSize);

  useEffect(() => {
    if (!value) {
      setVideo(null);
      return;
    }

    if (typeof value === "string") {
      // backend provided URL (e.g. from DynamoDB / S3)
      setVideo(value);
      setError(null);
    } else if (value instanceof File || value instanceof Blob) {
      // local file object (user just uploaded)
      const url = URL.createObjectURL(value);
      setVideo(url);
      setError(null);

      return () => URL.revokeObjectURL(url); // cleanup
    }
  }, [value]);

  useEffect(() => {
    if (backendError) {
      setError(backendError);
      setIsFieldValid(false);
    }
  }, [backendError]);

  const validateVideo = (file) => {
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid video type. Allowed types: ${allowedTypes.join(", ")}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`Video size exceeds limit of ${formattedMaxSize}`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;
    if (backendError) setError(null);

    if (validateVideo(selectedFile)) {
      setVideo(selectedFile);
      setResult(selectedFile);
      setIsFieldValid(true);
      setError(null);
    } else {
      setVideo(null);
      setResult(null);
      setIsFieldValid(false);
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

  const handleRemoveVideo = () => {
    setVideo(null);
    setResult(null);
    setIsFieldValid(null);
  };

  const handleReupload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = allowedTypes.join(",");
    fileInput.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && validateVideo(selectedFile)) {
        handleFileChange(selectedFile);
      }
    };
    fileInput.click();
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
    "--width": width,
    "--height": height,
  };

  return (
    <div className={style.videoUploadContainer} style={cssVariable}>
      {required && <p className={style.required}>*</p>}
      {!video && (
        <div
          className={`${style.videoUpload} ${isDragging ? style.dragging : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleInputChange}
            className={style.formControl}
            title=""
            accept={allowedTypes.join(",")}
          />
          <span className={style.label}>{label}</span>
          <span
            className={style.label}
          >{`(Max Size: ${formattedMaxSize})`}</span>
        </div>
      )}
      {video && !preview && (
        <div className={style.uploadDetails}>
          <p>Video Uploaded: {video.name}</p>
          <div className={style.videoSizeIcon}>
            <p>{formatFileSize(video.size)}</p>
            <IconButton
              icon={resetFieldIcon}
              onClick={handleReupload}
              color={color || "#52C9BD"}
              label={"Re-Upload"}
            />
            <IconButton
              icon={crossIcon}
              onClick={handleRemoveVideo}
              color="#FF5969"
            />
          </div>
        </div>
      )}
      {video && preview && (
        <VideoPlayer
          videoFile={video}
          onRemove={handleRemoveVideo}
          onReupload={handleReupload}
          color={color}
          width={width}
          height={height}
        />
      )}
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};
