/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { logOut, selectCurrentUser, useCurrentToken } from "../redux/fetures/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const ProtectedRoute = ({ children }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(useCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    const currentUser = useAppSelector(selectCurrentUser);

    console.log("Token:", token);
    console.log("Decoded User from Token:", user);
    console.log("Current User in Redux:", currentUser);

    if (!token || currentUser?.email !== user?.email) {
        dispatch(logOut());
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;
