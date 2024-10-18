import React, { useState, useEffect } from 'react';
import playButton from '../../assets/images/play_button.png';
import { FaPlay } from 'react-icons/fa';

const SessionAudioPlay = ({ sessions, selectedSessions, setSelectedSessions, user, onPlayAudio }) => {
    const [audioElement, setAudioElement] = useState(null);
  
    const handlePlay = (session) => {
      if (audioElement) {
        audioElement.pause();
      }
  
      const newAudio = new Audio(session.audio);
      newAudio.play();
      setAudioElement(newAudio);
  
      onPlayAudio(session);
    };
  return (
    <div className='grid gap-4 flex-grow md:h-full'>
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`flex gap-4 justify-between backdrop-blur-md backdrop-brightness-200 p-4 px-8 rounded-2xl 
          ${selectedSessions.includes(session.id) ? 'border-2 border-[#b0a3f8]' : ''}`}
        >
          <div className='flex gap-4'>
            <div>
              <img src={session.image} alt="" className='w-10 rounded-2xl' />
            </div>
            <div className='grid items-center'>
              <div className='flex gap-1'>
                <div className='text-xl'>{session.title}</div>
                <div className='bg-[#565183] px-3 py-1 rounded-2xl text-sm font-semibold grid items-center'>
                  {session.duration || 'Loading...'}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => handlePlay(session)}
            disabled={!user || !session.isUnlocked}
            className={!session.isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <div className='p-1 grid items-center'>
              <img 
                src={playButton} 
                alt="Play" 
                className='w-8 cursor-pointer' 
              />
            </div>
          </button>
        </div>
      ))}
    </div>
  )
}

export default SessionAudioPlay