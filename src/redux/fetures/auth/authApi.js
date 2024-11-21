import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getALlUser: builder.query({
      query: (status) => {
        return {
            url: "/auth/allUsers",
            method: "GET",
            params: { status }, 
        };
    },
    providesTags: ["user"],
    }),

    getSingleUser: builder.query({
      query: (email) => {
        return {        
            url: `/auth?email=${email}`,
            method: "GET",
        }
      },
      providesTags: ["audio", "user"], 
    }),

    userDelete: builder.mutation({
      query: (email) => {
        return {        
            url: `/auth/userDelete`,
            method: "PATCH",
            body : {email}
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
      invalidatesTags : ["audios"]
    }),

    updateAudioData: builder.mutation({
      query: (audioData) => {  
        return {
          url: "/auth/audio",
          method: "PATCH",
          body: { audioData },
        }
      },
      invalidatesTags: ["audio", "user"], 
    }),

    logOutUpdate: builder.mutation({
      query: (email) => {  
        return {
          url: "/auth/log-out-update",
          method: "PATCH",
          body: { email },
        }
      },
      invalidatesTags: ["audio", "user"], 
    }),
    
    sendEmail: builder.mutation({
      query: (emailInfo) => {        
        return {
          url: "/auth/sendEmail",
          method: "POST",
          body: emailInfo,
        }
      },
    }),


    allAudioPaths: builder.query({
      query: (categoryStatus) => {              
        return {
          url: `/get-path-name`,
          method: "GET",
          params : categoryStatus
        }
      },
      providesTags : ["audios"],
      // invalidatesTags:["audios"]
    }),

    updateAudioPaths: builder.mutation({
      query: (data) => {             
        console.log(data);
         
        return {
          url: `/path-name`,
          method: "PATCH",
          body : data
        }
      },
      invalidatesTags : ["audios"],
    }),

    
    setSelectedAudios: builder.mutation({
      query: (data) => {                 
        return {
          url: `/auth/selectedAudio`,
          method: "PATCH",
          body : data
        }
      },
      invalidatesTags : ["audios"]
    }),


  }),
});

export default authApi;
