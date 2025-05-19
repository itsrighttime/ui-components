import React, { useState } from "react";
import style from "../css/AudioUpload.module.css"; // Adjust the path as necessary
import AudioPlayer from "./AudioPlayer";

const AudioUpload = ({
  label,
  setResult,
  color,
  setIsFieldValid = () => {},
  allowedTypes = ["audio/mpeg", "audio/wav"],
  maxSizeMB = 10, // Default to 10 MB
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState(null);

  const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes

  const validateAudio = (file) => {
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid audio type. Allowed types: ${allowedTypes.join(", ")}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`Audio size exceeds limit of ${maxSizeMB} MB`);
      return false;
    }
    return true;
  };

  const handleFileChange = (selectedFile) => {
    if (validateAudio(selectedFile)) {
      setAudio(URL.createObjectURL(selectedFile));
      setResult(selectedFile);
      setIsFieldValid(true);
      setError(null);
    } else {
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

  const handleRemoveAudio = () => {
    setAudio(null);
    setResult(null);
    setIsFieldValid(false);
  };

  const handleReupload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = allowedTypes.join(",");
    fileInput.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && validateAudio(selectedFile)) {
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
      {!audio && (
        <div
          className={`${style.audioUpload} ${isDragging ? style.dragging : ""}`}
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
      {audio && (
        <AudioPlayer
          audioSrc={audio}
          onRemove={handleRemoveAudio}
          onReupload={handleReupload}
          color={color}
        />
      )}
      {error && <p className={style.error}>{error}</p>}
    </>
  );
};

export default AudioUpload;
