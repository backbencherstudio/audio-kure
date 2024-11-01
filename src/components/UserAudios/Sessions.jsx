/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import sessionImg from '../../assets/images/cure_session.png';
import { FaPlay, FaPause, FaLock } from 'react-icons/fa';
import CustomAudioPlayer from './CustomAudioPlayer';
import data from "../../../public/sessions.json";
import authApi from '../../redux/fetures/auth/authApi';
import { useSelector } from 'react-redux';
import { logOut, selectCurrentUser, useCurrentToken } from '../../redux/fetures/auth/authSlice';
import goldCoin from "./../../assets/goldCoin.png"
import "./Sessions.css"
import ProgressBar from '@ramonak/react-progress-bar';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import gift_big from "./../../assets/images/free_gift_big.png";
import { useNavigate } from 'react-router-dom';

const Sessions = ({ selectedMonth, sessions }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingAudio, setPlayingAudio] = useState({ id: 0, category: "" });
  const [sessionImage, setSessionImage] = useState(sessionImg);
  const [updateData, setUpdatedData] = useState(null)
  const [updateAudioData] = authApi.useUpdateAudioDataMutation();
  const [listeningTime, setListeningTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0);

  const currentUser = useSelector(selectCurrentUser);
  const { data: userData, isLoading } = authApi.useGetSingleUserQuery(currentUser?.email);
  const [logOutUpdate] = authApi.useLogOutUpdateMutation()
  const [toggleCategory, setToggleCategory] = useState("")

  const selfAudioId = userData?.data?.selfId === "end" ? "end" : parseInt(userData?.data?.selfId);
  const egoAudioId = userData?.data?.egoId === "end" ? "end" : parseInt(userData?.data?.egoId);
  const bodyAudioId = userData?.data?.bodyId === "end" ? "end" : parseInt(userData?.data?.bodyId);
  const mindAudioId = userData?.data?.mindId === "end" ? "end" : parseInt(userData?.data?.mindId);

  const self = data?.emotional?.self;
  const ego = data?.emotional?.ego;
  const body = data?.physical?.body;
  const miend = data?.physical?.mind;




  const array1 = userData?.data?.selectedBodyAudios
  const array2 = userData?.data?.selectedMindAudios
  const array3 = userData?.data?.selectedEgoAudios
  const array4 = userData?.data?.selectedSelfAudios
  const [warningShown, setWarningShown] = useState(false);

  const plan = userData?.data?.plan

  const progressBarCounter = parseInt(plan);
  const barCounter = progressBarCounter === 7 ? 2 : progressBarCounter === 30 ? 15 : self?.length + ego?.length + body?.length + miend?.length


  if (isLoading) {
    return <p>Loading ...</p>
  }
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  const expiresDate = new Date(userData?.data?.expiresDate);
  const currentData = new Date();

  useEffect(() => {
    setToggleCategory(userData?.data?.userType)
  }, [userData?.data])


  const logOutFun = async () => {
    await logOutUpdate(currentUser?.email)
  }

  useEffect(() => {
    if (token && currentData >= expiresDate) {
      logOutFun()
      dispatch(logOut());
    }
  }, [])

  useEffect(() => {
    const performUpdate = async () => {
      const res = await updateAudioData(updateData);
      if (res.data.success) {
        toast.success("You achieved 100 coins");
      }
    };

    if (listeningTime !== audioDuration && !warningShown) {
      toast.warning("To earn the full 100 coins, please listen to the entire audio without skipping ");
      setWarningShown(true);
    }

    if (listeningTime === audioDuration) {
      performUpdate();
      setWarningShown(false);
    }
  }, [listeningTime, audioDuration]);


  const [hiddedButton, setHiddenButton] = useState(true)
  const isHide = (array1?.length > 0 && array2?.length > 0) || (array3?.length > 0 && array4?.length > 0)

  useEffect(() => {
    setHiddenButton(isHide)
  }, [isHide])


  const count = (selfAudioId === "end" ? self?.length : selfAudioId) + (egoAudioId === "end" ? ego?.length : egoAudioId) + (bodyAudioId === "end" ? body?.length : bodyAudioId) + (mindAudioId === "end" ? miend?.length : mindAudioId)
  const counterValue = count * 100;
  // const maxValue = self?.length + ego?.length + body?.length + miend?.length
  const currentSession = sessions.find((session) => session?.id === selectedMonth);

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
      setUpdatedData(audioData)
    }
  };

  const handleAudioEnd = () => {
    setCurrentAudio(null);
    setPlayingAudio({ id: null, category: null });
  };

  const [selectedBodyItem, setSelectedBodyItem] = useState([]);
  const [selectedMindItem, setSelectedMindItem] = useState([]);
  const [selectedSelfItems, setSelectedSelfAudios] = useState([]);
  const [selectedEgoItems, setSelectedEgoAudios] = useState([]);

  const totalBodyMindSelections = selectedBodyItem.length + selectedMindItem.length;
  const totalSelfEgoSelections = selectedSelfItems.length + selectedEgoItems.length;

  const AudioSelectHandler = (item) => {

    if (parseInt(plan) === 7 && (totalBodyMindSelections >= 2 || totalSelfEgoSelections >= 2)) {
      toast.error("You Can Select Maximum 2 Content");
      return
    }
    if (parseInt(plan) === 30 && (totalBodyMindSelections >= 15 || totalSelfEgoSelections >= 15)) {
      toast.error("You Can Select Maximum 15 Content");
      return
    }
    if (item.category === 'body') {
      setSelectedBodyItem((prev) =>
        prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]
      );
    } else if (item.category === "mind") {
      setSelectedMindItem((prev) =>
        prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]
      );
    }
    else if (item.category === "ego") {
      setSelectedEgoAudios((prev) =>
        prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]
      );
    }
    else if (item.category === "self") {
      setSelectedSelfAudios((prev) =>
        prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]
      );
    }
  };


  const finalSelectionFunction = async () => {
    const selectedAudios = {
      email: currentUser?.email,
      selectedBodyAudios: selectedBodyItem,
      selectedMindAudios: selectedMindItem,
      selectedSelfAudios: selectedSelfItems,
      selectedEgoAudios: selectedEgoItems
    }
    const res = await updateAudioData(selectedAudios);
    if (res?.data?.success) {
      toast.success("Audio Selected Successfully")
    }
  }

  const navigation = useNavigate()

  const valutFunction = (coin, label) => {
    const levels = { one: 1000, two: 3000, three: 8000, four: 13000, five: 20000 };
    if (levels[label] !== undefined) {
      if (coin < levels[label]) {
        toast.warning(
          `To unlock this gift, you need at least ${levels[label].toLocaleString()} coins. Keep up the dedication and reach your goal!`,
          {
            style: { width: "450px" },
            position: "top-center",
          }
        );
      } else {
        navigation("/vault");
      }
    } else {
      console.error("Invalid label provided.");
    }
  };

  return (
    <div className="session-main-dev border-t mt-5 border-[#2f2861] ">
      <div className="session-second-child max-w-7xl mx-4 md:mx-auto my-8 md:px-4 lg:px-0 ">

        <div className="heading-div text-3xl  font-semibold my-8">
          {
            parseInt(plan) === 365 &&
            <p className='text-xl md:text-3xl' >
              Your  cure session for Month {selectedMonth}
            </p>
          }

          {count ?
            <div className='inline-block'>
              <div className='flex justify-between'>

                <div>
                  <span className=' inline-block text-xl md:text-3xl ' > & You achieve
                  </span>

                  <span className='animation-text md:text-[44px] font-extrabold' >{counterValue}</span>
                  <span className='animation-text md:text-[44px] font-extrabold'>
                    <img className='size-8 inline-block -mr-[5px]' src={goldCoin} alt="" /> coins
                  </span>
                </div>

                {
                  parseInt(plan) === 365 &&

                  <div className='inline-block flex '>

                    <button onClick={() => { valutFunction(counterValue, "one") }} className={`md:ml-4 ${counterValue >= 1000 ? "" : "opacity-50 "}`} >
                      <img
                        src={gift_big}
                        alt="gift-image"
                        className={`size-10`}
                      />
                    </button>

                    <button onClick={() => { valutFunction(counterValue, "two") }} className={`ml-2 ${counterValue >= 3000 ? "" : "opacity-50 "}`} >
                      <img
                        src={gift_big}
                        alt="gift-image"
                        className={`size-10`}
                      />
                    </button>

                    <button onClick={() => { valutFunction(counterValue, "three") }} className={`ml-2 ${counterValue >= 8000 ? "" : "opacity-50 "}`} >
                      <img
                        src={gift_big}
                        alt="gift-image"
                        className={`size-10 `}
                      />
                    </button>

                    <button onClick={() => { valutFunction(counterValue, "four") }} className={`ml-2 ${counterValue >= 13000 ? "" : "opacity-50 "}`} >
                      <img
                        src={gift_big}
                        alt="gift-image"
                        className={`size-10 `}
                      />
                    </button>

                    <button onClick={() => { valutFunction(counterValue, "five") }} className={`ml-2 ${counterValue >= 20000 ? "" : "opacity-50 "}`} >
                      <img
                        src={gift_big}
                        alt="gift-image"
                        className={`size-10 `}
                      />
                    </button>
                  </div>
                }
              </div>
              {
                parseInt(plan) !== 365 &&
                <span className='text-xs ml-2 font-bold '>You can use this coin when you perces Anual Plan </span>
              }
            </div> : ""}

          {
            count >= 1 && (
              <ProgressBar
                className="mt-2"
                completed={(count / barCounter) * 100}
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



        <div className="grid xl:grid-cols-2 gap-8 my-4">

          <div className="flex flex-col gap-4 md:w-[70%] xl:w-[100%] mx-auto ">

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
                      setListeningTime={setListeningTime}
                      listeningTime={listeningTime}
                      setAudioDuration={setAudioDuration}
                    />
                  ) : (
                    <div
                      className="flex gap-2 items-center bg-slate-400 p-2 rounded-3xl justify-center w-full"
                    >
                      Play The Audios
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          <div>

            <div className='mb-5' >

              {parseInt(userData?.data?.plan) === 365 ?
                <div className='grid grid-cols-2 gap-10' >
                  <button onClick={() => { setToggleCategory("emotional") }} className={` ${toggleCategory === "emotional" ? "text-white" : "text-black"} AudioPlayButton text-center rounded-md w-full  font-bold text-[20px]`}>Emotion</button>
                  <button onClick={() => { setToggleCategory("physical") }} className={` ${toggleCategory === "emotional" ? "text-black" : "text-white"} AudioPlayButton text-center rounded-md w-full  font-bold text-[20px]`}>Physical</button>
                </div>
                :
                <div>
                  <div className={`AudioPlayButton text-center rounded-md w-full ${toggleCategory === "emotional" ? "text-white block " : "text-black hidden"} font-bold text-[20px]`}>Emotion</div>
                  <div className={`AudioPlayButton text-center rounded-md w-full ${toggleCategory === "emotional" ? "text-black hidden" : "text-white block"} font-bold text-[20px]`}>Physical</div>
                </div>
              }
              {
                parseInt(userData?.data?.plan) !== 365 && <div>
                  {hiddedButton !== true && (
                    <div>
                      {((selectedMindItem?.length > 0 && selectedBodyItem?.length > 0) ||
                        (selectedEgoItems?.length > 0 && selectedSelfItems?.length > 0))
                        ? (
                          <button
                            onClick={() => finalSelectionFunction()}
                            className="AudioPlayButton text-center rounded-md w-full mt-5"
                          >
                            Set Your Selected Audio
                          </button>
                        ) : (
                          <h2 className="AudioPlayButton text-center rounded-md w-full mt-5">
                            At First Select Your Audio
                          </h2>
                        )}
                    </div>
                  )}
                </div>
              }
            </div>


            {/* ====================================================  emotional ========================================= */}
            <div className={`grid grid-cols-2 gap-10 ${toggleCategory === "emotional" ? "block" : "hidden"} `}>

              {/* Self Section */}
              <div>
                <h2 className='font-semibold mb-1 ' >Self ...</h2>

                <div>

                  {(userData?.data?.selectedSelfAudios?.length === 0 && parseInt(userData?.data?.plan) !== 365) && self?.map((item) => (
                    <div key={item.id} className="mb-2">
                      <button
                        className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${selectedSelfItems?.includes(item.id) ? 'bg-blue-500' : 'bg-transparent'
                          }`}
                        onClick={() => AudioSelectHandler(item)}
                      >
                        <FaLock />
                        {item.name}
                      </button>
                    </div>
                  ))}

                  {(parseInt(userData?.data?.plan) === 365 ? self : self.filter(item => userData?.data?.selectedSelfAudios?.includes(item.id)))
                    .map((item) => {
                      return (
                        <div key={item.id} className="mb-2">
                          <button
                            className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${playingAudio.category === item.category && item.id === playingAudio.id
                              ? 'bg-blue-500'
                              : 'bg-transparent'
                              }`}
                            onClick={() => handlePhysicalAudioSelect(item)}
                          >
                            {playingAudio.id === item.id && playingAudio.category === item.category ? (
                              <div className="bg-green-500 size-8 flex justify-center items-center rounded-full">
                                <FaPause />
                              </div>
                            ) : (
                              <div className="bg-sky-500 size-8 flex justify-center items-center rounded-full">
                                <FaPlay />
                              </div>
                            )}

                            <span className='block md:hidden '>{item.name.length > 10 ? `${item.name.slice(0, 10)} ...` : item.name}</span>
                            <span className='hidden md:block' >{item.name}</span>
                          </button>
                        </div>
                      );
                    })}

                </div>

              </div>

              {/* Ego Section */}
              <div>
                <h2 className='font-semibold mb-1 '>Ego ...</h2>
                <div>

                  {(userData?.data?.selectedEgoAudios?.length === 0 && parseInt(userData?.data?.plan) !== 365) && ego?.map((item) => (
                    <div key={item.id} className="mb-2">
                      <button
                        className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${selectedEgoItems?.includes(item.id) ? 'bg-blue-500' : 'bg-transparent'
                          }`}
                        onClick={() => AudioSelectHandler(item)}
                      >
                        <FaLock />
                        {item.name}
                      </button>
                    </div>
                  ))}


                  {(parseInt(userData?.data?.plan) === 365 ? ego : ego.filter(item => userData?.data?.selectedEgoAudios?.includes(item.id)))
                    .map((item) => {
                      return (
                        <div key={item.id} className="mb-2">
                          <button
                            className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${playingAudio.category === item.category && item.id === playingAudio.id
                              ? 'bg-blue-500'
                              : 'bg-transparent'
                              }`}
                            onClick={() => handlePhysicalAudioSelect(item)}
                          >
                            {playingAudio.id === item.id && playingAudio.category === item.category ? (
                              <div className="bg-green-500 size-8 flex justify-center items-center rounded-full">
                                <FaPause />
                              </div>
                            ) : (
                              <div className="bg-sky-500 size-8 flex justify-center items-center rounded-full">
                                <FaPlay />
                              </div>
                            )}

                            <span className='block md:hidden '>{item.name.length > 10 ? `${item.name.slice(0, 10)} ...` : item.name}</span>
                            <span className='hidden md:block' >{item.name}</span>
                          </button>
                        </div>
                      );
                    })}


                </div>
              </div>

            </div>

            {/* ====================================================  physical ========================================= */}
            <div className={`grid grid-cols-2 gap-2 md:gap-10 ${toggleCategory === "emotional" ? "hidden" : "block"} `}>
              {/* <div className={`grid grid-cols-2 gap-10 `}> */}

              {/* body Section */}
              <div>
                <h2 className='font-semibold mb-1 '>Body ...</h2>
                <div>

                  {/* ================================= selected audio ================================= */}
                  {(userData?.data?.selectedBodyAudios?.length === 0 && parseInt(userData?.data?.plan) !== 365) && body?.map((item) => (
                    <div key={item.id} className="mb-2">
                      <button
                        className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${selectedBodyItem?.includes(item.id) ? 'bg-blue-500' : 'bg-transparent'
                          }`}
                        onClick={() => AudioSelectHandler(item)}
                      >
                        <FaLock />
                        {item.name}
                      </button>
                    </div>
                  ))}

                  {/* ================================= Main Body audio ================================= */}


                  {(parseInt(userData?.data?.plan) === 365 ? body : body.filter(item => userData?.data?.selectedBodyAudios?.includes(item.id)))
                    .map((item) => {
                      return (
                        <div key={item.id} className="mb-2">
                          <button
                            className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${playingAudio.category === item.category && item.id === playingAudio.id
                              ? 'bg-blue-500'
                              : 'bg-transparent'
                              }`}
                            onClick={() => handlePhysicalAudioSelect(item)}
                          >
                            {playingAudio.id === item.id && playingAudio.category === item.category ? (
                              <div className="bg-green-500 size-8 flex justify-center items-center rounded-full">
                                <FaPause />
                              </div>
                            ) : (
                              <div className="bg-sky-500 size-8 flex justify-center items-center rounded-full">
                                <FaPlay />
                              </div>
                            )}
                            <span className='block md:hidden '>{item.name.length > 10 ? `${item.name.slice(0, 10)} ...` : item.name}</span>
                            <span className='hidden md:block' >{item.name}</span>
                          </button>
                        </div>
                      );
                    })}



                </div>

              </div>

              {/* miend Section */}
              <div>

                <h2 className='font-semibold mb-1 '>Mind ...</h2>
                <div>

                  {/* ================================= selected audio ================================= */}
                  {(userData?.data?.selectedMindAudios?.length === 0 && parseInt(userData?.data?.plan) !== 365) && miend?.map((item) => (
                    <div key={item.id} className="mb-2">
                      <button
                        className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${selectedMindItem?.includes(item.id) ? 'bg-blue-500' : 'bg-transparent'
                          }`}
                        onClick={() => AudioSelectHandler(item)}
                      >
                        <FaLock />
                        {item.name}
                      </button>
                    </div>
                  ))}

                  {/* ================================= Main Mind audio ================================= */}

                  {(parseInt(userData?.data?.plan) === 365 ? miend : miend.filter(item => userData?.data?.selectedMindAudios?.includes(item.id)))
                    .map((item) => {
                      return (
                        <div key={item.id} className="mb-2">
                          <button
                            className={`w-full flex gap-2 items-center p-2 border border-gray-300 rounded ${playingAudio.category === item.category && item.id === playingAudio.id
                              ? 'bg-blue-500'
                              : 'bg-transparent'
                              }`}
                            onClick={() => handlePhysicalAudioSelect(item)}
                          >
                            {playingAudio.id === item.id && playingAudio.category === item.category ? (
                              <div className="bg-green-500 size-8 flex justify-center items-center rounded-full">
                                <FaPause />
                              </div>
                            ) : (
                              <div className="bg-sky-500 size-8 flex justify-center items-center rounded-full">
                                <FaPlay />
                              </div>
                            )}

                            <span className='block md:hidden '>{item.name.length > 10 ? `${item.name.slice(0, 10)} ...` : item.name}</span>
                            <span className='hidden md:block' >{item.name}</span>

                          </button>
                        </div>
                      );
                    })}
                </div>

              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Sessions;