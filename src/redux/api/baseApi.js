import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setUser } from "../fetures/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://admin.hypno4u.com/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
     
    
  if (result?.error?.status === 403) {
    // toast.error(`${result?.error?.data.message}`);
  }
  if (result?.error?.status === 404) {
    // toast.error(`${result?.error?.data.message}`);
  }


  if (result?.error?.status === 401) {
    const res = await fetch("https://admin.hypno4u.com/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = api.getState().auth.user;
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {    
      api.dispatch(logOut());
    }
  }    
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["audio", "user", "audios"],
  endpoints: () => ({}),
});
