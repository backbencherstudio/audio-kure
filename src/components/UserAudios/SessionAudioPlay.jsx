import React from 'react';
import playButton from '../../assets/images/play_button.png';
import { FaPlay } from 'react-icons/fa';

const SessionAudioPlay = ({ sessions, setCurrentAudio, markAudioAsPlayed, playedAudios, setSessionImage }) => {
  
    return (
      <div className=''>
        <h2 className='text-2xl font-semibold text-white'>Available Audios</h2>
        <ul className='mt-4'>
          {sessions.map((session, sessionIndex) => (
            <div key={sessionIndex}>
              <h3 className='text-xl font-bold text-[#b0a3f8] mb-2'>Session {session.title}</h3>
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
                          <span className={`text-white ${playedAudios[audio] ? 'font-bold' : ''}`}>Audio {index + 1}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentAudio(audio);
                        setSessionImage(session.image);
                        markAudioAsPlayed(audio); // Mark audio as played
                      }}
                      className={`bg-slate-400 p-1 rounded-lg ${playedAudios[audio] ? 'border-2 border-cyan-500' : ''}`}
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
            </div>
          ))}
        </ul>
      </div>
  );
}

export default SessionAudioPlay;
