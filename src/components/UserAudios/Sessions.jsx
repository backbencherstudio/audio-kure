import  { useState, useEffect } from 'react';
import sessionImg from '../../assets/images/cure_session.png';
// import audio1 from '../../assets/audios/audio1.mp3';
// import audio2 from '../../assets/audios/audio2.mp3';
// import audio3 from '../../assets/audios/audio3.mp3';
// import audio4 from '../../assets/audios/audio4.mp3';
// import audio5 from '../../assets/audios/audio5.mp3';
// import audio6 from '../../assets/audios/audio6.mp3';
import SessionAudioPlay from './SessionAudioPlay';
import { FaPlay } from 'react-icons/fa';

const user = false; // Test purpose flag

const Sessions = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);

  // Updated sessions array with unique audio for each session
  const sessions = [
    // {
    //   id: 1,
    //   title: 'Introduction',
    //   image: sessionImg,
    //   audio: audio1,
    // },
    // {
    //   id: 2,
    //   title: 'Understanding',
    //   image: sessionImg,
    //   audio: audio2,
    // },
    // {
    //   id: 3,
    //   title: 'Awareness',
    //   image: sessionImg,
    //   audio: audio3,
    // },
    // {
    //   id: 4,
    //   title: 'Confidence Building',
    //   image: sessionImg,
    //   audio: audio4,
    // },
    // {
    //   id: 5,
    //   title: 'Goal Setting',
    //   image: sessionImg,
    //   audio: audio5,
    // },
    // {
    //   id: 6,
    //   title: 'Overcoming Challenges',
    //   image: sessionImg,
    //   audio: audio6,
    // },
    // {
    //   id: 7,
    //   title: 'Mindfulness',
    //   image: sessionImg,
    //   audio: audio7,
    // },
    // {
    //   id: 8,
    //   title: 'Positive Affirmations',
    //   image: sessionImg,
    //   audio: audio8,
    // },
    // {
    //   id: 9,
    //   title: 'Visualization Techniques',
    //   image: sessionImg,
    //   audio: audio9,
    // },
    // {
    //   id: 10,
    //   title: 'Conclusion',
    //   image: sessionImg,
    //   audio: audio10,
    // },
  ];

  // Update session unlocks based on completion logic and time
  useEffect(() => {
    const savedCompletedSessions = JSON.parse(localStorage.getItem('completedSessions')) || [];
    setCompletedSessions(savedCompletedSessions);

    // Unlock the next session if all previous sessions are completed
    sessions.forEach((session, index) => {
      session.isUnlocked = completedSessions.includes(index); // Unlock if previous session completed
    });
  }, []);

  const handlePlayAudio = (session) => {
    setCurrentAudio(session);
    setSelectedSessions((prev) => [...prev, session.id]);

    // Save completed sessions
    setCompletedSessions((prev) => {
      const updated = [...prev, session.id];
      localStorage.setItem('completedSessions', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className='border-t mt-5 border-[#2f2861]'>
      <div className='max-w-7xl mx-4 md:mx-auto my-8'>
        <div className='text-3xl font-semibold'>Your cure session</div>
        
        <div className='relative grid justify-center my-4'>
          <img src={sessionImg} alt="" className='opacity-70 rounded-3xl' />
          <div className='absolute inset-0 flex flex-col justify-end items-center p-4'>
            <div className='text-white text-4xl font-bold mb-4'>Session 1</div>
            <div className='text-white mb-4 md:mx-96 text-balance text-center font-semibold'>
              Emotional Suggestible: What the heck is that? Well, that means you learn by in-direct hypnosis
            </div>
            <div className='w-96 px-4'>
              <button className='flex gap-2 items-center bg-slate-400 p-2 rounded-3xl justify-center w-full'>
                <FaPlay /> Play
              </button>
            </div>
          </div>
        </div>
        
        <SessionAudioPlay 
          sessions={sessions}
          selectedSessions={selectedSessions}
          setSelectedSessions={setSelectedSessions}
          user={user}
          onPlayAudio={handlePlayAudio}
        />

        {/* Show currently playing session controls */}
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
  );
};

export default Sessions;
