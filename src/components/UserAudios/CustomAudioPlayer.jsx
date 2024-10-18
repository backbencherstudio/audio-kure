// CustomAudioPlayer.js
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './customPlayerCss.css'; // Optional custom CSS for styling

const CustomAudioPlayer = ({ audioSrc, onAudioEnd }) => {
  return (
    <AudioPlayer
      src={audioSrc}
      autoPlay
      onEnded={onAudioEnd}
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
