import React, { useContext } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedo,
  FaVolumeUp,
} from "react-icons/fa";
import { songContext } from "../song.context";
import { useState, useRef, useEffect } from "react";

const Player = () => {
  const { song } = useContext(songContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Playback failed:", e));
      setIsPlaying(true);
    }
  }, [song]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleScrub = (e) => {
    const time = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e) => {
    const val = e.target.value / 100;
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!song) {
    return (
      <div className="fixed bottom-0 left-0 w-full h-20 bg-black text-white flex items-center justify-center px-6">
        <p className="text-gray-400">Waiting for mood detection to load a song...</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-black text-white flex items-center justify-between px-6">

      <div className="flex items-center gap-4 w-1/4">
        <audio 
          ref={audioRef} 
          src={song.url} 
          onEnded={() => setIsPlaying(false)} 
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
        <img
          src={song.postUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop"}
          alt="cover"
          className="w-14 h-14 rounded object-cover"
        />

        <div>
          <p className="text-sm font-semibold truncate w-40">{song.title || "Unknown Song"}</p>
          <p className="text-xs text-gray-400 truncate w-40">Modify Originals</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-2/4">

        <div className="flex items-center gap-6 text-lg">
          <FaRandom className="cursor-pointer text-gray-400 hover:text-white" />
          <FaStepBackward className="cursor-pointer hover:text-green-500" />

          <button 
            onClick={togglePlay}
            className="bg-white text-black p-3 rounded-full hover:scale-105"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <FaStepForward className="cursor-pointer hover:text-green-500" />
          <FaRedo className="cursor-pointer text-gray-400 hover:text-white" />
        </div>

        <div className="flex items-center gap-3 w-full mt-2">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleScrub}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
          />

          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 w-1/4 justify-end">
        <FaVolumeUp className="text-gray-400" />

        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
        />
      </div>
    </div>
  );
};

export default Player;