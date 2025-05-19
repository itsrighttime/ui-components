import React, { useState } from "react";
import styles from "../css/FileUpload.module.css";
import { crossIcon, resetFieldIcon } from "../../../utils/index.js";
import { getFileTypeLabel } from "../helper/getFileType";
import IconButton from "../../Actions/jsx/IconButton";

const FileUpload = ({
  label = "Upload File",
  setResult,
  color,
  setIsFieldValid = () => {},
  allowedTypes = [],
  maxSize = Infinity,
  multiple = false,
  maxFiles = Infinity,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    if (allowedTypes.length && !allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`File size exceeds limit of ${maxSize / 1024 / 1024} MB`);
      return false;
    }
    return true;
  };

  const handleFileChange = (selectedFiles) => {
    let validFiles = Array.from(selectedFiles).filter(validateFile);
    if (validFiles.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files.`);
      return;
    }
    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      setResult(newFiles);
      setIsFieldValid(true);
      setError(null);
    } else setIsFieldValid(false);
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
      handleFileChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleInputChange = (e) => {
    handleFileChange(e.target.files);
  };

  const handleReupload = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = allowedTypes.join(",");
    fileInput.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        const newFiles = [...files];
        newFiles[index] = selectedFile;
        setFiles(newFiles);
        setResult(newFiles);
        setIsFieldValid(true);
      } else setIsFieldValid(false);
    };
    fileInput.click();
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setResult(newFiles);
    setIsFieldValid(true);
  };

  const handleResetFile = () => {
    setResult([]);
    setIsFieldValid(null);
    setFiles([]);
    setError(null);
  };

  const handleAddMoreFiles = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = allowedTypes.join(",");
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      handleFileChange(e.target.files);
    };
    fileInput.click();
  };

  const handleFilePreview = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
  };

  return (
    <>
      {files.length === 0 && (
        <div
          className={`${styles.fileUpload} ${
            isDragging ? styles.dragging : ""
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={cssVariable}
        >
          <input
            type="file"
            onChange={handleInputChange}
            className={styles.formControl}
            title=""
            multiple={multiple}
          />
          <span className={styles.label}>{`${label}`}</span>
        </div>
      )}
      {files.length > 0 && (
        <div className={styles.infor} style={cssVariable}>
          {files.map((file, index) => (
            <div key={index} className={styles.fileInfo}>
              <p
                onClick={() => handleFilePreview(file)}
                className={styles.fileName}
              >
                {`${getFileTypeLabel(file.type)}: ${file.name}`}
              </p>
              <div className={styles.uploadRemove}>
                <p>{`(${(file.size / 1024 / 1024).toFixed(2)} MB)`}</p>

                <IconButton
                  icon={resetFieldIcon}
                  onClick={() => handleReupload(index)}
                  color={color || "#52C9BD"}
                />
                <IconButton
                  icon={crossIcon}
                  onClick={() => handleRemoveFile(index)}
                  color="#FF5969"
                />
              </div>
            </div>
          ))}

          <div className={styles.actions}>
            <p className={styles.fileCount}>
              {maxFiles === Infinity
                ? `(File Uploaded: ${files.length})`
                : `(File Uploaded: ${files.length} / ${maxFiles})`}
            </p>

            <p className={styles.buttonLink} onClick={handleResetFile}>
              Reset All
            </p>

            {multiple && files.length < maxFiles && (
              <p className={styles.buttonLink} onClick={handleAddMoreFiles}>
                Add More Files
              </p>
            )}
          </div>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default FileUpload;
