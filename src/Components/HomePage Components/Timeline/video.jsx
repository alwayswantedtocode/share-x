import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Video = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const [volume, setVolume] = useState(1); 
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef();

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Handle play/pause button click
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => {
        console.error("Autoplay error:", err);
      });
    }
    setIsPlaying((prevState) => !prevState);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Toggle mute state
  const toggleMute = () => {
    const muteState = !isMuted;
    videoRef.current.muted = muteState;
    setIsMuted(muteState);
    if (muteState) setVolume(0);
    else setVolume(videoRef.current.volume);
  };

  // Update the current time
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Get video duration once loaded
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  // Use IntersectionObserver to auto play/pause when the video enters the viewport
  useEffect(() => {
    const videoElement = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlaying) {
            // Play video if it enters the viewport 
            videoRef.current.play().catch((err) => {
              console.error("Autoplay error:", err);
            });
            setIsPlaying(true);
          } else if (!entry.isIntersecting && isPlaying) {
            // Pause video if it's out of the viewport 
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 } // when 50% of the video is visible,start to play
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []); // Only run when isPlaying state changes

  return (
    <div className="Desc-video-container">
      <video
        ref={videoRef}
        muted={isMuted}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={media} />
      </video>

      <div className="controllers">
        <div className="play-pause-container">
          <button className="icon-btn" onClick={handlePlayPause}>
            {isPlaying ? (
              <FaPause className="icon" />
            ) : (
              <FaPlay className="icon" />
            )}
          </button>
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <input
              type="range"
              className="progress-bar"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleProgressChange}
            />
            <div className="time-display">
              <p>{formatTime(currentTime)}</p>
              <p>/</p>
              <p>{formatTime(duration)}</p>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="volume-control-container">
          <button className="icon-btn" onClick={toggleMute}>
            {isMuted ? (
              <FaVolumeMute className="icon" />
            ) : (
              <FaVolumeUp className="icon" />
            )}
          </button>

          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
