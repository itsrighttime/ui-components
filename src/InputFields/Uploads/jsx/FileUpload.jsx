import { useState } from "react";
import styles from "../css/FileUpload.module.css";
import { crossIcon, resetFieldIcon } from "../../../utils/icons.jsx";
import { getFileTypeLabel } from "../helper/getFileType.js";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { formatFileSize } from "../helper/formatFileSize.js";
import { useEffect } from "react";

/**
 * `FileUpload` is a React component that provides an interface for uploading one or multiple files
 * with drag-and-drop support, validation for file type and size, and the ability to preview, re-upload,
 * remove, or reset uploaded files. It integrates with the parent via `setResult` and `setIsFieldValid`
 * callbacks to keep the form state synchronized.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {File[]} [props.value=[]] - Initial list of files.
 * @param {string} [props.label="Upload File"] - Label displayed in the upload area.
 * @param {function} props.setResult - Callback to return the updated array of files.
 * @param {string} [props.color] - Primary color used for controls and buttons.
 * @param {function} [props.setIsFieldValid] - Callback to indicate field validation status.
 * @param {string[]} [props.allowedTypes=[]] - Array of allowed MIME types for validation.
 * @param {number} [props.maxSize=Infinity] - Maximum file size in MB.
 * @param {boolean} [props.multiple=false] - Whether multiple file uploads are allowed.
 * @param {number} [props.maxFiles=Infinity] - Maximum number of files that can be uploaded.
 * @param {string} [props.width="500px"] - Width of the upload container.
 * @param {string} [props.height="200px"] - Height of the upload container.
 * @param {string} [props.backendError=""] - Error message from backend to display.
 * @param {boolean} [props.required=false] - Whether the upload field is required.
 *
 * @example
 * <FileUpload
 *   label="Upload Documents"
 *   setResult={(files) => console.log(files)}
 *   allowedTypes={["application/pdf", "image/png"]}
 *   maxSize={5}
 *   multiple
 *   maxFiles={3}
 *   required
 * />
 *
 * @returns {JSX.Element} A file upload interface with drag-and-drop, preview, re-upload, and validation.
 */
export const FileUpload = ({
  value = [],
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
  backendError = "",
  required = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState(value || []);
  const [error, setError] = useState(null);

  const _maxSize = maxSize * 1024 * 1024;

  useEffect(() => {
    if (value.length > 0 && files.length === 0) setFiles(value);
  }, [value]);

  // Sync backend error with state
  useEffect(() => {
    if (backendError) {
      setError(backendError);
      setIsFieldValid(false);
    }
  }, [backendError]);

  const validateFile = (file) => {
    if (allowedTypes.length && !allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`);
      return false;
    }
    if (file.size > _maxSize) {
      setError(`File size exceeds limit of ${_maxSize.toFixed(2)} MB`);
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
      setError("");
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
          setError("");
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
    if (updated.length === 0) setError("");
  };

  const handleResetFile = () => {
    setFiles([]);
    setResult([]);
    setIsFieldValid(false);
    setError("");
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
      {required && <p className={styles.required}>*</p>}

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
                  <p>{formatFileSize(file.size)}</p>
                  <IconButton
                    icon={resetFieldIcon}
                    onClick={() => handleReupload(index)}
                    color={color || "#52C9BD"}
                    label={"Re-Upload"}
                  />
                  <IconButton
                    icon={crossIcon}
                    onClick={() => handleRemoveFile(index)}
                    color="#FF5969"
                    label={"Remove"}
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
