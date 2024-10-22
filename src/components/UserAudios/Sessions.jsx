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
    Object.keys(data).forEach((category) => {
        initialUnlockStates[category] = {};
        Object.keys(data[category]).forEach((subCategory) => {
            const audios = data[category][subCategory];
            const playedIndex = savedPlayedAudios[category]?.[subCategory]?.[0] || -1; // Get the last played index
            initialUnlockStates[category][subCategory] = audios.map((_, index) => {
                // Unlock all previous audios, the played one, and the next audio after the last played
                return index <= playedIndex + 1;
            });
        });
    });
    setAudioUnlockStates(initialUnlockStates);
};

  const markAudioAsPlayed = (category, subCategory, audioIndex) => {
    // Update the played audios in the state
    setPlayedAudios((prev) => {
      const updatedPlayedAudios = {
        ...prev,
        [category]: {
          ...prev[category],
          [subCategory]: [audioIndex] // Store only the last played audio index
        },
      };
      localStorage.setItem("playedAudios", JSON.stringify(updatedPlayedAudios));
      return updatedPlayedAudios;
    });

    // Unlock the next audio in the sub-category and all previous ones
    setAudioUnlockStates((prevStates) => {
      const nextIndex = audioIndex + 1; // Determine the next audio
      const updatedUnlockStates = {
        ...prevStates,
        [category]: {
          ...prevStates[category],
          [subCategory]: prevStates[category][subCategory].map((state, index) => {
            return index <= audioIndex; // Unlock the current audio and all previous ones
          }),
        },
      };
      return updatedUnlockStates;
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
                      // onClick={() =>
                      //   handleAudioSelect(currentSession.audios[0].category, currentSession.audios[0].subCategory, currentSession.audios[0])
                      // }
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
              data={data}
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
