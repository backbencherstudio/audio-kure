/* eslint-disable react/prop-types */
import { useState } from 'react';
import sessionImg from '../../assets/images/cure_session.png';
import { FaPlay, FaPause, FaLock } from 'react-icons/fa'; // Added FaLock for push icon
import CustomAudioPlayer from './CustomAudioPlayer';
import data from "../../../public/sessions.json";
import authApi from '../../redux/fetures/auth/authApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
// import { toast } from 'react-toastify';

const Sessions = ({ selectedMonth, sessions }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingAudio, setPlayingAudio] = useState({ id: 0, category: "" });
  const [sessionImage, setSessionImage] = useState(sessionImg);
  const [updateAudioData] = authApi.useUpdateAudioDataMutation();
  const currentUser = useSelector(selectCurrentUser);

  const { data: userData } = authApi.useGetSingleUserQuery(currentUser?.email);
  const selfAudioId = userData?.data?.selfId; 

  const self = data?.emotional?.self;
  const ego = data?.emotional?.ego;

  const currentSession = sessions.find((session) => session.id === selectedMonth);

  const canAccessEgo = self?.length === selfAudioId && userData?.data?.category[0] === "self";

  const AccessEgo = ego?.length === selfAudioId && userData?.data?.category[0] === "ego";

  const handleAudioSelect = async (audio) => {

    console.log({audio});
    

    // if (audio.category === "ego" && !canAccessEgo) {
    //   toast.warning("You need to finish all Self audios before accessing Ego audios.");
    //   return;
    // }

    // if (audio.id > selfAudioId + 1) {
    //   console.log("You cannot play this audio yet.");
    //   return;
    // }

    if (playingAudio.id === audio.id && playingAudio.category === audio.category) {
      setCurrentAudio(null);
      setPlayingAudio({ id: null, category: null });
    } else {
      setCurrentAudio(audio);
      setPlayingAudio({ id: audio.id, category: audio.category });
      setSessionImage(sessionImg);
      const audioData = {
        email: currentUser?.email,
       selfId: audio.id,
        category: audio.category,
      };

      await updateAudioData(audioData);
      // if (selfAudioId + 1 === audio.id) {
      //   await updateAudioData(audioData);
      // }
    }
  };

  // const handleAudioSelect = async (audio) => {
  //   // Check if the selected audio is in the Ego category and if it can be accessed
  //   if (audio.category === "ego") {
  //     if (!canAccessEgo) {
  //       toast.warning("You need to finish all Self audios before accessing Ego audios.");
  //       return; // Exit early if Ego audios are not accessible
  //     }
  //   }
  
  //   // Check if the audio ID is available to play
  //   if (audio.id > selfAudioId + 1) {
  //     console.log("You cannot play this audio yet.");
  //     toast.warning("This audio is not yet available.");
  //     return; // Exit early if the audio is not available
  //   }
  
  //   // Proceed with playing the audio if checks are passed
  //   if (playingAudio.id === audio.id && playingAudio.category === audio.category) {
  //     setCurrentAudio(null);
  //     setPlayingAudio({ id: null, category: null });
  //   } else {
  //     setCurrentAudio(audio);
  //     setPlayingAudio({ id: audio.id, category: audio.category });
  //     setSessionImage(sessionImg);
  //     const audioData = {
  //       email: currentUser?.email,
  //       audioId: audio.id,
  //       category: audio.category,
  //     };
  
  //     if (selfAudioId + 1 === audio.id) {
  //       await updateAudioData(audioData);
  //     }
  //   }
  // };

  
  const handleAudioEnd = () => {
    setCurrentAudio(null);
    setPlayingAudio({ id: null, category: null });
  };

  return (
    <div className="border-t mt-5 border-[#2f2861]">
      <div className="max-w-7xl mx-4 md:mx-auto my-8">
        <div className="text-3xl font-semibold my-8">
          Your cure session for Month {selectedMonth}
        </div>

        <div className="grid md:grid-cols-2 gap-8 my-4">
          <div className="flex flex-col gap-4">
            {currentSession && (
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={sessionImage}
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
                    Description for <span className='text-xl font-semibold text-red-500'>{currentAudio?.name}</span> goes here.
                  </div>
                  {currentAudio ? (
                    <CustomAudioPlayer
                      audioSrc={currentAudio.audio}
                      onAudioEnd={handleAudioEnd}
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

          <div className="grid grid-cols-2 gap-10">
            {/* Self Section */}
            <div className="">
              <h2>Self</h2>
              <div>
                {self?.map((item) => (
                  <div key={item.id}>
                    <button
                      className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${
                        playingAudio.category === item.category && item.id === playingAudio.id
                          ? 'bg-blue-500' : 'bg-transparent'
                      }`}
                      onClick={() => handleAudioSelect(item)}
                      disabled={item.id > selfAudioId + 1} 
                    >
                      {item.id > selfAudioId + 1 ? (
                        <FaLock /> 
                      ) : playingAudio.id === item.id && playingAudio.category === item.category ? (
                        <FaPause /> 
                      ) : (
                        <FaPlay /> 
                      )}
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ego Section */}
            <div className="">
              <h2>Ego</h2>
              <div>
                {ego?.map((item) => (
                  <div key={item.id}>
                    <button
                      className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${
                        playingAudio.category === item.category && item.id === playingAudio.id
                          ? 'bg-transparent' : 'bg-transparent'
                      }`}
                      onClick={() => handleAudioSelect(item)}
                      disabled={item.id > selfAudioId + 1 || !canAccessEgo} 
                    >
                      {item.id > selfAudioId + 1 || !canAccessEgo ? (
                        <FaLock />
                      ) : playingAudio.id === item.id && playingAudio.category === item.category ? (
                        <FaPause /> 
                      ) : (
                        <FaPlay /> 
                      )}
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
