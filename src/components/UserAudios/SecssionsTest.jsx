/* eslint-disable react/prop-types */
import { useState } from 'react';
import sessionImg from '../../assets/images/cure_session.png';
import { FaPlay, FaPause, FaLock } from 'react-icons/fa';
import CustomAudioPlayer from './CustomAudioPlayer';
import data from "../../../public/sessions.json";
import authApi from '../../redux/fetures/auth/authApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';

const SessionsTest = ({ selectedMonth, sessions }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingAudio, setPlayingAudio] = useState({ id: 0, category: "" });
  const [sessionImage, setSessionImage] = useState(sessionImg);
  const [updateAudioData] = authApi.useUpdateAudioDataMutation();
  const currentUser = useSelector(selectCurrentUser);

  const { data: userData } = authApi.useGetSingleUserQuery(currentUser?.email);
  const selfAudioId = userData?.data?.selfId === "end" ? "end" : parseInt(userData?.data?.selfId);
  const egoAudioId = userData?.data?.egoId === "end" ? "end" : parseInt(userData?.data?.egoId);
  const bodyAudioId = userData?.data?.bodyId === "end" ? "end" : parseInt(userData?.data?.bodyId);
  const mindAudioId = userData?.data?.mindId === "end" ? "end" : parseInt(userData?.data?.mindId);

  const self = data?.emotional?.self;
  const ego = data?.emotional?.ego;
  const body = data?.physical?.body;
  const miend = data?.physical?.mind;

  const currentSession = sessions.find((session) => session.id === selectedMonth);
  const updatedAudioIds = new Set();
  // console.log(userData?.data.userType);

  const [toggleCategory, setToggleCategory] = useState(userData?.data?.userType)


  const handleAudioSelect = async (audio) => {

    if (playingAudio.id === audio.id && playingAudio.category === audio.category) {
      setCurrentAudio(null);
      setPlayingAudio({ id: null, category: null });
    } else {
      setCurrentAudio(audio);
      setPlayingAudio({ id: audio.id, category: audio.category });
      setSessionImage(sessionImg);

      const audioData = {
        email: currentUser?.email,
        [`${audio.category}Id`]: audio.id === (audio.category === "self" ? self?.length : ego?.length) ? "end" : audio.id,
        category: audio.category,
      };
      console.log(audioData);

      if (selfAudioId < audio.id && selfAudioId !== "end") {
        if (!updatedAudioIds.has(audio.id)) {
          const res = await updateAudioData(audioData);
          console.log("Self Audio Update Success: ", res?.data?.success);
          updatedAudioIds.add(audio.id);
        }
        return;
      }

      if (selfAudioId === "end" && egoAudioId < audio.id) {
        if (!updatedAudioIds.has(audio.id)) {
          const res = await updateAudioData(audioData);
          console.log("Ego Audio Update Success: ", res?.data?.success);
          updatedAudioIds.add(audio.id);
        }
      }
    }
  };

  const handlePhysicalAudioSelect = async (audio) => {

    if (playingAudio.id === audio.id && playingAudio.category === audio.category) {
      setCurrentAudio(null);
      setPlayingAudio({ id: null, category: null });
    } else {
      setCurrentAudio(audio);
      setPlayingAudio({ id: audio.id, category: audio.category });
      setSessionImage(sessionImg);

      const audioData = {
        email: currentUser?.email,
        [`${audio.category}Id`]: audio.id === (audio.category === "body" ? body?.length : miend?.length) ? "end" : audio.id,
        category: audio.category,
      };

      console.log(audioData);

      if (bodyAudioId < audio.id && bodyAudioId !== "end") {
        if (!updatedAudioIds.has(audio.id)) {
          const res = await updateAudioData(audioData);
          console.log("Self Audio Update Success: ", res?.data?.success);
          updatedAudioIds.add(audio.id);
        }
        return;
      }

      if (bodyAudioId === "end" && mindAudioId < audio.id) {
        if (!updatedAudioIds.has(audio.id)) {
          const res = await updateAudioData(audioData);
          console.log("Ego Audio Update Success: ", res?.data?.success);
          updatedAudioIds.add(audio.id);
        }
      }
    }
  };


  //   const handleAudioSelect = async (audio) => {
  //   if (playingAudio.id === audio.id && playingAudio.category === audio.category) {
  //     setCurrentAudio(null);
  //     setPlayingAudio({ id: null, category: null });
  //   } else {
  //     setCurrentAudio(audio);
  //     setPlayingAudio({ id: audio.id, category: audio.category });
  //     setSessionImage(sessionImg);

  //     const audioData = {
  //       email: currentUser?.email,
  //       [`${audio.category}Id`]: 
  //         audio.id === (audio.category === "self" ? self?.length :
  //                       audio.category === "ego" ? ego?.length :
  //                       audio.category === "body" ? body?.length :
  //                       miend?.length) ? "end" : audio.id,
  //       category: audio.category,
  //     };

  //     // Handle Self Audio Update
  //     if (selfAudioId < audio.id && selfAudioId !== "end" && audio.category === "self") {
  //       if (!updatedAudioIds.has(audio.id)) {
  //         const res = await updateAudioData(audioData);
  //         console.log("Self Audio Update Success: ", res?.data?.success);
  //         updatedAudioIds.add(audio.id);
  //       }
  //       return;
  //     }

  //     // Handle Ego Audio Update
  //     if (selfAudioId === "end" && egoAudioId < audio.id && audio.category === "ego") {
  //       if (!updatedAudioIds.has(audio.id)) {
  //         const res = await updateAudioData(audioData);
  //         console.log("Ego Audio Update Success: ", res?.data?.success);
  //         updatedAudioIds.add(audio.id);
  //       }
  //       return;
  //     }

  //     // Handle Body Audio Update
  //     if (egoAudioId === "end" && bodyAudioId < audio.id && audio.category === "body") {
  //       if (!updatedAudioIds.has(audio.id)) {
  //         const res = await updateAudioData(audioData);
  //         console.log("Body Audio Update Success: ", res?.data?.success);
  //         updatedAudioIds.add(audio.id);
  //       }
  //       return;
  //     }

  //     // Handle Miend Audio Update
  //     if (bodyAudioId === "end" && miendAudioId < audio.id && audio.category === "miend") {
  //       if (!updatedAudioIds.has(audio.id)) {
  //         const res = await updateAudioData(audioData);
  //         console.log("Miend Audio Update Success: ", res?.data?.success);
  //         updatedAudioIds.add(audio.id);
  //       }
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
                    Description for{' '}
                    <span className="text-xl font-semibold text-red-500">
                      {currentAudio?.name}
                    </span>{' '}
                    goes here.
                  </div>
                  {currentAudio ? (
                    <CustomAudioPlayer
                      audioSrc={currentAudio.audio}
                      onAudioEnd={handleAudioEnd}
                    />
                  ) : (
                    <button
                      className="flex gap-2 items-center bg-slate-400 p-2 rounded-3xl justify-center w-full"
                      onClick={() => handleAudioSelect(currentSession.audios[0])}
                    >
                      <FaPlay /> Play The Audios
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>

            <div className='grid grid-cols-2 gap-10 mb-5' >

              <button onClick={()=>{setToggleCategory("emotional")}}  className={`button rounded-md ${toggleCategory === "emotional" ? "text-yellow-300 " : "text-white"} font-bold text-[20px]`}>Emotion</button>
              <button onClick={()=>{setToggleCategory("physical")}}  className={`button rounded-md ${toggleCategory === "emotional" ? "text-white" : "text-yellow-300"} font-bold text-[20px]`}>Physical</button>

            </div>

            {/* ====================================================  emotional ========================================= */}
            <div className={`grid grid-cols-2 gap-10 ${toggleCategory === "emotional" ? "block" : "hidden"} `}>

              {/* Self Section */}
              <div>
                <h2>Self</h2>
                <div>
                  {self?.map((item) => (
                    <div key={item.id}>
                      <button
                        className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${playingAudio.category === item.category &&
                          item.id === playingAudio.id
                          ? 'bg-blue-500'
                          : 'bg-transparent'
                          }`}
                        onClick={() => handleAudioSelect(item)}
                        disabled={item.id > selfAudioId + 1}
                      >

                        {item.id > selfAudioId + 1 ? (
                          <FaLock />
                        ) : playingAudio.id === item.id &&
                          playingAudio.category === item.category ? (
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
              <div>
                <h2>Ego</h2>
                <div>
                  {ego?.map((item) => (
                    <div key={item.id}>
                      <button
                        className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${playingAudio.category === item.category &&
                          item.id === playingAudio.id
                          ? 'bg-blue-500'
                          : 'bg-transparent'
                          }`}
                        onClick={() => handleAudioSelect(item)}
                        disabled={
                          item.id > egoAudioId + 1 || selfAudioId !== 'end'
                        }
                      >

                        {item.id > egoAudioId + 1 || selfAudioId !== "end" ? (
                          <FaLock />
                        ) : playingAudio.id === item.id &&
                          playingAudio.category === item.category ? (
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

            {/* userData?.data.userType */}
            {/* ====================================================  physical ========================================= */}
            <div className={`grid grid-cols-2 gap-10 ${toggleCategory === "emotional" ? "hidden" : "block"} `}>

              {/* body Section */}
              <div>
                <h2>body</h2>
                <div>
                  {body?.map((item) => (
                    <div key={item.id}>
                      <button
                        className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${playingAudio.category === item.category &&
                          item.id === playingAudio.id
                          ? 'bg-blue-500'
                          : 'bg-transparent'
                          }`}
                        onClick={() => handlePhysicalAudioSelect(item)}
                        disabled={item.id > bodyAudioId + 1}
                      >

                        {item.id > bodyAudioId + 1 ? (
                          <FaLock />
                        ) : playingAudio.id === item.id &&
                          playingAudio.category === item.category ? (
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

              {/* miend Section */}
              <div>
                <h2>miend</h2>
                <div>
                  {miend?.map((item) => (
                    <div key={item.id}>
                      <button
                        className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${playingAudio.category === item.category &&
                          item.id === playingAudio.id
                          ? 'bg-blue-500'
                          : 'bg-transparent'
                          }`}
                        onClick={() => handlePhysicalAudioSelect(item)}
                        disabled={
                          item.id > mindAudioId + 1 || bodyAudioId !== 'end'
                        }
                      >

                        {item.id > mindAudioId + 1 || bodyAudioId !== "end" ? (
                          <FaLock />
                        ) : playingAudio.id === item.id &&
                          playingAudio.category === item.category ? (
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
    </div>
  );
};

export default SessionsTest;
