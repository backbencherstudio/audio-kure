import React from 'react';
import playButton from '../../assets/images/play_button.png';
import { FaPlay } from 'react-icons/fa';

const SessionAudioPlay = ({ selectedMonth, sessions, setCurrentAudio, markAudioAsPlayed, playedAudios, setSessionImage }) => {
    // Get the session corresponding to the selected day
    const session = sessions.find((s) => s.id === selectedMonth);
    // console.log('session', session);
    
    // If no session is found for the selected day, don't render anything
    if (!session) {
        return <div className='text-white'>No audios available for this day.</div>;
    }

    // console.log('playedAudios', playedAudios);
    
    return (
      <div>
        <h2 className='text-2xl font-semibold text-white'>Audios for Session {session.title} - Month {selectedMonth}</h2>
        <ul className='mt-4'>
          {session.audios.map((audio, index) => (
            <li 
              key={index} 
              className={`flex gap-8 justify-between backdrop-blur-md backdrop-brightness-200 p-4 px-8 rounded-2xl mb-4`}
            >
                <div className='flex gap-4'>
                  <div>
                    <img src={session.image} alt="" className='w-10 rounded-2xl' />
                  </div>
                  <div className='grid items-center'>
                    <div className='flex gap-1'>
                      {/* Apply font-bold if the audio is played */}
                      <span className={`text-white ${playedAudios[selectedMonth] && playedAudios[selectedMonth].includes(audio) ? 'font-bold' : ''}`}>
                        {session.title} {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrentAudio(audio);
                    setSessionImage(session.image);
                    // markAudioAsPlayed(selectedMonth, audio); // Pass selectedMonth and audio to correctly mark it as played
                  }}
                  className={`bg-transparent p-1 rounded-lg ${playedAudios[selectedMonth] && playedAudios[selectedMonth].includes(audio) ? 'border-2' : ''}`}
                  style={playedAudios[selectedMonth] && playedAudios[selectedMonth].includes(audio) ? { borderColor: 'rgb(0, 255, 255)', borderWidth: '1px', borderStyle: 'solid' } : {}}
                >
                  <div className='p-1 grid items-center'>
                    <img 
                      src={playButton} // Update to your play button image path
                      alt="Play" 
                      className='w-8 cursor-pointer' 
                    />
                  </div>
                </button>
            </li>
          ))}
        </ul>
      </div>
  );
}

export default SessionAudioPlay;
