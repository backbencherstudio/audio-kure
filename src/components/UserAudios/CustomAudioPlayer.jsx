import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import './customPlayerCss.css'; 

const CustomAudioPlayer = ({ audioSrc, onAudioEnd, audioId, categoryName, onAudioPlay }) => {

  const handlePlay = () => {
    if (onAudioPlay) {
      onAudioPlay(audioId, categoryName, audioSrc); 
    }
  };

  return (
    <AudioPlayer
      src={audioSrc}
      autoPlay
      onPlay={handlePlay} 
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
