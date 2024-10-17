import React, { useState, useEffect } from 'react';
import sessionImg from '../../assets/images/cure_session.png';
import playButton from '../../assets/images/play_button.png';

// Assuming you have the audio files in a folder
import audio1 from '../../assets/audios/audio1.mp3';
import audio2 from '../../assets/audios/audio2.mp3';
import audio3 from '../../assets/audios/audio3.mp3';
import audio4 from '../../assets/audios/audio4.mp3';
import audio5 from '../../assets/audios/audio5.mp3';
import audio6 from '../../assets/audios/audio6.mp3';

const Sessions = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioElement, setAudioElement] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [durations, setDurations] = useState({});

  // Array of session data
  const sessions = [
    {
      id: 1,
      title: 'Introduction',
      image: sessionImg,
      audio: audio1
    },
    {
      id: 2,
      title: 'Introduction',
      image: sessionImg,
      audio: audio2
    },
    {
      id: 3,
      title: 'Introduction',
      image: sessionImg,
      audio: audio3
    },
    {
      id: 4,
      title: 'Introduction',
      image: sessionImg,
      audio: audio4
    },
    {
      id: 5,
      title: 'Introduction',
      image: sessionImg,
      audio: audio5
    },
    {
      id: 6,
      title: 'Introduction',
      image: sessionImg,
      audio: audio6
    },
  ];

  // Load selected sessions from localStorage
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('selectedSessions')) || [];
    setSelectedSessions(savedSessions);

    // Load audio durations dynamically
    sessions.forEach((session) => {
      const audio = new Audio(session.audio);
      audio.addEventListener('loadedmetadata', () => {
        const durationInSeconds = Math.floor(audio.duration);
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        setDurations((prev) => ({
          ...prev,
          [session.id]: formattedDuration,
        }));
      });
    });
  }, []);

  // Save selected sessions to localStorage
  const saveSelectedSession = (sessionId) => {
    const updatedSessions = [...new Set([...selectedSessions, sessionId])];
    setSelectedSessions(updatedSessions);
    localStorage.setItem('selectedSessions', JSON.stringify(updatedSessions));
  };

  const handlePlay = (session) => {
    if (audioElement) {
      audioElement.pause();
    }

    const newAudio = new Audio(session.audio);
    newAudio.play();
    setAudioElement(newAudio);
    setCurrentAudio(session);

    saveSelectedSession(session.id);
  };

  return (
    <div className='border-t mt-5 border-[#2f2861]'>
      <div className='container mx-4 md:mx-auto my-8'>
        <div className='text-3xl font-semibold'>Your cure session</div>
        
        {/* Wrapper for the session list and player */}
        <div className='flex flex-col md:flex-row my-4 mr-8 md:mr-0'>
          <div className='grid gap-4 flex-grow md:h-full'>
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex gap-4 justify-between bg-[#33325b] p-4 px-8 rounded-2xl 
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
                        {durations[session.id] || 'Loading...'}
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => handlePlay(session)}>
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

          {/* Show the currently playing session controls */}
          {currentAudio && (
            <div className='p-4 flex flex-col items-center w-full md:w-1/3'>
              <img src={currentAudio.image} alt="Currently playing" className='w-40 rounded-2xl mb-4' />
              <audio controls autoPlay src={currentAudio.audio} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sessions;
