"use client";

import { useState } from "react";
import style from "../css/AudioUpload.module.css";
import { AudioPlayer } from "./AudioPlayer.jsx";
import { useEffect } from "react";

/**
 * `AudioUpload` is a React component that allows users to upload, preview, and manage audio files.
 * It supports drag-and-drop and file input selection, validates audio type and size, and integrates
 * with the `AudioPlayer` component for playback, re-upload, and removal.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} props.label - Label text displayed in the upload area.
 * @param {function} props.setResult - Callback function to return the uploaded file or null.
 * @param {string} [props.color] - Primary color for controls and upload area.
 * @param {function} [props.setIsFieldValid] - Callback to indicate if the field is valid (default: noop).
 * @param {string[]} [props.allowedTypes=["audio/mpeg","audio/wav"]] - Array of allowed MIME types for upload.
 * @param {number} [props.maxSizeMB=10] - Maximum allowed file size in megabytes.
 * @param {string} [props.width="500px"] - Width of the upload container.
 * @param {string} [props.height="100px"] - Height of the upload container.
 * @param {string|File|Blob|null} [props.value=null] - Initial value: can be a URL string, File/Blob, or null.
 * @param {string} [props.backendError=""] - Error message from the backend to display in the component.
 * @param {boolean} [props.required=false] - Whether the upload field is required.
 *
 * @example
 * <AudioUpload
 *   label="Upload your audio"
 *   setResult={(file) => console.log(file)}
 *   color="#52C9BD"
 *   allowedTypes={["audio/mpeg"]}
 *   maxSizeMB={5}
 *   required
 * />
 *
 * @returns {JSX.Element} A file upload interface with audio preview, drag-and-drop support, and validation.
 */
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
