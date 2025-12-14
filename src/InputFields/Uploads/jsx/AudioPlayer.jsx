"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import style from "../css/AudioPlayer.module.css";
import {
  crossIcon,
  speakerOffIcon,
  pauseIcon,
  playIcon,
  resetFieldIcon,
  speakerOnIcon,
} from "../../../utils/icons.jsx";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";
import { Slider } from "../../NumericInput.jsx/jsx/Slider.jsx";

/**
 * `AudioPlayer` is a React component for rendering a customizable audio player with play/pause,
 * seek, hover preview, volume control, mute/unmute, and optional remove or re-upload actions.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} props.audioSrc - Source URL of the audio file.
 * @param {function} [props.onRemove=null] - Callback fired when the remove button is clicked.
 * @param {string} [props.color] - Primary color for controls and progress.
 * @param {function} [props.onReupload=null] - Callback fired when the re-upload button is clicked.
 * @param {string} [props.width="500px"] - Width of the audio player container.
 *
 * @example
 * <AudioPlayer
 *   audioSrc="https://example.com/audio.mp3"
 *   onRemove={() => console.log("Removed")}
 *   onReupload={() => console.log("Re-upload")}
 *   color="#52C9BD"
 *   width="600px"
 * />
 *
 * @returns {JSX.Element} A fully featured audio player with custom controls.
 */

export const AudioPlayer = ({
  audioSrc,
  onRemove = null,
  color,
  onReupload = null,
  width = "500px",
}) => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);

  const isMuted = volume === 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  // useEffect(() => {
  //   // Cleanup only on unmount
  //   return () => {
  //     console.log("DDDD", "Triggered")
  //     if (audioSrc) URL.revokeObjectURL(audioSrc);
  //   };
  // }, []);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = isMuted ? 0.5 : 0;
    setVolume(newVolume);
    audio.volume = newVolume;
  };

  const handleVolumeChange = (value) => {
    const vol = value / 100;
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // position within the seekbar
    const newTime = (clickX / rect.width) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const time = (hoverX / rect.width) * duration;
    setHoverTime(time);
  };

  const trackWidth = useMemo(() => {
    return duration ? (currentTime / duration) * 100 : 0;
  }, [currentTime, duration]);

  const cssVars = {
    "--color": color || "var(--colorCyan)",
    "--width": width,
  };

  return (
    <div className={style.audioPreview} style={cssVars}>
      <audio ref={audioRef} src={audioSrc} />

      <div className={style.customControls}>
        <div className={style.player}>
          <IconButton
            icon={isPlaying ? pauseIcon : playIcon}
            onClick={handlePlayPause}
            color={isPlaying ? color || "#52C9BD" : "#FF5969"}
            size="1.2"
            style={{ border: "none" }}
          />

          <div className={style.timeInfo}>
            {formatTime(currentTime)}
            {hoverTime !== null && (
              <div className={style.hoverTime}>{formatTime(hoverTime)}</div>
            )}
          </div>

          <div
            className={style.trackContainer}
            onClick={handleSeek}
            onMouseMove={handleHover}
            onMouseLeave={() => setHoverTime(null)}
          >
            <div className={style.track} style={{ width: `${trackWidth}%` }} />
            <div
              className={style.progressCircle}
              style={{ left: `${trackWidth}%` }}
            />
          </div>

          <div className={style.timeInfo}>{formatTime(duration)}</div>
        </div>

        <div className={style.controlers}>
          <div className={style.volumeControls}>
            <IconButton
              icon={isMuted ? speakerOffIcon : speakerOnIcon}
              onClick={handleMute}
              color={color || "#52C9BD"}
            />
            <Slider
              setResult={handleVolumeChange}
              value={volume * 100}
              showValueSide="left"
              color={color}
              showRange={false}
              width="auto"
            />
          </div>

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
      </div>
    </div>
  );
};
