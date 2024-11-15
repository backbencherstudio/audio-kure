/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import authApi from '../../redux/fetures/auth/authApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import "./Sessions.css";
import { useLocation, useNavigate } from 'react-router-dom';
import NewAudioPlayer from './NewAudioPlayer';

const Sessions = () => {
  const [purchasePlan] = authApi.usePurchasePlanMutation();
  const currentUser = useSelector(selectCurrentUser);
  const { data: userData, isLoading: userDataLoading } = authApi.useGetSingleUserQuery(currentUser?.email);
  const [subscribeData, setSubscribeData] = useState(null);
  const [usbDataLoading, setUsbDataLoading] = useState(null);
  const navigate = useNavigate();
  const [showCategoryStatus, setShowCategoryStatus] = useState("withMusic")
  const { data: audioUrls, isLoading: audioDataLoading } = authApi.useAllAudioPathsQuery({ showCategoryStatus });

  const [totalDuration, setTotalDuration] = useState(0);
  const [listeningTime, setListeningTime] = useState(0);



  const [audioUrl, setAudioUrl] = useState("")

  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id') || userData?.data?.sessionId;

  const body = audioUrls?.body
  const mind = audioUrls?.mind
  const self = audioUrls?.self
  const ego = audioUrls?.ego

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:5000/success?session_id=${sessionId}`)
        .then(response => response.json())
        .then(data => setSubscribeData(data))
        .catch(error => console.error("Error:", error));
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

  if (userDataLoading || audioDataLoading) {
    return <p></p>;
  }

  const plan = subscribeData?.plan;
  const planNumber = parseInt(plan);

  return (
    <div className="session-main-dev border-t mt-5 border-[#2f2861] ">
      <div className="session-second-child max-w-7xl mx-4 md:mx-auto my-8 md:px-4 lg:px-0 ">
        <div>
          S Data = {subscribeData?.subscription_email} S = {subscribeData?.status} P = {subscribeData?.plan} C_id = {subscribeData?.customer_id}

          <h2>Total Time : {totalDuration} :: Listining Time =  {listeningTime} </h2>

          {
            (totalDuration === listeningTime && totalDuration > 0) && <p> Done </p>
          }
        </div>

        <div className='grid grid-cols-2 gap-10'>

          <div className='' >

            <div className='  w-[80%] mx-auto' >


              <div className='' >
                <NewAudioPlayer audioUrl={audioUrl} setTotalDuration={setTotalDuration} setListeningTime={setListeningTime} />
              </div>

              <div>
                <a className='bg-red-400 hover:bg-red-500 duration-300 px-10 py-2 text-black hover:text-white rounded-md text-md mt-10 inline-block ' href={`http://localhost:5000/customers/${subscribeData?.customer_id}`} target='_blank'>Cancel Plan  </a>
              </div>

            </div>
          </div>

          <div>

            <div className=' shadow-2xl p-5 rounded-lg min-h-[300px] '>
              <div>
                <h2 className='bg-blue-500 text-center py-2 rounded-full text-xl ' >{userData?.data?.userType}</h2>
                <div className='grid grid-cols-2 gap-10 mt-5' >
                  <button className={` w-full border rounded-full px-4 py-2 mr-4 font-semibold duration-300  ${showCategoryStatus === "withMusic" ? "bg-blue-500 text-black " : ""}`} onClick={() => setShowCategoryStatus("withMusic")} >with music</button>
                  <button className={` w-full border rounded-full px-4 py-2 mr-4 font-semibold duration-300  ${showCategoryStatus === "withMusic" ? "" : "bg-blue-500 text-black"}`} onClick={() => setShowCategoryStatus("withOutMusic")} >with out music</button>
                </div>
              </div>
              {audioUrls?.result?.length > 0 ? (

                <div className=' ' >

                  {/* ================================================= physical ============================================= */}
                  {
                    userData?.data?.userType === "physical" &&

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

                  }

                  {/* ================================================= emotional ============================================= */}

                  {
                    userData?.data?.userType === "emotional" &&

                    <div className='grid grid-cols-2 mt-3 gap-10' >
                      <div>
                        <h2>Self</h2>
                        {
                          self?.map((item, index) => (
                            <div className='mt-4' key={item._id || index}>
                              <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
                            </div>
                          ))
                        }
                      </div>
                      <div>
                        <h2>Ego</h2>
                        {
                          ego?.map((item, index) => (
                            <div className='mt-4' key={item._id || index}>
                              <button className='border border-blue-600 w-full py-2 rounded-lg font-semibold ' onClick={() => setAudioUrl(item.audio)} >{item.name}</button>
                            </div>
                          ))
                        }
                      </div>
                    </div>

                  }



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
