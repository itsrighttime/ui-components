import { useState } from "react";
import styles from "../css/FileUpload.module.css";
import { crossIcon, resetFieldIcon } from "../../../utils/icons";
import { getFileTypeLabel } from "../helper/getFileType";
import { IconButton } from "../../Actions/jsx/IconButton";

export const FileUpload = ({
  label = "Upload File",
  setResult,
  color,
  setIsFieldValid = () => {},
  allowedTypes = [],
  maxSize = Infinity,
  multiple = false,
  maxFiles = Infinity,
  width = "500px",
  height = "200px",
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
      setError(
        `File size exceeds limit of ${(maxSize / 1024 / 1024).toFixed(2)} MB`
      );
      return false;
    }
    return true;
  };

  const handleFileChange = (selectedFiles) => {
    let newFileArray = Array.from(selectedFiles).filter(validateFile);

    // Prevent duplicates
    newFileArray = newFileArray.filter(
      (newFile) =>
        !files.some((f) => f.name === newFile.name && f.size === newFile.size)
    );

    if (newFileArray.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    if (newFileArray.length > 0) {
      const updatedFiles = [...files, ...newFileArray];
      setFiles(updatedFiles);
      setResult(updatedFiles);
      setIsFieldValid(true);
      setError(null);
    } else {
      setIsFieldValid(false);
    }
  };

  const createFileInput = ({ multiple = false, onChange }) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = allowedTypes.join(",");
    input.multiple = multiple;
    input.onchange = onChange;
    input.click();
  };

  const handleReupload = (index) => {
    createFileInput({
      onChange: (e) => {
        const selectedFile = e.target.files[0];
        if (validateFile(selectedFile)) {
          const newFiles = [...files];
          newFiles[index] = selectedFile;
          setFiles(newFiles);
          setResult(newFiles);
          setIsFieldValid(true);
          setError(null);
        } else {
          setIsFieldValid(false);
        }
      },
    });
  };

  const handleRemoveFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    setResult(updated);
    setIsFieldValid(updated.length > 0);
  };

  const handleResetFile = () => {
    setFiles([]);
    setResult([]);
    setIsFieldValid(false);
    setError(null);
  };

  const handleAddMoreFiles = () => {
    createFileInput({
      multiple: true,
      onChange: (e) => handleFileChange(e.target.files),
    });
  };

  const handleFilePreview = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    setTimeout(() => URL.revokeObjectURL(fileURL), 1000); // cleanup
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
    if (e.dataTransfer.files?.length) {
      handleFileChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleInputChange = (e) => {
    handleFileChange(e.target.files);
    e.target.value = null; // reset for re-selection
  };

  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--width": width,
    "--height": height,
  };

  return (
    <div className={styles.fileUploadContainer} style={cssVariable}>
      {files.length === 0 && (
        <div
          className={`${styles.fileUpload} ${
            isDragging ? styles.dragging : ""
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleInputChange}
            className={styles.formControl}
            title=""
            aria-label={label}
            multiple={multiple}
          />
          <span className={styles.label}>{label}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className={styles.infor} style={cssVariable}>
          <div className={styles.inforDiv}>
            {files.map((file, index) => (
              <div key={index} className={styles.fileInfo}>
                <p
                  onClick={() => handleFilePreview(file)}
                  className={styles.fileName}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleFilePreview(file)
                  }
                >
                  {`${getFileTypeLabel(file.type) || "File"}: ${file.name}`}
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
          </div>

          <div className={styles.actions}>
            <p className={styles.fileCount}>
              {maxFiles === Infinity
                ? `(Files Uploaded: ${files.length})`
                : `(Files Uploaded: ${files.length} / ${maxFiles})`}
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
    </div>
  );
};
