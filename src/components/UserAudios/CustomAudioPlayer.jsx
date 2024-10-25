// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
// // import './customPlayerCss.css'; 

// const CustomAudioPlayer = ({ audioSrc, onAudioEnd, audioId, categoryName, onAudioPlay }) => {

//   const handlePlay = () => {
//     if (onAudioPlay) {
//       onAudioPlay(audioId, categoryName, audioSrc); 
//     }
//   };

//   return (
//     <AudioPlayer
//       src={audioSrc}
//       autoPlay
//       onPlay={handlePlay} 
//       onEnded={onAudioEnd}
//       showSkipControls={false}
//       showJumpControls={false}
//       customAdditionalControls={[]}
//       layout="horizontal"
//       customVolumeControls={[]}
//       className="custom-audio-player bg-transparent"
//     />
//   );
// };

// export default CustomAudioPlayer;


// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
// import { useRef, useEffect } from 'react';

// const CustomAudioPlayer = ({ audioSrc, onAudioEnd, audioId, categoryName, onAudioPlay, onListeningTimeUpdate, setListeningTime, listeningTime, setAudioDuration }) => {
//   const playStartRef = useRef(null);
//   const audioRef = useRef(null);

//   const handlePlay = () => {
//     if (onAudioPlay) {
//       onAudioPlay(audioId, categoryName, audioSrc);
//     }
//     playStartRef.current = Date.now();
//   };

//   const handlePause = () => {
//     if (playStartRef.current) {
//       const timePlayed = (Date.now() - playStartRef.current) / 1000;
//       setListeningTime(prevTime => prevTime + timePlayed);
//       playStartRef.current = null;
//     }
//   };

//   const handleEnded = () => {
//     handlePause();
//     if (onAudioEnd) {
//       onAudioEnd(listeningTime);
//     }
//     if (onListeningTimeUpdate) {
//       onListeningTimeUpdate(audioId, listeningTime);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     const duration = audioRef.current.audio.current?.duration;
//     if (duration) {
//       console.log("Audio Duration:", duration);
//       setAudioDuration(duration);
//     } else {
//       // Retry mechanism
//       setTimeout(handleLoadedMetadata, 100);
//     }
//   };
  
//   useEffect(() => {
//     setListeningTime(0);
//     playStartRef.current = null;
//   }, [audioSrc]);

//   return (
//     <AudioPlayer
//       ref={audioRef}
//       src={audioSrc}
//       autoPlay
//       onPlay={handlePlay}
//       onPause={handlePause}
//       onEnded={handleEnded}
//       onLoadedMetadata={handleLoadedMetadata} // Capture the duration
//       showSkipControls={false}
//       showJumpControls={false}
//       customAdditionalControls={[]}
//       layout="horizontal"
//       customVolumeControls={[]}
//       className="custom-audio-player bg-transparent"
//     />
//   );
// };

// export default CustomAudioPlayer;



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

  const handlePause = () => {
    if (playStartRef.current) {
      const timePlayed = (Date.now() - playStartRef.current) / 1000;
      setListeningTime(prevTime => prevTime + timePlayed);
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

  // Method to fetch duration after metadata is loaded
  useEffect(() => {
    const audioElement = audioRef.current?.audio?.current;

    const updateDuration = () => {
      if (audioElement?.duration) {
        setAudioDuration(audioElement.duration);
      }
    };

    // Adding a metadata event listener to ensure duration is captured
    if (audioElement) {
      audioElement.addEventListener('loadedmetadata', updateDuration);
    }

    // Cleanup event listener when component unmounts
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

