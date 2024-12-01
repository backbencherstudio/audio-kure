import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const [sessionId, setSessionId] = useState("")

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get("session_id");

        if (sessionId) {
            setSessionId(sessionId);
            // Fetch session data from your server if needed
        }
    }, [location]);

    return <div className='text-black' >Subscription Successful {sessionId} </div>;
};

export default Success;
