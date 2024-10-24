import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (email) => {
        return {        
            url: `/auth?email=${email}`,
            method: "GET",
        }
      },
      providesTags: ["audio", "user"], 
    }),

    registerUser: builder.mutation({
      query: (user) => {
        return {        
            url: "/auth/create-user",
            method: "POST",
            body: { user },
        }
      },
    }),

    verifyOTP: builder.mutation({
      query: (verifyData) => {
        return {        
            url: "/auth/verifyOTP",
            method: "POST",
            body: verifyData,         
        }
      },
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    purchasePlan: builder.mutation({
      query: (purchasePlan) => {                    
        return {
          url: "/auth/purchasePlan",
          method: "PATCH",
          body: { purchasePlan },
        }
      },
    }),

    updateAudioData: builder.mutation({
      query: (audioData) => {   
        return {
          url: "/auth/audio",
          method: "PATCH",
          body: { audioData },
        }
      },
      invalidatesTags: ["audio", "user"], // Invalidate both audio and user tags
    }),
  }),
});

export default authApi;
