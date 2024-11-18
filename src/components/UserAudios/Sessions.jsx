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

const Sessions = () => {
  const [purchasePlan] = authApi.usePurchasePlanMutation();

  const currentUser = useSelector(selectCurrentUser);
  const { data: userData, isLoading: userDataLoading } = authApi.useGetSingleUserQuery(currentUser?.email);
  const [userDelete] = authApi.useUserDeleteMutation()
  const [subscribeData, setSubscribeData] = useState(null);
  const [usbDataLoading, setUsbDataLoading] = useState(null);
  const [showCategoryStatus, setShowCategoryStatus] = useState("withMusic");
  const { data: audioUrls, isLoading: audioDataLoading } = authApi.useAllAudioPathsQuery({ showCategoryStatus, email: currentUser?.email });

  const [setSelectedAudios] = authApi.useSetSelectedAudiosMutation()



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


  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:5000/success?session_id=${sessionId}`)
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
        (subscribeData && currentUser?.email !== subscribeData?.subscription_email)
      ) {

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
      return toast.warning("you cant selecte more then 2")
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
      return toast.warning("you cant selecte more then 2")
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
      return toast.warning("you cant selecte more then 2")
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
      return toast.warning("you cant selecte more then 2")
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
      return toast.warning("Please select an audio file for both categories before proceeding.")
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
        <div>
          S Data = {subscribeData?.subscription_email} S = {subscribeData?.status} P = {subscribeData?.plan} C_id ={" "}
          {subscribeData?.customer_id}
          <h2>
            Total Time : {totalDuration} :: Listening Time = {listeningTime}
          </h2>
          {totalDuration === listeningTime && totalDuration > 0 && <p>Done</p>}
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="w-[80%] mx-auto">
              <div>
                <NewAudioPlayer
                  audioUrl={audioUrl}
                  setTotalDuration={setTotalDuration}
                  setListeningTime={setListeningTime}
                />
              </div>

              <div>
                <a
                  className="bg-red-400 hover:bg-red-500 duration-300 px-10 py-2 text-black hover:text-white rounded-md text-md mt-10 inline-block"
                  href={`http://localhost:5000/customers/${subscribeData?.customer_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cancel Plan
                </a>
              </div>
              <div>

                If You Want To Change Your Plan

                <button
                  onClick={() => navigate("/subscriptionplan?section=subscription")}
                  className="text-green-400 duration-300 font-semibold px-2 py-2 rounded-md text-md mt-5 inline-block"
                >
                  Click Here
                </button>

              </div>

            </div>
          </div>

          <div>
            <div className="shadow-2xl p-5 rounded-lg min-h-[300px]">
              <div>
                <h2 className="bg-blue-500 text-center py-2 rounded-full text-xl">{userData?.data?.userType}</h2>

                {
                  selectedBodyitem?.length > 0 ||
                    selectedMinditem?.length > 0 ||
                    selectedEgoitem?.length > 0 ||
                    selectedselfitem?.length > 0 ? "" :

                    <div className="grid grid-cols-2 gap-10 mt-5">
                      <button
                        disabled={showCategoryStatus === "withMusic"}
                        className={`w-full border rounded-full px-4 py-2 mr-4 font-semibold duration-300 ${showCategoryStatus === "withMusic" ? "bg-blue-500 text-black" : ""
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
                        className={`w-full border rounded-full px-4 py-2 mr-4 font-semibold duration-300 ${showCategoryStatus !== "withMusic" ? "bg-blue-500 text-black" : ""
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
                      <button onClick={() => allSelectedIdGetFun()} className="bg-blue-500 w-full mt-4 rounded-full py-2 " >Added  Your selected Audio</button>
                  }
                </div>

              </div>

              {/* =======================================     physical  ================================= */}
              {audioUrls?.result?.length > 0 ? (
                <div>
                  {userData?.data?.userType === "physical" && (

                    <div className="grid grid-cols-2 mt-3 gap-10">
                      <div>
                        <h2>Body</h2>

                        <div>
                          {
                            planNumber === 350 ? <div>
                              {
                                body?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>
                                    <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
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
                                    className="w-full text-left text-black p-2"
                                  >
                                    {item?.name}
                                  </button>
                                </div>
                              ))}

                              {selectedBodyitem?.length > 0 &&
                                selectedBodyitem?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>
                                    <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
                                  </div>
                                ))
                              }
                            </div>

                          }
                        </div>
                      </div>

                      <div>
                        <h2>Mind</h2>

                        <div>
                          {
                            planNumber === 350 ? <div>
                              {
                                mind?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>
                                    <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
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
                                      className="w-full text-left text-black p-2"
                                    >
                                      {item?.name}
                                    </button>
                                  </div>
                                ))}

                                {selectedMinditem?.length > 0 &&
                                  selectedMinditem?.map((item, index) => (
                                    <div className='mt-4' key={item._id || index}>
                                      <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
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
                        <h2>Self</h2>

                        <div>
                          {
                            planNumber === 350 ? <div>
                              {
                                self?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>
                                    <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
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
                                      className="w-full text-left text-black p-2"
                                    >
                                      {item?.name}
                                    </button>
                                  </div>
                                ))}

                                {selectedselfitem?.length > 0 &&
                                  selectedselfitem?.map((item, index) => (
                                    <div className='mt-4' key={item._id || index}>
                                      <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
                                    </div>
                                  ))
                                }
                              </div>
                          }
                        </div>
                      </div>

                      <div>
                        <h2>Ego</h2>

                        <div>
                          {
                            planNumber === 350 ? <div>
                              {
                                ego?.map((item, index) => (
                                  <div className='mt-4' key={item._id || index}>
                                    <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
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
                                      className="w-full text-left text-black p-2"
                                    >
                                      {item?.name}
                                    </button>
                                  </div>
                                ))}

                                {selectedEgoitem?.length > 0 &&
                                  selectedEgoitem?.map((item, index) => (
                                    <div className='mt-4' key={item._id || index}>
                                      <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
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
