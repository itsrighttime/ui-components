import React from "react";
import styles from "../css/PropsCss.module.css";
import AudioUpload from "../../InputFields/Uploads/jsx/AudioUpload";
import VideoUpload from "../../InputFields/Uploads/jsx/VideoUpload";
import ImageUpload from "../../InputFields/Uploads/jsx/ImageUpload";
import FileUpload from "../../InputFields/Uploads/jsx/FileUpload";

const FileUploadProp = ({
  fileType = "all",
  label,
  setResult,
  color,
  setIsFieldValid = () => {},
}) => {
  let comp;
  switch (fileType) {
    case "video":
      comp = (
        <VideoUpload
          label={label}
          color={color}
          setIsFieldValid={setIsFieldValid}
          setResult={setResult}
        />
      );
      break;
    case "audio":
      comp = (
        <AudioUpload
          label={label}
          color={color}
          setIsFieldValid={setIsFieldValid}
          setResult={setResult}
        />
      );
      break;
    case "image":
      comp = (
        <ImageUpload
          label={label}
          color={color}
          setIsFieldValid={setIsFieldValid}
          setResult={setResult}
        />
      );
      break;
    default:
      comp = (
        <FileUpload
          label={label}
          color={color}
          setIsFieldValid={setIsFieldValid}
          setResult={setResult}
        />
      );
      break;
  }

  return <div className={styles.fileUploadProp}>{comp}</div>;
};

export default FileUploadProp;
