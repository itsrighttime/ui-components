"use client";

import style from "../css/VideoPlayer.module.css";
import {
  crossIcon,
  videoNotIcon,
  resetFieldIcon,
} from "../../../utils/icons.jsx";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { IconError } from "../../../SpecialPages/js/IconError.jsx";

/**
 * VideoPlayer Component
 *
 * A reusable React component to preview a video file or URL with built-in controls.
 * Supports re-upload and remove actions, as well as dynamic styling.
 *
 * Props:
 * @param {File|string|null} videoFile - The video to preview (can be a File/Blob or a URL string).
 * @param {function} [onRemove=null] - Callback invoked when the remove button is clicked.
 * @param {function} [onReupload=null] - Callback invoked when the re-upload button is clicked.
 * @param {string} [color] - Primary color for styling buttons and UI elements.
 * @param {string} [width="400px"] - Width of the video container.
 * @param {string} [height="200px"] - Height of the video container.
 *
 * Behavior:
 * - If `videoFile` is provided as a Blob/File, a temporary URL is created for preview.
 * - If `videoFile` is a string, it is used directly as the video source.
 * - If no video is provided, a fallback error icon is displayed.
 * - Re-upload and remove buttons are shown if corresponding callbacks are provided.
 *
 * @example
 * Example usage:
 * <VideoPlayer
 *   videoFile={selectedFile}
 *   onRemove={() => setVideo(null)}
 *   onReupload={() => openFileDialog()}
 *   color="#52C9BD"
 *   width="500px"
 *   height="280px"
 * />
 */
export const VideoPlayer = ({
  videoFile,
  onRemove = null,
  onReupload = null,
  color,
  width = "400px",
  height = "200px",
}) => {
  let videoSrc = null;
  if (videoFile) {
    if (videoFile instanceof Blob) {
      videoSrc = URL.createObjectURL(videoFile);
    } else if (typeof videoFile === "string") {
      videoSrc = videoFile;
    }
  }

  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--width": width,
    "--height": height,
  };

  return (
    <div className={style.videoContainer} style={cssVariable}>
      {videoSrc ? (
        <div className={style.videoPreview}>
          <video
            controls
            controlsList="nodownload"
            muted
            autoPlay
            src={videoSrc}
            className={style.videoPlayer}
          />
          <div className={style.resetRemove}>
            {onReupload && (
              <IconButton
                icon={resetFieldIcon}
                onClick={onReupload}
                color={color || "#52C9BD"}
                label={"Re-Upload"}
              />
            )}
            {onRemove && (
              <IconButton icon={crossIcon} onClick={onRemove} color="#FF5969" />
            )}
          </div>
        </div>
      ) : (
        <IconError
          icon={videoNotIcon}
          messgae={"Ah!! Looks live video not fount"}
          size={2.5}
        />
      )}
    </div>
  );
};
