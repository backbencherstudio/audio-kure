import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './customPlayerCss.css'; // Optional custom CSS for styling

const CustomAudioPlayer = ({ audioSrc, onAudioEnd, audioId, categoryName, onAudioPlay }) => {

  // Function to handle audio play event
  const handlePlay = () => {
    if (onAudioPlay) {
      onAudioPlay(audioId, categoryName, audioSrc); // Pass the audio ID and category to the parent
    }
  };

  return (
    <AudioPlayer
      src={audioSrc}
      autoPlay
      onPlay={handlePlay}  // Capture the play event
      onEnded={onAudioEnd} // Capture the end event
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
