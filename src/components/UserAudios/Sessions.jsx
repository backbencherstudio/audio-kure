/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import authApi from '../../redux/fetures/auth/authApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import "./Sessions.css";
import { useLocation, useNavigate } from 'react-router-dom';

const Sessions = () => {
  const [purchasePlan] = authApi.usePurchasePlanMutation();
  const currentUser = useSelector(selectCurrentUser);
  const { data: userData, isLoading: userDataLoading } = authApi.useGetSingleUserQuery(currentUser?.email);
  const [subscribeData, setSubscribeData] = useState(null);
  const [usbDataLoading, setUsbDataLoading] = useState(null);
  const navigate = useNavigate();
  const { data: audioUrls, isLoading: audioDataLoading } = authApi.useAllAudioPathsQuery();

  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id') || userData?.data?.sessionId;

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
    return <p>Loading ...</p>;
  }

  const plan = subscribeData?.plan;
  const planNumber = parseInt(plan);

  return (
    <div className="session-main-dev border-t mt-5 border-[#2f2861] ">
      <div className="session-second-child max-w-7xl mx-4 md:mx-auto my-8 md:px-4 lg:px-0 ">
        <div>
          S Data = {subscribeData?.subscription_email} S = {subscribeData?.status} P = {subscribeData?.plan} C_id = {subscribeData?.customer_id}
        </div>

        <div className='grid grid-cols-2'>
          <div className='bg-green-300' > 
            <img className='px-10' src="https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-bright-pink-man-in-meditation-with-the-breath-of-fire-image_2569056.jpg" alt="" />
             </div>

          <div className='bg-red-300 ' >
            {audioUrls?.result?.length > 0 ? (

              audioUrls.result.map((item, index) => (
                <div className='mt-2' key={item._id || index}>
                  {/* <p>{item.name}</p> */}
                  <audio controls src={item.audio}></audio>
                  {/* <p>Category: {item.category}</p> */}
                </div>
              ))


            ) : (
              <p>No audio files available.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sessions;
