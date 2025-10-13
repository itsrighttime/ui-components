import { useState } from "react";
import style from "../css/AudioUpload.module.css";
import { AudioPlayer } from "./AudioPlayer";
import { useEffect } from "react";

export const AudioUpload = ({
  label,
  setResult,
  color,
  setIsFieldValid = () => {},
  allowedTypes = ["audio/mpeg", "audio/wav"],
  maxSizeMB = 10,
  width = "500px",
  height = "100px",
  backendError = "",
  value = null,
  required = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [audio, setAudio] = useState(value);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) {
      setAudio(null);
      return;
    }

    if (typeof value === "string") {
      // backend provided URL (e.g. from DynamoDB / S3)
      setAudio(value);
      setError(null);
    } else if (value instanceof File || value instanceof Blob) {
      // local file object (user just uploaded)
      const url = URL.createObjectURL(value);
      setAudio(url);
      setError(null);

      return () => URL.revokeObjectURL(url); // cleanup
    }
  }, [value]);

  const maxSize = maxSizeMB * 1024 * 1024;

  // Handle backend error sync
  useEffect(() => {
    if (backendError) {
      setError(backendError);
      setIsFieldValid(false);
    }
  }, [backendError]);

  const validateAudio = (file) => {
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid audio type. Allowed types: ${allowedTypes.join(", ")}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`Audio size exceeds limit of ${maxSizeMB} MB`);
      return false;
    }
    setError(null);
    return true;
  };

  const processFile = (file) => {
    if (!file || !validateAudio(file)) {
      setIsFieldValid(false);
      return;
    }

    // clear backend error on user re-upload
    if (backendError) {
      setError("");
    }

    setAudio(URL.createObjectURL(file));
    setResult(file);
    setIsFieldValid(true);
  };

  const handleFileInput = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleDragState = (state) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(state);
  };

  const handleReupload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = allowedTypes.join(",");
    input.onchange = (e) => processFile(e.target.files[0]);
    input.click();
  };

  const handleRemoveAudio = () => {
    setAudio(null);
    setResult(null);
    setIsFieldValid(false);
  };

  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--width": width,
    "--height": height,
  };

  return (
    <div className={style.audioUploadContainer} style={cssVariable}>
      {required && <p className={style.required}>*</p>}

      {!audio ? (
        <div
          className={`${style.audioUpload} ${isDragging ? style.dragging : ""}`}
          onDragEnter={handleDragState(true)}
          onDragLeave={handleDragState(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={cssVariable}
        >
          <input
            type="file"
            onChange={handleFileInput}
            className={style.formControl}
            accept={allowedTypes.join(",")}
            title=""
          />
          <span className={style.label}>{label}</span>
          <span className={style.label}>{`(Max Size: ${maxSizeMB}MB)`}</span>
        </div>
      ) : (
        <AudioPlayer
          audioSrc={audio}
          onRemove={handleRemoveAudio}
          onReupload={handleReupload}
          color={color}
          width={width}
        />
      )}
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};
