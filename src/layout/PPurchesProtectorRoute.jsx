/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../redux/fetures/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { useEffect, useState } from "react";
import authApi from "../redux/fetures/auth/authApi";
import { CircularProgress } from "@mui/material";

const PPurchesProtectorRoute = ({ children }) => {
    const [currentEmail, setCurrentEmail] = useState("");
    const token = useAppSelector(useCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }

    useEffect(() => {
        setCurrentEmail(user?.email);
    }, [user]);

    const { data, isLoading } = authApi.useGetSingleUserQuery(currentEmail, {
        skip: !currentEmail,
    });

    const expiresDate = new Date(data?.data?.expiresDate);
    const currentData = new Date();

    if (isLoading) {
        return <div className="w-full h-[100vh] flex justify-center items-center ">
            <CircularProgress
                    style={{
                      color: "black",
                      width: "80px",
                      height: "80px",
                    }}
                  />
        </div>;
    }

    if (token && currentData < expiresDate && data?.data?.email) {
        return <Navigate to="/daily-audios" replace={true} />;
    }

    return children;
};

export default PPurchesProtectorRoute;
