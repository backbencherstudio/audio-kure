/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import authApi from "../../redux/fetures/auth/authApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import "./Sessions.css";
import { useLocation, useNavigate } from "react-router-dom";
import NewAudioPlayer from "./NewAudioPlayer";
import { toast } from "react-toastify";
import ProgressBar from "@ramonak/react-progress-bar";
import { FaLock } from "react-icons/fa";
import play from "./../../assets/play.gif"
import push from "./../../assets/play.png"
import goldCoin from "./../../assets/goldCoin.png"
import treasure from './../../assets/treasure.png'
import treasureOpen from './../../assets/treasure-open.png'

const Sessions = () => {
  const [purchasePlan] = authApi.usePurchasePlanMutation();
  const currentUser = useSelector(selectCurrentUser);
  const { data: userData, isLoading: userDataLoading } = authApi.useGetSingleUserQuery(currentUser?.email);
  const [userDelete] = authApi.useUserDeleteMutation()
  const [subscribeData, setSubscribeData] = useState(null);
  const [usbDataLoading, setUsbDataLoading] = useState(null);
  const [showCategoryStatus, setShowCategoryStatus] = useState("withMusic");
  const { data: audioUrls, isLoading: audioDataLoading } = authApi.useAllAudioPathsQuery({ showCategoryStatus, email: currentUser?.email });
  const [updateAudioData] = authApi.useUpdateAudioDataMutation();
  const [setSelectedAudios] = authApi.useSetSelectedAudiosMutation();
  const [playerId, setPlayerId] = useState("")

  const [totalDuration, setTotalDuration] = useState(0);
  const [listeningTime, setListeningTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [selectedBodyId, setSelectedBodyId] = useState([]);
  const [selectedMindId, setSelectedMindId] = useState([]);
  const [selectedSelfId, setSelectedSelfId] = useState([]);
  const [selectedEgoId, setSelectedEgoId] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const sessionId = new URLSearchParams(location.search).get("session_id") || userData?.data?.sessionId;

  const body = audioUrls?.body;
  const mind = audioUrls?.mind;
  const self = audioUrls?.self;
  const ego = audioUrls?.ego;

  const selectedBodyitem = audioUrls?.selectedBodyitem;
  const selectedMinditem = audioUrls?.selectedMinditem;
  const selectedEgoitem = audioUrls?.selectedEgoitem;
  const selectedselfitem = audioUrls?.selectedselfitem;

  const plan = subscribeData?.plan;
  const planNumber = parseInt(plan);

  const count = parseInt(userData?.data.selfId)
  const counterValue = count * 100;
  const ProgressBarCount = (planNumber === 350 ? audioUrls?.result?.length : userData?.data.selectedBodyAudios.length)

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

  useEffect(() => {
    if (parseInt(totalDuration) > 0 && parseInt(totalDuration) === parseInt(listeningTime)) {

      const updateCoin = async () => {
        const audioData = {
          email: currentUser?.email,
        };
        const res = await updateAudioData(audioData)

        if (res?.data?.success) {
          setTotalDuration(0)
          setListeningTime(0)
          toast.success("Congratulations! You've earned 100 coins!");
        };
      }
      updateCoin()
    }
  }, [listeningTime])

  useEffect(() => {
    if (sessionId) {
      fetch(`https://admin.hypno4u.com/success?session_id=${sessionId}`)
        .then((response) => response.json())
        .then((data) => setSubscribeData(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [sessionId]);

  useEffect(() => {
    const fetchPurchasePlan = async () => {
      if (subscribeData?.subscription_email === currentUser?.email) {
        try {
          const purchasePlanData = {
            sessionId,
            email: subscribeData.subscription_email,
          };
          const res = await purchasePlan(purchasePlanData);
          setUsbDataLoading(res);
        } catch (error) {
          console.error("Error fetching purchase plan:", error);
        }
      }
    };

    if (subscribeData) fetchPurchasePlan();
  }, [subscribeData, currentUser?.email, sessionId, purchasePlan]);
  

  useEffect(() => {
    const deleteFun = async () => {
      if (
        (subscribeData && subscribeData?.status !== "active") ||
        (subscribeData && currentUser?.email !== subscribeData?.subscription_email)||
        (subscribeData === null )   //========================================================== notun  update kota hoyeche
      ) {        
        await navigate("/subscriptionplan");   //==========================================================  notun  update kota hoyeche
        const res = await userDelete(currentUser?.email)
        if (res?.data?.success) {
          navigate("/subscriptionplan");
        }
      }
    }
    deleteFun()

  }, [usbDataLoading, subscribeData, currentUser?.email, navigate]);

  const categoryStatusChangeFun = (musicStatus) => {
    if (selectedMindId.length >= 1 || selectedBodyId.length >= 1 || selectedEgoId.length >= 1 || selectedSelfId.length >= 1) {
      return toast.warning("You are currently unable to change your category.");
    }
    setShowCategoryStatus(musicStatus)
  }

  const allId = selectedBodyId + "," + selectedMindId + "," + selectedSelfId + "," + selectedEgoId;
  const idArray = allId.split(",").filter((id) => id.trim() !== "");

  const toggleBodyId = (id) => {
    if (planNumber === 25 && idArray.length === 2) {
      return toast.warning("you cant selecte more then 2")
    }
    if (planNumber === 45 && idArray.length === 15) {
      return toast.warning("you cant selecte more then 15")
    }
    setSelectedBodyId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleMindId = (id) => {
    if (planNumber === 25 && idArray.length === 2) {
      return toast.warning("you cant selecte more then 2")
    }
    if (planNumber === 45 && idArray.length === 15) {
      return toast.warning("you cant selecte more then 15")
    }
    setSelectedMindId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleSelfId = (id) => {
    if (planNumber === 25 && idArray.length === 2) {
      return toast.warning("you cant selecte more then 2")
    }
    if (planNumber === 45 && idArray.length === 15) {
      return toast.warning("you cant selecte more then 15")
    }
    setSelectedSelfId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleEgoId = (id) => {
    if (planNumber === 25 && idArray.length === 2) {
      return toast.warning("you cant selecte more then 2")
    }
    if (planNumber === 45 && idArray.length === 15) {
      return toast.warning("you cant selecte more then 15")
    }
    setSelectedEgoId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const allSelectedIdGetFun = async () => {
    if ((selectedBodyId.length === 0 || selectedMindId.length === 0) && (selectedSelfId.length === 0 || selectedEgoId.length === 0)) {
      return toast.warning("Please select an audio file for both categories before proceeding.", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { width: "400px" }
      })
    }
    const data = {
      email: currentUser?.email,
      idArray
    }
    const res = await setSelectedAudios({ data });
    if (res?.data?.success) {
      toast.success("Selected Your Audio Successfully")
    }
  };

  if (userDataLoading || audioDataLoading) {
    return <div className="w-full h-[76vh] flex justify-center items-center " >
      <p className="text-center text-2xl " >Loading Data...</p>
    </div>;
  }


  return (
    <div className="session-main-dev border-t mt-5 border-[#2f2861]">

      <div className="session-second-child max-w-7xl mx-4 md:mx-auto my-8 md:px-4 lg:px-0">

        <div className="mb-5">

          {
            count === 0 && <p className="text-white text-[18px] font-semibold " > If you listen to all the audio tracks sequentially, from the first to the last, you will earn a reward of 100 coins. </p>}

          {
            count > 0 &&
            <div className="" >

              <div className="flex items-center flex-wrap justify-between">

                <div className="flex items-center">
                  You Achieve
                  <span className='animation-text text-[30px] md:text-[44px] font-extrabold mx-2' >{counterValue}</span>
                  <img className='size-8 inline-block -mr-[5px]' src={goldCoin} alt="" />
                  <span className='animation-text text-[30px] md:text-[44px] font-extrabold mx-2 ml-3' >Coins</span>
                </div>

                <div className='flex mb-4 '>
                  <button onClick={() => { valutFunction(counterValue, "one") }} className={`md:ml-4 ${counterValue >= 1000 ? "" : "opacity-50 "}`} >
                    {
                      counterValue >= 1000 ? <img
                        src={treasureOpen}
                        alt="gift-image"
                        className={`size-20`}
                      /> : <img
                        src={treasure}
                        alt="gift-image"
                        className={`size-16`}
                      />
                    }
                  </button>

                  <button onClick={() => { valutFunction(counterValue, "two") }} className={`ml-2 ${counterValue >= 3000 ? "" : "opacity-50 "}`} >
                    {
                      counterValue >= 3000 ? <img
                        src={treasureOpen}
                        alt="gift-image"
                        className={`size-20`}
                      /> : <img
                        src={treasure}
                        alt="gift-image"
                        className={`size-16`}
                      />
                    }
                  </button>

                  <button onClick={() => { valutFunction(counterValue, "three") }} className={`ml-2 ${counterValue >= 8000 ? "" : "opacity-50 "}`} >
                    {
                      counterValue >= 8000 ? <img
                        src={treasureOpen}
                        alt="gift-image"
                        className={`size-20`}
                      /> : <img
                        src={treasure}
                        alt="gift-image"
                        className={`size-16`}
                      />
                    }
                  </button>

                  <button onClick={() => { valutFunction(counterValue, "four") }} className={`ml-2 ${counterValue >= 13000 ? "" : "opacity-50 "}`} >
                    {
                      counterValue >= 13000 ? <img
                        src={treasureOpen}
                        alt="gift-image"
                        className={`size-20`}
                      /> : <img
                        src={treasure}
                        alt="gift-image"
                        className={`size-16`}
                      />
                    }
                  </button>

                  <button onClick={() => { valutFunction(counterValue, "five") }} className={`ml-2 ${counterValue >= 20000 ? "" : "opacity-50 "}`} >
                    {
                      counterValue >= 20000 ? <img
                        src={treasureOpen}
                        alt="gift-image"
                        className={`size-20`}
                      /> : <img
                        src={treasure}
                        alt="gift-image"
                        className={`size-16`}
                      />
                    }
                  </button>
                </div>

              </div>

              <ProgressBar
                className="mt-2 lg:mt-0"
                completed={(count / ProgressBarCount) * 100}
                labelColor="transparent"
                labelAlignment="center"
                borderRadius="10px"
                height="8px"
                bgColor="#facc15"
                baseBgColor="#2D2C2C"
              />

            </div>
          }

        </div>


        <div className="grid lg:grid-cols-2 md:gap-10  ">

          <div>
            <div className="lg:w-[100%] mx-auto">
              <div className="" >
                <NewAudioPlayer

                  audioUrl={audioUrl}
                  setTotalDuration={setTotalDuration}
                  setListeningTime={setListeningTime}
                />
              </div>

              <div>
                If You Want To Cancel Your Plan
                <a
                  className="duration-300 ml-1 text-red-500 font-bold hover:text-red-700 rounded-md text-md mt-10 inline-block"
                  href={`https://admin.hypno4u.com/customers/${subscribeData?.customer_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click Here
                </a>
              </div>
              <div>

                If You Want To Change Your Plan

                <button
                  onClick={() => navigate("/subscriptionplan?section=subscription")}
                  className="text-green-900 hover:text-green-700 duration-300 font-semibold px-2 py-2 rounded-md text-md mt-5 inline-block"
                >
                  Click Here
                </button>

              </div>

            </div>
          </div>

          <div>
            <div className=" p-5 rounded-lg min-h-[300px] h-[600px] overflow-y-scroll custom-scroll bg-white/20">

              <div className="" >
                <h2 className="bg-zinc-900 text-center py-2 rounded-lg text-xl capitalize">{userData?.data?.userType}</h2>

                {
                  selectedBodyitem?.length > 0 ||
                    selectedMinditem?.length > 0 ||
                    selectedEgoitem?.length > 0 ||
                    selectedselfitem?.length > 0 ? "" :

                    <div className="grid grid-cols-2 gap-10 mt-5">
                      <button
                        disabled={showCategoryStatus === "withMusic"}
                        className={`w-full border rounded-lg px-4 py-2 mr-4 text-sm md:text-base font-semibold duration-300 capitalize ${showCategoryStatus === "withMusic" ? "bg-rose-900 text-white" : ""
                          }`}
                        onClick={() => categoryStatusChangeFun("withMusic")}
                      >
                        {
                          audioDataLoading ? "L.." :
                            "with music"
                        }
                      </button>
                      <button
                        disabled={showCategoryStatus === "withOutMusic"}
                        className={`w-full border rounded-lg px-4 py-2 mr-4 text-sm md:text-base font-semibold duration-300 capitalize ${showCategoryStatus !== "withMusic" ? "bg-zinc-500 text-white" : ""
                          }`}
                        onClick={() => categoryStatusChangeFun("withOutMusic")}
                      >
                        {
                          audioDataLoading ? "L.." :
                            "with out music"
                        }
                      </button>
                    </div>
                }

                <div>
                  {
                    selectedBodyitem?.length > 0 ||
                      selectedMinditem?.length > 0 ||
                      selectedEgoitem?.length > 0 ||
                      selectedselfitem?.length > 0 ||
                      planNumber === 350
                      ? "" :
                      <button onClick={() => allSelectedIdGetFun()} className="bg-red-500 w-full mt-4 rounded-md py-2 " >Added  Your selected Audio Maximum
                        <span className="w-[10px] inline-block ml-1" >{idArray?.length}/{planNumber === 25 ? 2 : 15}</span>
                      </button>
                  }
                </div>

              </div>

              {audioUrls?.result?.length > 0 ? (
                <div>

                  {/* =======================================     physical  ================================= */}

                  {userData?.data?.userType === "physical" && (

                    <div className="grid grid-cols-2 mt-3 gap-10">
                      <div>
                        <h2 className="text-xl font-bold text-center">Body</h2>

                        <div>
                          {
                            planNumber === 350 ? <div>
                              {
                                body?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>
                                    <button
                                      className='border border-zinc-500 w-full py-2 rounded-lg font-semibold flex justify-between items-center px-[4px] md:px-2  '
                                      onClick={() => setAudioUrl(item.audio)}
                                      onMouseUp={() => setPlayerId(item._id)}
                                    >
                                      {
                                        playerId === item._id ?
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 mix-blend-color-burn  " src={play} alt="" />
                                          :
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 " src={push} alt="" />
                                      }
                                      <h2 className="text-left w-full text-[14px] md:text-[16px]" >
                                        {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                      </h2>
                                    </button>
                                  </div>
                                ))
                              }
                            </div> : <div>
                              {!selectedBodyitem && body?.map((item, index) => (
                                <div
                                  key={item._id || index}
                                  className={`mt-4 rounded ${selectedBodyId.includes(item._id) ? "bg-blue-300" : "bg-white"
                                    }`}
                                >

                                  <button
                                    onClick={() => toggleBodyId(item._id)}
                                    className="w-full text-left text-black p-2 flex items-center"
                                  >
                                    <FaLock className="mr-4" />
                                    {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                  </button>

                                </div>
                              ))}

                              {selectedBodyitem?.length > 0 &&
                                selectedBodyitem?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>

                                    <button
                                      className='border border-zinc-600 w-full py-2 rounded-lg font-semibold flex justify-between items-center px-[4px] md:px-2  '
                                      onClick={() => setAudioUrl(item.audio)}
                                      onMouseUp={() => setPlayerId(item._id)}
                                    >
                                      {
                                        playerId === item._id ?
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 mix-blend-color-burn  " src={play} alt="" />
                                          :
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 " src={push} alt="" />
                                      }
                                      <h2 className="text-left w-full text-[14px] md:text-[16px]" >
                                        {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                      </h2>
                                    </button>

                                  </div>
                                ))
                              }
                            </div>

                          }
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-center">Mind</h2>

                        <div>
                          {
                            planNumber === 350 ? <div>
                              {
                                mind?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>
                                    <button
                                      className='border border-zinc-500 w-full py-2 rounded-lg font-semibold flex justify-between items-center px-[4px] md:px-2  '
                                      onClick={() => setAudioUrl(item.audio)}
                                      onMouseUp={() => setPlayerId(item._id)}
                                    >
                                      {
                                        playerId === item._id ?
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 mix-blend-color-burn  " src={play} alt="" />
                                          :
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 " src={push} alt="" />
                                      }
                                      <h2 className="text-left w-full text-[14px] md:text-[16px]" >
                                        {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                      </h2>
                                    </button>
                                  </div>
                                ))
                              }
                            </div> :
                              <div>
                                {!selectedMinditem && mind?.map((item, index) => (
                                  <div
                                    key={item._id || index}
                                    className={`mt-4 rounded ${selectedMindId.includes(item._id) ? "bg-blue-300" : "bg-white"
                                      }`}
                                  >
                                    <button
                                      onClick={() => toggleMindId(item._id)}
                                      className="w-full text-left text-black p-2 flex items-center"
                                    >
                                      <FaLock className="mr-4" />
                                      {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                    </button>
                                  </div>
                                ))}

                                {selectedMinditem?.length > 0 &&
                                  selectedMinditem?.map((item, index) => (
                                    <div className='mt-4' key={item._id || index}>
                                      <button
                                        className='border border-zinc-500 w-full py-2 rounded-lg font-semibold flex justify-between items-center px-[4px] md:px-2  '
                                        onClick={() => setAudioUrl(item.audio)}
                                        onMouseUp={() => setPlayerId(item._id)}
                                      >
                                        {
                                          playerId === item._id ?
                                            <img className="size-[30px] md:size-[30px] rounded-full mr-2 mix-blend-color-burn  " src={play} alt="" />
                                            :
                                            <img className="size-[30px] md:size-[30px] rounded-full mr-2 " src={push} alt="" />
                                        }
                                        <h2 className="text-left w-full text-[14px] md:text-[16px]" >
                                          {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                        </h2>
                                      </button>
                                    </div>
                                  ))
                                }
                              </div>
                          }
                        </div>

                      </div>
                    </div>
                  )}

                  {/* =======================================     emotional  ================================= */}

                  {userData?.data?.userType === "emotional" && (
                    <div className="grid grid-cols-2 mt-3 gap-10">
                      <div>
                        <h2 className="text-xl font-bold text-center">Self</h2>

                        <div>
                          {
                            planNumber === 350 ? <div>
                              {
                                self?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>

                                    <button
                                      className='border border-blue-600 w-full py-2 rounded-lg font-semibold flex justify-between items-center px-[4px] md:px-2  '
                                      onClick={() => setAudioUrl(item.audio)}
                                      onMouseUp={() => setPlayerId(item._id)}
                                    >
                                      {
                                        playerId === item._id ?
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 mix-blend-color-burn  " src={play} alt="" />
                                          :
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 " src={push} alt="" />
                                      }
                                      <h2 className="text-left w-full text-[14px] md:text-[16px]" >
                                        {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                      </h2>
                                    </button>

                                  </div>
                                ))
                              }
                            </div> :
                              <div>
                                {!selectedselfitem && self?.map((item, index) => (
                                  <div
                                    key={item._id || index}
                                    className={`mt-4  rounded ${selectedSelfId.includes(item._id) ? "bg-blue-300" : "bg-white"
                                      }`}
                                  >
                                    <button
                                      onClick={() => toggleSelfId(item._id)}
                                      className="w-full text-left text-black p-2 flex items-center"
                                    >
                                      <FaLock className="mr-4" />
                                      {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                    </button>
                                  </div>
                                ))}

                                {selectedselfitem?.length > 0 &&
                                  selectedselfitem?.map((item, index) => (
                                    <div className='mt-4' key={item._id || index}>
                                      <button
                                        className='border border-blue-600 w-full py-2 rounded-lg font-semibold flex justify-between items-center px-[4px] md:px-2  '
                                        onClick={() => setAudioUrl(item.audio)}
                                        onMouseUp={() => setPlayerId(item._id)}
                                      >
                                        {
                                          playerId === item._id ?
                                            <img className="size-[30px] md:size-[30px] rounded-full mr-2 mix-blend-color-burn  " src={play} alt="" />
                                            :
                                            <img className="size-[30px] md:size-[30px] rounded-full mr-2 " src={push} alt="" />
                                        }
                                        <h2 className="text-left w-full text-[14px] md:text-[16px]" >
                                          {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                        </h2>
                                      </button>
                                    </div>
                                  ))
                                }
                              </div>
                          }
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-center">Ego</h2>

                        <div>
                          {
                            planNumber === 350 ? <div>
                              {
                                ego?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>
                                    <button
                                      className='border border-blue-600 w-full py-2 rounded-lg font-semibold flex justify-between items-center px-[4px] md:px-2  '
                                      onClick={() => setAudioUrl(item.audio)}
                                      onMouseUp={() => setPlayerId(item._id)}
                                    >
                                      {
                                        playerId === item._id ?
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 mix-blend-color-burn  " src={play} alt="" />
                                          :
                                          <img className="size-[30px] md:size-[30px] rounded-full mr-2 " src={push} alt="" />
                                      }
                                      <h2 className="text-left w-full text-[14px] md:text-[16px]" >
                                        {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                      </h2>
                                    </button>
                                  </div>
                                ))
                              }
                            </div> :
                              <div>
                                {!selectedEgoitem && ego?.map((item, index) => (
                                  <div
                                    key={item._id || index}
                                    className={`mt-4  rounded ${selectedEgoId.includes(item._id) ? "bg-blue-300" : "bg-white"
                                      }`}
                                  >
                                    <button
                                      onClick={() => toggleEgoId(item._id)}
                                      className="w-full text-left text-black p-2 flex items-center"
                                    >
                                      <FaLock className="mr-4" />
                                      {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                    </button>
                                  </div>
                                ))}

                                {selectedEgoitem?.length > 0 &&
                                  selectedEgoitem?.map((item, index) => (
                                    <div className='mt-4' key={item._id || index}>
                                      <button
                                        className='border border-blue-600 w-full py-2 rounded-lg font-semibold flex justify-between items-center px-[4px] md:px-2  '
                                        onClick={() => setAudioUrl(item.audio)}
                                        onMouseUp={() => setPlayerId(item._id)}
                                      >
                                        {
                                          playerId === item._id ?
                                            <img className="size-[30px] md:size-[30px] rounded-full mr-2 mix-blend-color-burn  " src={play} alt="" />
                                            :
                                            <img className="size-[30px] md:size-[30px] rounded-full mr-2 " src={push} alt="" />
                                        }
                                        <h2 className="text-left w-full text-[14px] md:text-[16px]" >
                                          {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                        </h2>
                                      </button>
                                    </div>
                                  ))
                                }
                              </div>
                          }
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <p>No audio files available.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
