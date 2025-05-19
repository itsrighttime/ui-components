import React, { useState } from "react";
import style from "../css/VideoUpload.module.css"; // Adjust the path as necessary
import VideoPlayer from "./VideoPlayer";

const VideoUpload = ({
  label = "Upload Video",
  color,
  setResult,
  setIsFieldValid = () => {},
  allowedTypes = ["video/mp4", "video/webm"],
  maxSizeMB = 50, // Default to 50 MB
  preview = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes

  const validateVideo = (file) => {
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid video type. Allowed types: ${allowedTypes.join(", ")}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`Video size exceeds limit of ${maxSizeMB} MB`);
      return false;
    }
    return true;
  };

  const handleFileChange = (selectedFile) => {
    if (validateVideo(selectedFile)) {
      setVideo(selectedFile);
      setResult(selectedFile);
      setIsFieldValid(true);
      setError(null);
    } else setIsFieldValid(true);
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
  };

  return (
    <>
      {!video && (
        <div
          className={`${style.videoUpload} ${isDragging ? style.dragging : ""}`}
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
      {video && !preview && (
        <div className={style.uploadDetails}>
          <p>Video Uploaded: {video.name}</p>
          <div className={style.videoSizeIcon}>
            <p>{(video.size / 1024 / 1024).toFixed(2)}MB</p>
          </div>
        </div>
      )}
      {video && preview && (
        <VideoPlayer
          videoFile={video}
          onRemove={handleRemoveVideo}
          onReupload={handleReupload}
          color={color}
        />
      )}
      {error && <p className={style.error}>{error}</p>}
    </>
  );
};

export default VideoUpload;
