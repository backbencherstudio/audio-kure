import React, { useState, useEffect } from 'react';
import sessionImg from '../../assets/images/cure_session.png';
// import audio1 from '../../assets/audios/audio1.mp3';
// import audio2 from '../../assets/audios/audio2.mp3';
// import audio3 from '../../assets/audios/audio3.mp3';
// import audio4 from '../../assets/audios/audio4.mp3';
// import audio5 from '../../assets/audios/audio5.mp3';
// import audio6 from '../../assets/audios/audio6.mp3';
// import audio7 from '../../assets/audios/audio7.mp3';
// import audio8 from '../../assets/audios/audio8.mp3';
// import audio9 from '../../assets/audios/audio9.mp3';
// import audio10 from '../../assets/audios/audio10.mp3';
import SessionAudioPlay from './SessionAudioPlay';
import { FaPlay } from 'react-icons/fa';
import CustomAudioPlayer from './CustomAudioPlayer';

const Sessions = ({ selectedDay, setPlayedAudios, playedAudios, sessions }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [sessionImage, setSessionImage] = useState(null);


  useEffect(() => {
    const savedPlayedAudios = JSON.parse(localStorage.getItem("playedAudios")) || {};
    setPlayedAudios(savedPlayedAudios);
  }, []);

  const markAudioAsPlayed = (day, audioSrc) => {
    setPlayedAudios((prev) => {
      // Ensure that the audio is not added again if it has already been played
      const alreadyPlayed = prev[day] && prev[day].includes(audioSrc);
      if (!alreadyPlayed) {
        const updatedPlayedAudios = {
          ...prev,
          [day]: prev[day] ? [...prev[day], audioSrc] : [audioSrc]
        };
        localStorage.setItem("playedAudios", JSON.stringify(updatedPlayedAudios));
        return updatedPlayedAudios;
      }
      return prev; // Return the previous state if audio is already played
    });
  };

  const handleAudioSelect = (audioSrc) => {
    setCurrentAudio(audioSrc);
    setSessionImage(sessionImg);
    markAudioAsPlayed(selectedDay, audioSrc);
  };

  const currentSession = sessions.find((session) => session.id === selectedDay);
  

  return (
    <div className="border-t mt-5 border-[#2f2861]">
      <div className="max-w-7xl mx-4 md:mx-auto my-8">
        <div className="text-3xl font-semibold my-8">
          Your cure session for Day {selectedDay}
        </div>

        <div className="grid md:grid-cols-2 gap-8 my-4">
          {/* Left Side - Session Card with Player */}
          <div className="flex flex-col gap-4">
            {currentSession && (
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={currentSession.image}
                  alt="session"
                  className="opacity-70 w-full"
                />
                <div className="absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-t from-black to-transparent p-4">
                  <div className="text-white text-3xl font-bold mb-2">
                    Session {selectedDay}
                  </div>
                  <div className="text-white text-xl font-semibold mb-2">
                    {currentSession.title}
                  </div>
                  <div className="text-white mb-4 text-center font-semibold">
                    Description for {currentSession.title} goes here.
                  </div>
                  {currentAudio ? (
                    <CustomAudioPlayer
                      audioSrc={currentAudio}
                      onAudioEnd={() => setCurrentAudio(null)}
                    />
                  ) : (
                    <button
                      className="flex gap-2 items-center bg-slate-400 p-2 rounded-3xl justify-center w-full"
                      onClick={() =>
                        handleAudioSelect(currentSession.audios[0])
                      }
                    >
                      <FaPlay /> Play The Audios
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Always Visible Audio List */}
          <div className="flex flex-col">
            <SessionAudioPlay
              sessions={sessions}
              setCurrentAudio={handleAudioSelect}
              playedAudios={playedAudios}
              setSessionImage={setSessionImage}
              selectedDay={selectedDay}
              // markAudioAsPlayed={markAudioAsPlayed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
