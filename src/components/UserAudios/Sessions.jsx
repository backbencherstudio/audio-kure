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

  console.log(selectedBodyitem);
  console.log(selectedMinditem);


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
    if (
      (subscribeData && subscribeData.status !== "active") ||
      (subscribeData && currentUser?.email !== subscribeData.subscription_email)
    ) {
      navigate("/subscriptionplan");
    }
  }, [usbDataLoading, subscribeData, currentUser?.email, navigate]);


  const categoryStatusChangeFun = (musicStatus) => {
    if (selectedMindId.length >= 1 || selectedBodyId.length >= 1 || selectedEgoId.length >= 1 || selectedSelfId.length >= 1) {
      return toast.warning("You are currently unable to change your category.");
    }
    setShowCategoryStatus(musicStatus)
  }


  const toggleBodyId = (id) => {
    setSelectedBodyId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleMindId = (id) => {
    setSelectedMindId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleSelfId = (id) => {
    setSelectedSelfId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleEgoId = (id) => {
    setSelectedEgoId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // const allSelectedIdGetFun = () => {
  //   const allId = selectedBodyId + selectedMindId + selectedSelfId + selectedEgoId
  //   console.log(allId);
  // }

  const allSelectedIdGetFun = async () => {
    const allId = selectedBodyId + "," + selectedMindId + "," + selectedSelfId + "," + selectedEgoId;
    const idArray = allId.split(",").filter((id) => id.trim() !== "");
    const data = {
      email: currentUser?.email,
      idArray
    }
    await setSelectedAudios({ data });
  };



  if (userDataLoading || audioDataLoading) {
    return <p>Loading...</p>;
  }

  const plan = subscribeData?.plan;
  const planNumber = parseInt(plan);

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
                        with music
                      </button>
                      <button
                        disabled={showCategoryStatus === "withOutMusic"}
                        className={`w-full border rounded-full px-4 py-2 mr-4 font-semibold duration-300 ${showCategoryStatus !== "withMusic" ? "bg-blue-500 text-black" : ""
                          }`}
                        onClick={() => categoryStatusChangeFun("withOutMusic")}
                      >
                        without music
                      </button>
                    </div>

                }



                <div>
                  <button onClick={() => allSelectedIdGetFun()} className="bg-blue-500 w-full mt-4 rounded-full py-2 " >Added Your selected Audio</button>
                </div>

              </div>

              {audioUrls?.result?.length > 0 ? (
                <div>
                  {userData?.data?.userType === "physical" && (


                    <div className="grid grid-cols-2 mt-3 gap-10">

                      <div>
                        <h2>Body</h2>

                        {!selectedBodyitem && body?.map((item, index) => (
                          <div
                            key={item._id || index}
                            className={`mt-4 p-2 rounded ${selectedBodyId.includes(item._id) ? "bg-blue-300" : "bg-white"
                              }`}
                          >
                            <button
                              onClick={() => toggleBodyId(item._id)}
                              className="w-full text-left text-black"
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

                      <div>
                        <h2>Mind</h2>


                        {!selectedMinditem && mind?.map((item, index) => (
                          <div
                            key={item._id || index}
                            className={`mt-4 p-2 rounded ${selectedMindId.includes(item._id) ? "bg-blue-300" : "bg-white"
                              }`}
                          >
                            <button
                              onClick={() => toggleMindId(item._id)}
                              className="w-full text-left text-black"
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



                      {/* {selectedBodyitem > 0 &&
                        <div className='grid grid-cols-2 mt-3 gap-10' >
                          <div>
                            <h2>Body</h2>

                            {
                              body?.map((item, index) => (
                                <div className='mt-4' key={item._id || index}>
                                  <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
                                </div>
                              ))
                            }

                          </div>
                          <div>
                            <h2>Mind</h2>
                            {
                              mind?.map((item, index) => (
                                <div className='mt-4' key={item._id || index}>
                                  <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      } */}


                    </div>


                  )}

                  {/* =======================================     emotional  ================================= */}

                  {userData?.data?.userType === "emotional" && (
                    <div className="grid grid-cols-2 mt-3 gap-10">

                      <div>
                        <h2>Self</h2>

                        {self?.map((item, index) => (
                          <div
                            key={item._id || index}
                            className={`mt-4 p-2 rounded ${selectedSelfId.includes(item._id) ? "bg-blue-300" : "bg-white"
                              }`}
                          >
                            <button
                              onClick={() => toggleSelfId(item._id)}
                              className="w-full text-left text-black"
                            >
                              {item?.name}
                            </button>
                          </div>
                        ))}

                      </div>

                      <div>
                        <h2>Ego</h2>

                        {ego?.map((item, index) => (
                          <div
                            key={item._id || index}
                            className={`mt-4 p-2 rounded ${selectedEgoId.includes(item._id) ? "bg-blue-300" : "bg-white"
                              }`}
                          >
                            <button
                              onClick={() => toggleEgoId(item._id)}
                              className="w-full text-left text-black"
                            >
                              {item?.name}
                            </button>
                          </div>
                        ))}
                      </div>


                      {/* <div>
                        <h2>Self</h2>
                        {self?.map((item, index) => (
                          <div className="mt-4" key={item._id || index}>
                            <button>{item?.name}</button>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h2>Ego</h2>
                        {ego?.map((item, index) => (
                          <div className="mt-4" key={item._id || index}>
                            <button>{item?.name}</button>
                          </div>
                        ))}
                      </div> */}


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
