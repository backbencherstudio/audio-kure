/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../redux/fetures/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const PPurchesProtectorRoute = ({ children }) => {
    const token = useAppSelector(useCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    const expiresDate = new Date(user?.expiresDate)
    const currentData = new Date()

    console.log({expiresDate}, {currentData});
    


    if (currentData < expiresDate) {
        return <Navigate to="/daily-audios" replace={true} />;
    }

    return children;
};

export default PPurchesProtectorRoute;
