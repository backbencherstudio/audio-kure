/* eslint-disable react/prop-types */
import { useState } from 'react';
import sessionImg from '../../assets/images/cure_session.png';
import { FaPlay, FaPause, FaLock } from 'react-icons/fa';
import CustomAudioPlayer from './CustomAudioPlayer';
import data from "../../../public/sessions.json";
import authApi from '../../redux/fetures/auth/authApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import goldCoin from "./../../assets/goldCoin.png"
import "./Sessions.css"
import ProgressBar from '@ramonak/react-progress-bar';

const Sessions = ({ selectedMonth, sessions }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingAudio, setPlayingAudio] = useState({ id: 0, category: "" });
  const [sessionImage, setSessionImage] = useState(sessionImg);
  const [updateAudioData] = authApi.useUpdateAudioDataMutation();

  const currentUser = useSelector(selectCurrentUser);
  const { data: userData } = authApi.useGetSingleUserQuery(currentUser?.email);
  const [toggleCategory, setToggleCategory] = useState(userData?.data?.userType)

  const selfAudioId = userData?.data?.selfId === "end" ? "end" : parseInt(userData?.data?.selfId);
  const egoAudioId = userData?.data?.egoId === "end" ? "end" : parseInt(userData?.data?.egoId);
  const bodyAudioId = userData?.data?.bodyId === "end" ? "end" : parseInt(userData?.data?.bodyId);
  const mindAudioId = userData?.data?.mindId === "end" ? "end" : parseInt(userData?.data?.mindId);

  const self = data?.emotional?.self;
  const ego = data?.emotional?.ego;
  const body = data?.physical?.body;
  const miend = data?.physical?.mind;

  const count = (selfAudioId === "end" ? self.length : selfAudioId) + (egoAudioId === "end" ? ego.length : egoAudioId) + (bodyAudioId === "end" ? body.length : bodyAudioId) + (mindAudioId === "end" ? miend.length : mindAudioId)

  const maxValue = self.length + ego.length + body.length + miend.length


  const currentSession = sessions.find((session) => session.id === selectedMonth);
  const updatedAudioIds = new Set();

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


  const handleAudioEnd = () => {
    setCurrentAudio(null);
    setPlayingAudio({ id: null, category: null });
  };

  return (
    <div className="session-main-dev border-t mt-5 border-[#2f2861]">
      <div className="session-second-child max-w-7xl mx-4 md:mx-auto my-8">

        <div className="heading-div text-3xl font-semibold my-8">
          Your cure session for Month {selectedMonth}
          {count ? 
          <span className='inline-block ml-2'>
            <span className=' inline-block ' >& You achieve
            </span>

            <span className='animation-text text-[44px] font-extrabold mx-2' >{count}</span>
            <span className='animation-text text-[44px] font-extrabold'>
              <img className='size-8 inline-block -mr-[5px]' src={goldCoin} alt="" /> coin{count === 1 ? "" : "s"}
            </span>


          </span> : ""}

          {
            count >= 1 && (
              <ProgressBar
                className="mt-2"
                completed={(count / maxValue) * 100}  
                // completed={(10 / maxValue) * 100}  
                labelColor="transparent"
                labelAlignment="center"
                borderRadius="0px 10px 10px 0px"
                height="8px"
                bgColor="#C4AFFF"
                baseBgColor="#2D2C2C"
              />
            )
          }



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
<<<<<<< HEAD
                      // onClick={() =>
                      //   handleAudioSelect(currentSession.audios[0].category, currentSession.audios[0].subCategory, currentSession.audios[0])
                      // }
=======
                      onClick={() => handleAudioSelect(currentSession.audios[0])}
>>>>>>> c79b035de0b921d2f23f2e623bc3a76c800145e3
                    >
                      <FaPlay /> Play The Audios
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
<<<<<<< HEAD
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
=======

          <div>

            <div className='grid grid-cols-2 gap-10 mb-5' >

              <button onClick={() => { setToggleCategory("emotional") }} className={`AudioPlayButton rounded-md ${toggleCategory === "emotional" ? "text-white " : "text-black"} font-bold text-[20px]`}>Emotion</button>
              <button onClick={() => { setToggleCategory("physical") }} className={`AudioPlayButton rounded-md ${toggleCategory === "emotional" ? "text-black" : "text-white"} font-bold text-[20px]`}>Physical</button>

            </div>

            {/* ====================================================  emotional ========================================= */}
            <div className={`grid grid-cols-2 gap-10 ${toggleCategory === "emotional" ? "block" : "hidden"} `}>

              {/* Self Section */}
              <div>
                <h2 className='font-semibold mb-1 ' >Self ...</h2>
                <div>
                  {self?.map((item) => (
                    <div key={item.id} className='mb-2' >
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
                          <div className='bg-red-500 size-8 flex justify-center items-center rounded-full' >
                            <FaLock />
                          </div>
                        ) : playingAudio.id === item.id &&
                          playingAudio.category === item.category ? (
                          <div className='bg-green-500 size-8 flex justify-center items-center rounded-full'>
                            <FaPause />
                          </div>
                        ) : (
                          <div className='bg-sky-500 size-8 flex justify-center items-center rounded-full'>
                            <FaPlay />
                          </div>
                        )}

                        {item.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ego Section */}
              <div>
                <h2 className='font-semibold mb-1 '>Ego ...</h2>
                <div>
                  {ego?.map((item) => (
                    <div key={item.id} className='mb-2'>
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
                          <div className='bg-red-500 size-8 flex justify-center items-center rounded-full ' >
                            <FaLock />
                          </div>
                        ) : playingAudio.id === item.id &&
                          playingAudio.category === item.category ? (
                          <div className='bg-green-500 size-8 flex justify-center items-center rounded-full'>
                            <FaPause />
                          </div>
                        ) : (
                          <div className='bg-sky-500 size-8 flex justify-center items-center rounded-full'>
                            <FaPlay />
                          </div>
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
                <h2 className='font-semibold mb-1 '>Body ...</h2>
                <div>
                  {body?.map((item) => (
                    <div key={item.id} className='mb-2'>
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
                          <div className='bg-red-500 size-8 flex justify-center items-center rounded-full ' >
                            <FaLock />
                          </div>
                        ) : playingAudio.id === item.id &&
                          playingAudio.category === item.category ? (
                          <div className='bg-green-500 size-8 flex justify-center items-center rounded-full'>
                            <FaPause />
                          </div>
                        ) : (
                          <div className='bg-sky-500 size-8 flex justify-center items-center rounded-full'>
                            <FaPlay />
                          </div>
                        )}

                        {item.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* miend Section */}
              <div>
                <h2 className='font-semibold mb-1 '>Mind ...</h2>
                <div>
                  {miend?.map((item) => (
                    <div key={item.id} className='mb-2'>
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
                          <div className='bg-red-500 size-8 flex justify-center items-center rounded-full ' >
                            <FaLock />
                          </div>
                        ) : playingAudio.id === item.id &&
                          playingAudio.category === item.category ? (
                          <div className='bg-green-500 size-8 flex justify-center items-center rounded-full'>
                            <FaPause />
                          </div>
                        ) : (
                          <div className='bg-sky-500 size-8 flex justify-center items-center rounded-full'>
                            <FaPlay />
                          </div>
                        )}

                        {item.name}

                      </button>

                    </div>
                  ))}
                </div>
              </div>
            </div>




>>>>>>> c79b035de0b921d2f23f2e623bc3a76c800145e3
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sessions;
