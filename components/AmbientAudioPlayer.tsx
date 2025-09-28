import React, { useRef, useState, useEffect } from 'react';
import { COLORS } from '../constants';

// Declaration for feather icons script
declare global {
    interface Window {
        feather: {
            replace: () => void;
        };
    }
}

interface AmbientAudioPlayerProps {
  src: string;
  volume?: number; // 0 to 1
}

const AmbientAudioPlayer: React.FC<AmbientAudioPlayerProps> = ({ src, volume = 0.3 }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);

  useEffect(() => {
    // Replace feather icons on mount and state changes
    if (window.feather) {
        window.feather.replace();
    }
  }, [isPlaying, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = currentVolume;
      if (isPlaying && !isMuted) {
        audio.play().catch(error => console.log("Audio play failed:", error));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, isMuted, currentVolume]);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0) setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-3 p-2 bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-gray-700">
      <audio ref={audioRef} src={src} />
      <button 
        onClick={togglePlayPause} 
        className="w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors duration-200"
        style={{ backgroundColor: isPlaying ? COLORS.orange : 'transparent' }}
        aria-label={isPlaying ? "Pausar áudio ambiente" : "Reproduzir áudio ambiente"}
        data-cursor-pointer
      >
        <i data-feather={isPlaying ? 'pause' : 'play'}></i>
      </button>
      <button 
        onClick={toggleMute} 
        className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-gray-800 transition-colors duration-200"
        aria-label={isMuted ? "Desmutar áudio ambiente" : "Mutar áudio ambiente"}
        data-cursor-pointer
      >
        <i data-feather={isMuted ? 'volume-x' : 'volume-2'}></i>
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={currentVolume}
        onChange={handleVolumeChange}
        className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        aria-label="Controle de volume"
      />
    </div>
  );
};

export default AmbientAudioPlayer;