import { useState } from "react";
import { AudioPlayer } from "../../InputFields/Uploads/jsx/AudioPlayer.jsx";
import { AudioUpload } from "../../InputFields/Uploads/jsx/AudioUpload.jsx";
import { FileUpload } from "../../InputFields/Uploads/jsx/FileUpload.jsx";
import { ImagePreview } from "../../InputFields/Uploads/jsx/ImagePreview";
import { ImageUpload } from "../../InputFields/Uploads/jsx/ImageUpload.jsx";
import { VideoPlayer } from "../../InputFields/Uploads/jsx/VideoPlayer.jsx";
import { VideoUpload } from "../../InputFields/Uploads/jsx/VideoUpload.jsx";
import video from "../../assets/video.mp4";
import audio from "../../assets/audio.mp3";
import image from "../../assets/image.jpeg";
import pdf from "../../assets/resume.pdf";

export const UseUploadExample = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isValid, setIsValid] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        overflow: "auto",
      }}
    >
      <AudioUpload
        label="Upload your podcast"
        setResult={(file) => console.log("Audio file:", file)}
        setIsFieldValid={(isValid) => console.log("Is valid?", isValid)}
        color="#4CAF50"
        maxSizeMB={50}
      />

      <AudioPlayer
        audioSrc={audio}
        setIsFieldValid={setIsValid}
        color="#4CAF50"
      />

      <FileUpload
        label="Drop or Select Documents"
        setResult={setUploadedFiles}
        setIsFieldValid={setIsValid}
        // allowedTypes={["application/pdf", "image/jpeg", "image/png"]}
        maxSize={5 * 1024 * 1024 * 1024} // 5MB
        multiple
        maxFiles={13}
        color="#007bff"
        width="600px"
        // height="220px"
      />

      {/* <ImagePreview
        image={image} // File or string URL
        width="450px"
        height="450px"
        // radius="50%"
      /> */}

      <ImageUpload
        label="Profile Picture"
        color="#FFB400"
        setResult={(file) => console.log("Image file:", file)}
        setIsFieldValid={(valid) =>
          setFieldStatus({ ...fieldStatus, profilePic: valid })
        }
        allowedTypes={["image/png", "image/jpeg"]}
        maxSizeMB={3}
        requireSquare={true}
      />

      {/* <VideoPlayer videoFile={video} /> */}
      <VideoUpload  />
    </div>
  );
};
