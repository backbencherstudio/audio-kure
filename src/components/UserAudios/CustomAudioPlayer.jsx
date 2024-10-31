import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useRef, useEffect } from 'react';

const CustomAudioPlayer = ({ audioSrc, onAudioEnd, audioId, categoryName, onAudioPlay, onListeningTimeUpdate, setListeningTime, listeningTime, setAudioDuration }) => {
  const playStartRef = useRef(null);
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (onAudioPlay) {
      onAudioPlay(audioId, categoryName, audioSrc);
    }
    playStartRef.current = Date.now();
  };

  // const handlePause = () => {
  //   if (playStartRef.current) {
  //     const timePlayed = (Date.now() - playStartRef.current) / 1000;
  //     setListeningTime(prevTime => prevTime + timePlayed);
  //     playStartRef.current = null;
  //   }
  // };

  const handlePause = () => {
    if (playStartRef.current) {
      const timePlayed = (Date.now() - playStartRef.current) / 1000;
      setListeningTime(prevTime => Math.round(prevTime + timePlayed));
      playStartRef.current = null;
    }
  };


  const handleEnded = () => {
    handlePause();
    if (onAudioEnd) {
      onAudioEnd(listeningTime);
    }
    if (onListeningTimeUpdate) {
      onListeningTimeUpdate(audioId, listeningTime);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current?.audio?.current;

    const updateDuration = () => {
      if (audioElement?.duration) {
        // setAudioDuration(parseFloat(audioElement.duration.toFixed(6)));
        // setAudioDuration(audioElement.duration);
        setAudioDuration(Math.round(audioElement.duration));
      }
    };

    if (audioElement) {
      audioElement.addEventListener('loadedmetadata', updateDuration);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    setListeningTime(0);
    playStartRef.current = null;
  }, [audioSrc]);

  return (
    <AudioPlayer
      ref={audioRef}
      src={audioSrc}
      autoPlay
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
      showSkipControls={false}
      showJumpControls={false}
      customAdditionalControls={[]}
      layout="horizontal"
      customVolumeControls={[]}
      className="custom-audio-player bg-transparent"
    />
  );
};

export default CustomAudioPlayer;

