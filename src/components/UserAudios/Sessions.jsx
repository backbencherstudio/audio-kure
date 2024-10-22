import React, { useState, useEffect } from 'react';
import sessionImg from '../../assets/images/cure_session.png';
import SessionAudioPlay from './SessionAudioPlay';
import { FaPlay } from 'react-icons/fa';
import CustomAudioPlayer from './CustomAudioPlayer';
import data from "../../../public/sessions.json"; // Assuming data is imported here

const Sessions = ({ selectedMonth, setPlayedAudios, playedAudios, sessions }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [sessionImage, setSessionImage] = useState(null);
  const [audioUnlockStates, setAudioUnlockStates] = useState({});

  useEffect(() => {
    const savedPlayedAudios = JSON.parse(localStorage.getItem("playedAudios")) || {};
    setPlayedAudios(savedPlayedAudios);
    initializeUnlockStates(savedPlayedAudios);
  }, []);

  const initializeUnlockStates = (savedPlayedAudios) => {
    const initialUnlockStates = {};
    Object.keys(data).forEach(category => {
      initialUnlockStates[category] = {};
      Object.keys(data[category]).forEach(subCategory => {
        const audios = data[category][subCategory];
        initialUnlockStates[category][subCategory] = audios.map((_, index) => {
          // Unlock the first audio if it has been played
          return savedPlayedAudios[category]?.[subCategory]?.includes(index) || index === 0;
        });
      });
    });
    setAudioUnlockStates(initialUnlockStates);
  };

  const markAudioAsPlayed = (category, subCategory, audioIndex) => {
    setPlayedAudios((prev) => {
      const categoryData = prev[category] || {};
      const subCategoryData = categoryData[subCategory] || [];
      
      // Ensure that the audio is not added again if it has already been played
      if (!subCategoryData.includes(audioIndex)) {
        const updatedPlayedAudios = {
          ...prev,
          [category]: {
            ...categoryData,
            [subCategory]: [...subCategoryData, audioIndex],
          },
        };
        localStorage.setItem("playedAudios", JSON.stringify(updatedPlayedAudios));
        return updatedPlayedAudios;
      }
      return prev; // Return the previous state if audio is already played
    });

    // Unlock the next audio in the sub-category
    setAudioUnlockStates((prevStates) => {
      const nextIndex = audioIndex + 1; // Use audioIndex to determine next audio
      return {
        ...prevStates,
        [category]: {
          ...prevStates[category],
          [subCategory]: prevStates[category][subCategory].map((state, index) => {
            return index === nextIndex ? true : state; // Unlock the next audio
          }),
        },
      };
    });
  };

  const handleAudioSelect = (category, subCategory, audio) => {
    setCurrentAudio(audio.audio);
    setSessionImage(sessionImg);
    markAudioAsPlayed(category, subCategory, audio.id); // Pass audio.id directly as index
  };

  const currentSession = sessions.find((session) => session.id === selectedMonth);

  return (
    <div className="border-t mt-5 border-[#2f2861]">
      <div className="max-w-7xl mx-4 md:mx-auto my-8">
        <div className="text-3xl font-semibold my-8">
          Your cure session for Month {selectedMonth}
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
                    Session {selectedMonth}
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
                        handleAudioSelect(currentSession.audios[0].category, currentSession.audios[0].subCategory, currentSession.audios[0])
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
              selectedMonth={selectedMonth}
              audioUnlockStates={audioUnlockStates} // Pass unlock states
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
